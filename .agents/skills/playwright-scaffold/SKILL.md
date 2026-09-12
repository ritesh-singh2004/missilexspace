---
name: playwright-scaffold
description: Set up Playwright infrastructure in a project. Explores framework, dev/build scripts, port, and env vars, installs @playwright/test, generates playwright.config.ts, and creates CI workflow files for GitHub Actions and GitLab CI. Use when setting up Playwright for the first time in a codebase.
---

# Playwright Scaffold

Sets up Playwright testing infrastructure in any project: installs `@playwright/test`, generates `playwright.config.ts`, and creates CI workflows.

## Workflow

1. **Inspect Codebase**:
   - Read `package.json` for framework (Next.js, Vite, React, etc.), port, dev/build scripts.
   - Check if `playwright.config.ts` already exists.
   - Read `.env.example` to extract required test environment variables.

2. **Install Packages**:
   ```bash
   npm install --save-dev @playwright/test
   npx playwright install chromium
   ```

3. **Generate `playwright.config.ts`**:
   - Configures `testDir: './e2e'`
   - Configures `webServer` command matching project's dev server (`npm run dev`)
   - Configures headless mode, retries, screenshots, and trace recording on retry.

4. **Add Git Ignores**:
   - Add `/test-results/`, `/playwright-report/`, `/e2e/.auth/` to `.gitignore`.

5. **Generate CI Workflow** (`.github/workflows/e2e.yml`):
   - Cache Playwright binaries to speed up CI runs.
   - Run `npm run build` prior to E2E execution.
   - Upload test report artifacts on completion.
