# Yasaflow Website – Project Status

Last updated: July 11, 2026

## Current state

The public Yasaflow website is implemented with React, Vite, TypeScript and Tailwind CSS.

## Completed

- Responsive mobile-first SaaS homepage
- Official Yasaflow v1 logo integrated through the reusable Logo component
- Horizontal and icon-only logo variants
- Light and dark logo presentation
- Sticky responsive navigation and mobile menu
- Refined Yasaflow-specific hero section
- Dedicated “Why Yasaflow?” value section
- Organization types, features, workflow, product previews, CTA and footer
- Multilingual website in English, Norwegian and Turkish
- Automatic first-language selection from browser language
- Manual and persistent language selection
- Semantic page structure and accessible focus states
- Shared module catalog contract prepared for future platform/Supabase integration
- Public module visibility rules and stable module IDs documented

## Not started

- Pricing calculator UI
- Live module source from the Yasaflow platform/Supabase
- Final routes and working authentication/onboarding links
- Pricing, About, Contact, Privacy and Terms pages
- Real anonymized product screenshots
- Framer Motion enhancements
- Backend, API, database or Supabase integration

## Important product distinction

This repository contains only the public website UI. Owner-created onboarding remains in the main Yasaflow platform; public self-service onboarding is a later phase.

## Permanent module rule

Only modules that are operational, `active`, and explicitly marked `visibleOnWebsite` may appear publicly. Website interfaces must consume the shared module source rather than hardcoded module lists.
