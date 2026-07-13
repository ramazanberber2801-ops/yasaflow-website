# Yasaflow Website Launch Checklist

Use this checklist before the public website is presented as commercially launched.

## Domain and delivery

- [ ] Purchase and connect the final `yasaflow.com` domain.
- [ ] Set `yasaflow.com` as the production domain in Vercel.
- [ ] Redirect `www.yasaflow.com` to the chosen canonical domain.
- [ ] Confirm HTTPS and automatic certificate renewal.
- [ ] Confirm `robots.txt`, `sitemap.xml` and `/.well-known/security.txt` use the final domain.

## Product connection

- [ ] Confirm the final app URL, expected to be `app.yasaflow.com`.
- [ ] Connect all public signup, login and subscription buttons to verified app routes.
- [ ] Test plan/module parameters passed from the website to the app.
- [ ] Ensure no public CTA points to an unfinished or unauthorized flow.

## Legal and privacy

- [ ] Add the legal entity name, organization number and registered address.
- [ ] Confirm the data controller and privacy contact details.
- [ ] Document email, hosting, analytics and other processors actually in use.
- [ ] Document retention periods and legal bases for personal-data processing.
- [ ] Complete qualified legal review of Privacy and Terms.
- [ ] Confirm whether the service is business-only or also offered to consumers.
- [ ] Add cookie consent only if non-essential cookies or tracking are enabled.

## Content and product claims

- [ ] Verify that all features shown as available are actually available.
- [ ] Keep in-development, planned and research functionality clearly labelled.
- [ ] Replace illustrative product mockups with approved anonymized screenshots when ready.
- [ ] Approve pricing, currencies, taxes and billing descriptions before publishing prices.
- [ ] Review Norwegian, English and Turkish copy for consistency.

## Security and operations

- [ ] Verify production Supabase Row Level Security for every tenant-owned table.
- [ ] Confirm backup, recovery and incident-response routines.
- [ ] Confirm production environment variables contain no development credentials.
- [ ] Enable suitable monitoring and error reporting.
- [ ] Test account recovery and administrative access controls.
- [ ] Review and renew `security.txt` before its expiry date.

## Search and measurement

- [ ] Verify ownership in Google Search Console after the final domain is active.
- [ ] Submit the production sitemap.
- [ ] Add analytics only after privacy information and consent requirements are resolved.
- [ ] Check page titles, canonical URLs and social sharing previews on the final domain.

## Final acceptance

- [ ] Test every public route on desktop and mobile.
- [ ] Test keyboard navigation and visible focus states.
- [ ] Test language selection and persistence.
- [ ] Confirm all email links and navigation links.
- [ ] Confirm the latest `main` deployment is `READY` in Vercel.
- [ ] Record the approved launch commit SHA.
