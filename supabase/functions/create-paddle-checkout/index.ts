import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const allowedOrigins = new Set([
  "https://yasaflow-website.vercel.app",
  "https://yasaflow.com",
  "https://www.yasaflow.com",
  "https://app.yasaflow.com",
  "https://yasaflow.vercel.app",
]);

function corsHeaders(origin: string | null) {
  const allowedOrigin = origin && allowedOrigins.has(origin) ? origin : "https://yasaflow.com";
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
}

function json(body: unknown, status: number, origin: string | null) {
  return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders(origin), "Content-Type": "application/json" } });
}

type CheckoutRequest = { organizationId?: string; modules?: { pushNotifications?: boolean; donations?: boolean } };

Deno.serve(async (req: Request) => {
  const origin = req.headers.get("Origin");
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders(origin) });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405, origin);
  if (origin && !allowedOrigins.has(origin)) return json({ error: "Origin not allowed" }, 403, origin);

  try {
    const authorization = req.headers.get("Authorization");
    if (!authorization?.startsWith("Bearer ")) return json({ error: "Authentication required" }, 401, origin);

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const paddleApiKey = Deno.env.get("PADDLE_API_KEY");
    const corePriceId = Deno.env.get("PADDLE_CORE_PRICE_ID");
    const pushPriceId = Deno.env.get("PADDLE_PUSH_PRICE_ID");
    const donationsPriceId = Deno.env.get("PADDLE_DONATIONS_PRICE_ID");
    if (!supabaseUrl || !anonKey || !serviceRoleKey || !paddleApiKey || !corePriceId || !pushPriceId || !donationsPriceId) return json({ error: "Missing server configuration" }, 500, origin);

    const token = authorization.slice(7);
    const userClient = createClient(supabaseUrl, anonKey, { global: { headers: { Authorization: authorization } }, auth: { persistSession: false } });
    const { data: userData, error: userError } = await userClient.auth.getUser(token);
    if (userError || !userData.user) return json({ error: "Invalid or expired session" }, 401, origin);

    const body = (await req.json()) as CheckoutRequest;
    const organizationId = body.organizationId?.trim();
    if (!organizationId) return json({ error: "organizationId is required" }, 400, origin);

    const adminClient = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });
    const { data: ownership, error: ownershipError } = await adminClient.from("organization_admins").select("organization_id").eq("organization_id", organizationId).eq("user_id", userData.user.id).eq("role", "owner").eq("invitation_status", "accepted").maybeSingle();
    if (ownershipError) throw ownershipError;
    if (!ownership) return json({ error: "Organization owner access required" }, 403, origin);

    const modules = body.modules ?? {};
    const items = [{ price_id: corePriceId, quantity: 1 }];
    if (modules.pushNotifications) items.push({ price_id: pushPriceId, quantity: 1 });
    if (modules.donations) items.push({ price_id: donationsPriceId, quantity: 1 });

    const apiBaseUrl = paddleApiKey.includes("_sdbx_") ? "https://sandbox-api.paddle.com" : "https://api.paddle.com";
    const paddleResponse = await fetch(`${apiBaseUrl}/transactions`, {
      method: "POST",
      headers: { Authorization: `Bearer ${paddleApiKey}`, "Content-Type": "application/json", "Paddle-Version": "1" },
      body: JSON.stringify({ items, collection_mode: "automatic", custom_data: { organization_id: organizationId, owner_user_id: userData.user.id, return_url: `${origin && allowedOrigins.has(origin) ? origin : "https://yasaflow.com"}/checkout/success` } }),
    });
    const paddlePayload = await paddleResponse.json();
    if (!paddleResponse.ok) return json({ error: "Unable to create Paddle checkout", details: paddlePayload?.error?.detail ?? paddlePayload?.error?.type }, 502, origin);

    const transaction = paddlePayload.data;
    await adminClient.from("organizations").update({ paddle_transaction_id: transaction.id, paddle_price_ids: items.map((item) => item.price_id), subscription_updated_at: new Date().toISOString() }).eq("id", organizationId);
    return json({ transactionId: transaction.id, checkoutUrl: transaction.checkout?.url ?? null, status: transaction.status }, 200, origin);
  } catch (error) {
    console.error("create-paddle-checkout failed", error);
    return json({ error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" }, 500, origin);
  }
});
