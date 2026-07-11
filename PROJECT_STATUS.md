# Yasaflow Website – Project Status

Last updated: July 11, 2026

## Current state

The public Yasaflow website is implemented with React, Vite, TypeScript and Tailwind CSS.

## Completed

- Responsive mobile-first SaaS homepage
- Official Yasaflow v1 logo integrated through the reusable Logo component
- Multilingual website in English, Norwegian and Turkish
- Shared central module catalog used by homepage module interfaces
- Public module visibility rules and stable module IDs documented
- Dedicated multilingual About page
- Dedicated multilingual Contact page
- Dedicated multilingual Privacy and Terms draft pages
- Lightweight public routing without additional dependencies
- Vercel rewrites for direct access to public routes
- 404 fallback page

## Not started

- Pricing calculator UI and approved customer prices
- Live module source from the Yasaflow platform/Supabase
- Working authentication/onboarding destinations
- Final legal review of Privacy and Terms
- Real anonymized product screenshots
- Framer Motion enhancements
- Backend, API, database or Supabase integration

## Important product distinction

This repository contains only the public website UI. Owner-created onboarding remains in the main Yasaflow platform; public self-service onboarding is a later phase.

## Permanent module rule

Only modules that are operational, `active`, and explicitly marked `visibleOnWebsite` may appear publicly. Beta modules additionally require `betaWebsiteEnabled = true`. Website interfaces must consume the shared module source rather than hardcoded module lists.
