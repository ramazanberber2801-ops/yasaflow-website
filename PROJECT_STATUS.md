# Yasaflow Website – Project Status

Last updated: July 11, 2026

## Current state

The public Yasaflow website is implemented with React, Vite, TypeScript and Tailwind CSS.

## Completed

- Responsive mobile-first SaaS homepage
- Official Yasaflow v1 logo integrated through the reusable Logo component
- Multilingual website in English, Norwegian and Turkish
- Shared central module catalog used by homepage module interfaces
- Dedicated About, Contact, Privacy and Terms pages
- Lightweight public routing and Vercel rewrites
- Route- and language-specific titles and meta descriptions
- Canonical URLs, Open Graph and Twitter metadata
- Organization structured data
- robots.txt and sitemap.xml
- Web app manifest, theme color and favicon
- 404 pages are marked noindex

## Not started

- Pricing calculator UI and approved customer prices
- Live module source from the Yasaflow platform/Supabase
- Working authentication/onboarding destinations
- Final legal review of Privacy and Terms
- Real anonymized product screenshots
- Framer Motion enhancements
- Production analytics and Search Console verification

## SEO language limitation

The three languages currently share the same URLs and the selected language is stored locally. Therefore, hreflang links are intentionally not published yet. They should be added only when each language has a stable, crawlable URL.

## Permanent module rule

Only modules that are operational, `active`, and explicitly marked `visibleOnWebsite` may appear publicly. Beta modules additionally require `betaWebsiteEnabled = true`. Website interfaces must consume the shared module source rather than hardcoded module lists.
