# Yasaflow website functional test

Date: 2026-07-16

## Passed

- Production deployment is READY.
- `yasaflow.com` redirects permanently to `www.yasaflow.com`.
- Homepage returns HTTP 200.
- `/get-started` returns HTTP 200 through the SPA fallback.
- `/privacy` returns HTTP 200 through the SPA fallback.
- No Vercel runtime errors were recorded in the last 24 hours.
- Main navigation is rewritten to working destinations for modules, solutions, resources, about and contact.
- Primary start/create CTAs are rewritten to `/get-started`.
- Language-dependent module names and payment copy are present for Norwegian, English and Turkish.
- Focus styles, reduced-motion handling and mobile tap targets are enabled.

## Findings requiring correction

### 1. Route-specific SEO metadata

All routes currently receive the same static HTML title, description and canonical URL from `index.html`. For example, `/privacy` still receives the homepage title and canonical `https://yasaflow.com` before JavaScript runs. Each public route should receive its own title, description and canonical URL.

### 2. Public login behavior

The public `Log in / Logg inn / Giriş yap` link intentionally routes to `/contact`, because a public login route is not available yet. This is not a broken link, but the label can mislead users until a real login destination exists. Consider changing the label to `Request access` or linking it to the operational app login.

### 3. End-to-end signup requires a dedicated test account

The signup form and route are present, but this test did not create another live user or complete email confirmation and organization provisioning. A dedicated reusable test email is required for a destructive end-to-end signup test without affecting real owner/admin accounts.

## Result

The public presentation and routes pass the smoke test. The website should not be declared fully release-tested until route-specific metadata and one complete signup-to-app test have been completed.
