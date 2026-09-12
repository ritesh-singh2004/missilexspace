---
name: playwright-debug
description: Diagnose and fix failing Playwright tests. Reads test output, error messages, and failure artifacts (screenshots, traces), traces the root cause in the app source, and fixes specs to match actual application behaviour. Use when Playwright tests fail.
---

# Playwright Debug

Diagnoses and resolves test failures and flakiness in Playwright suites.

## Protocol

1. **Run Failing Tests with Artifacts**:
   ```bash
   npx playwright test --debug
   # or
   npx playwright test --headed
   ```

2. **Inspect Trace & Screenshots**:
   - Open trace viewer: `npx playwright show-trace test-results/.../trace.zip`
   - Inspect action timeline, console logs, and network tab.

3. **Root Cause Analysis**:
   - Check for wrong locator, changed text label, or timing mismatch.
   - Never weaken assertions (`toHaveURL(/.*/)`) to force a false pass.
   - Add `await expect(locator).toBeVisible()` to guarantee elements are in the DOM before interaction.
