# Yasaflow Website Development Rules

## Before development

Read:

1. `PLAYBOOK.md`
2. `PROJECT_STATUS.md`
3. `TODO.md`
4. Relevant documentation in `docs/`

## Commit workflow

- One focused feature per commit.
- Documentation that belongs together may use one documentation commit.
- Do not make unrelated refactors.
- Do not remove working code without an explicit reason.
- Run `npm run build` and relevant lint/tests before committing application changes.
- Report full SHA, short SHA, changed files and checks.
- Wait for a green Vercel deployment before continuing.

## Technical standards

- React and TypeScript.
- Tailwind CSS.
- Reusable components.
- Semantic HTML.
- Accessible keyboard and focus behavior.
- Mobile-first responsive design.
- No hardcoded logo paths throughout the app.

## Scope rules

Do not add authentication, backend logic, Supabase or public onboarding unless the task explicitly requests it.

## Truthfulness

Never claim that a change was committed, pushed, tested or deployed unless it actually happened.
