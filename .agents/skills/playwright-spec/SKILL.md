---
name: playwright-spec
description: Writes complete, production-grade, CI-ready *.spec.ts files using @playwright/test. Reads real routes, auth flows, and components to generate tests matching actual application behaviour. Use when writing new Playwright E2E tests for features or user flows.
---

# Playwright Spec Writer

Writes robust, resilient end-to-end tests based on the actual application code.

## Guidelines

1. **Explore First**:
   - Inspect route files (`app/**/page.tsx` or `pages/**/*.tsx`).
   - Check actual button labels, headings, and input attributes.
   - Determine whether authentication is required.

2. **Selector Best Practices**:
   - Prefer `getByRole`, `getByLabel`, `getByTestId`.
   - Never use brittle class names or dynamic IDs.

3. **Auto-Waiting Over Timeouts**:
   - Never use `page.waitForTimeout()`.
   - Use web-first assertions: `await expect(locator).toBeVisible()`, `await expect(page).toHaveURL()`.

4. **Auth State Reuse**:
   - Use `auth.setup.ts` to log in once and save `storageState` to `e2e/.auth/user.json`.
