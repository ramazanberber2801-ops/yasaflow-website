# Paddle webhook connection

The deployed Supabase Edge Function is:

`https://mlyzaxzohgobjkxcrjml.supabase.co/functions/v1/paddle-webhook`

Configure this URL as a Paddle notification destination and subscribe to:

- `transaction.completed`
- `subscription.created`
- `subscription.activated`
- `subscription.updated`
- `subscription.paused`
- `subscription.past_due`
- `subscription.canceled`

Store the Paddle endpoint secret as the Supabase Edge Function secret `PADDLE_WEBHOOK_SECRET`.

The webhook verifies `Paddle-Signature`, stores event IDs for idempotency, and updates the matching organization using `custom_data.organization_id`.
