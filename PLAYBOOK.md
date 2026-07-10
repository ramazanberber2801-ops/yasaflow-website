# Yasaflow Website Playbook

## Purpose

This file is the entry point for anyone working on the public Yasaflow website.

## Read before making changes

1. `PROJECT_STATUS.md`
2. `TODO.md`
3. `ROADMAP.md`
4. Relevant files in `docs/`
5. `CHANGELOG.md`

## Product boundary

This repository contains the public Yasaflow website and future public onboarding experience.

The main platform, Owner Dashboard, Admin Dashboard and organization apps live in the separate `dtim` repository.

## Working rules

- One focused feature per commit.
- Do not refactor unrelated working code.
- Run build and relevant checks before committing.
- Update project documentation when status changes.
- Stop after each feature commit and report its SHA.
- Wait for a green Vercel deployment before starting the next feature.
- Never claim that code, tests or deploys succeeded unless verified.

## Design direction

Yasaflow should feel modern, calm, trustworthy, inclusive and Scandinavian. It must not depend on religious symbolism and should work for all organization types.

## Onboarding distinction

- Owner-created onboarding: current platform phase in `dtim`.
- Public self-service onboarding: later website phase, not implemented yet.
