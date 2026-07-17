import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const encoder = new TextEncoder();
const hex = (bytes: ArrayBuffer) => [...new Uint8Array(bytes)].map((b) => b.toString(16).padStart(2, "0")).join("");
function timingSafeEqual(a: string, b: string) { if (a.length !== b.length) return false; let result = 0; for (let i = 0; i < a.length; i += 1) result |= a.charCodeAt(i) ^ b.charCodeAt(i); return result === 0; }
async function verifySignature(rawBody: string, signatureHeader: string, secret: string) {
  const parts = signatureHeader.split(";").map((part) => part.split("="));
  const timestamp = parts.find(([key]) => key === "ts")?.[1];
  const signatures = parts.filter(([key]) => key === "h1").map(([, value]) => value);
  if (!timestamp || signatures.length === 0) return false;
  const age = Math.abs(Date.now() / 1000 - Number(timestamp));
  if (!Number.isFinite(age) || age > 300) return false;
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const digest = await crypto.subtle.sign("HMAC", key, encoder.encode(`${timestamp}:${rawBody}`));
  const expected = hex(digest);
  return signatures.some((signature) => timingSafeEqual(signature, expected));
}

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });
  const secret = Deno.env.get("PADDLE_WEBHOOK_SECRET");
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!secret || !supabaseUrl || !serviceRoleKey) return new Response("Server configuration error", { status: 500 });

  const rawBody = await req.text();
  if (!(await verifySignature(rawBody, req.headers.get("Paddle-Signature") ?? "", secret))) return new Response("Invalid signature", { status: 401 });
  const event = JSON.parse(rawBody) as { event_id:string; event_type:string; occurred_at?:string; data?:Record<string, unknown> };
  const data = event.data ?? {};
  const customData = (data.custom_data ?? {}) as Record<string, unknown>;
  const organizationId = typeof customData.organization_id === "string" ? customData.organization_id : null;
  const admin = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });
  const { error: eventError } = await admin.from("paddle_webhook_events").insert({ event_id:event.event_id, event_type:event.event_type, occurred_at:event.occurred_at ?? null, organization_id:organizationId, payload:event });
  if (eventError?.code === "23505") return new Response("Already processed", { status: 200 });
  if (eventError) throw eventError;

  if (organizationId) {
    const statusMap: Record<string,string> = { "transaction.completed":"active", "subscription.created":"active", "subscription.activated":"active", "subscription.paused":"paused", "subscription.canceled":"canceled", "subscription.past_due":"past_due" };
    const update: Record<string,unknown> = { subscription_updated_at:new Date().toISOString() };
    if (event.event_type.startsWith("transaction.") && typeof data.id === "string") update.paddle_transaction_id = data.id;
    if (event.event_type.startsWith("subscription.") && typeof data.id === "string") update.paddle_subscription_id = data.id;
    if (typeof data.subscription_id === "string") update.paddle_subscription_id = data.subscription_id;
    if (typeof data.customer_id === "string") update.paddle_customer_id = data.customer_id;
    const status = event.event_type === "subscription.updated" && typeof data.status === "string" ? data.status : statusMap[event.event_type];
    if (status) { update.subscription_status = status; update.status = status === "active" ? "Aktiv" : status; if (status === "active") update.onboarding_step = "Klar til bruk"; }
    await admin.from("organizations").update(update).eq("id", organizationId);
  }
  return new Response("ok", { status: 200 });
});
