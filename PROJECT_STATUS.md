# Yasaflow Website – Project Status

Last updated: July 11, 2026

## Current state

The public Yasaflow website is implemented with React, Vite, TypeScript and Tailwind CSS.

## Completed

- Responsive mobile-first SaaS homepage
- Official Yasaflow v1 logo integrated through the reusable Logo component
- Multilingual website in English, Norwegian and Turkish
- Shared module catalog contract prepared for future platform/Supabase integration
- Public module visibility rules and stable module IDs documented
- Homepage hero preview and module library consume the central module source
- Active and publicly visible modules appear automatically in website module interfaces
- Development, coming soon, retired and non-enabled beta modules remain hidden
- Included modules and optional extensions are distinguished without publishing prices

## Not started

- Pricing calculator UI and approved customer prices
- Live module source from the Yasaflow platform/Supabase
- Final routes and working authentication/onboarding links
- Pricing, About, Contact, Privacy and Terms pages
- Real anonymized product screenshots
- Framer Motion enhancements
- Backend, API, database or Supabase integration

## Important product distinction

This repository contains only the public website UI. Owner-created onboarding remains in the main Yasaflow platform; public self-service onboarding is a later phase.

## Permanent module rule

Only modules that are operational, `active`, and explicitly marked `visibleOnWebsite` may appear publicly. Beta modules additionally require `betaWebsiteEnabled = true`. Website interfaces must consume the shared module source rather than hardcoded module lists.
