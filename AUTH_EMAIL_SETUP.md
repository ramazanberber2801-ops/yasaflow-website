# Yasaflow Auth Email Setup

This repository contains the production-ready signup confirmation template at:

`supabase/templates/confirm-signup.html`

## Hosted Supabase project

Project reference: `mlyzaxzohgobjkxcrjml`

For a hosted Supabase project, email templates are applied in the Supabase Dashboard rather than through a database migration.

### Confirm signup template

1. Open **Authentication → Email Templates → Confirm signup**.
2. Set the subject to: `Bekreft Yasaflow-kontoen din | Confirm your Yasaflow account`
3. Copy the complete contents of `supabase/templates/confirm-signup.html` into the template editor.
4. Save the template.

### URL configuration

Under **Authentication → URL Configuration**:

- Site URL during website testing: `https://yasaflow-website.vercel.app`
- Production Site URL after domain activation: `https://yasaflow.com`
- Add exact allowed redirects for:
  - `https://yasaflow-website.vercel.app/get-started`
  - `https://yasaflow.com/get-started`
  - the final verified `app.yasaflow.com` callback route

Do not use broad production wildcards when exact redirect URLs are available.

### Production email delivery

Before public launch, configure **Authentication → SMTP Settings** with a verified Yasaflow sender domain.

Recommended sender identity:

- Sender name: `Yasaflow`
- Sender address: `no-reply@yasaflow.com`
- Reply-to/support address: `hello@yasaflow.com`

Disable link tracking in the SMTP provider for authentication messages so confirmation URLs are not rewritten.

## Template behavior

- Uses the official Yasaflow icon from the public website.
- Uses email-client-safe table layout and inline CSS.
- Supports Norwegian, English and Turkish based on `user_metadata.locale`.
- Falls back to English when no supported locale is present.
- Uses Supabase's secure `{{ .ConfirmationURL }}` variable.
- Includes a clear notice for recipients who did not create the account.

## Activation check

Before enabling public self-service signup:

- Confirm email verification is enabled.
- Confirm custom SMTP is verified and deliverability-tested.
- Send test messages to Gmail, Outlook and Apple Mail.
- Test mobile and dark-mode rendering.
- Confirm the link returns only to an allow-listed Yasaflow URL.
- Confirm organization provisioning runs only after a verified authenticated session exists.
