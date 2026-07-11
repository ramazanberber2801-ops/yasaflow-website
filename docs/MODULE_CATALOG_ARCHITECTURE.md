# Dynamic Module Catalog Architecture

## Permanent rule

Yasaflow must have one source of truth for modules.

The public website, Owner Dashboard, module library, pricing calculator, public onboarding and future apps must all consume the same module contract.

## Stable IDs

Every module has a permanent machine ID such as:

- `news`
- `activities`
- `members`
- `administration`
- `settings`
- `push-notifications`
- `donations`

Display names and translations may change. Module IDs must not change after release.

## Required metadata

- `id`
- `name`
- `description`
- `category`
- `icon`
- `sortOrder`
- `included`
- `premium`
- `monthlyPriceNok`
- `status`
- `visibleOnWebsite`

## Status rules

- `development`: never public
- `beta`: not public unless explicitly enabled in a future owner-controlled release flow
- `active`: public only when `visibleOnWebsite = true`
- `coming_soon`: hidden by default
- `retired`: never public

## Public visibility

A module is visible on the public website only when:

```text
status = active
AND
visibleOnWebsite = true
```

Being operational internally does not automatically require public launch. Owner must be able to control public visibility later.

## Core modules

Core modules are represented with `included = true`, price `0`, and cannot be deselected in future pricing/onboarding interfaces.

Current core contract:

- News
- Activities
- Members
- Administration
- Settings

## Members clarification

The Members module manages the organization's members. It does not manage Yasaflow Owners or organization administrators.

## Current implementation

`src/modules/catalog.ts` is a temporary local adapter that mirrors the future platform/Supabase schema.

The current website must not add additional module names directly inside JSX. New interfaces should consume `getPublicModules()` or a future API implementation with the same return type.

## Future integration

Later, the local implementation can be replaced with data from the Yasaflow platform without rewriting the website UI.
