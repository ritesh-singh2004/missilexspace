---
name: playwright
description: End-to-end browser automation, UI testing, and web scraping with Playwright. Scaffolds test infrastructure, writes resilient CI-ready spec files, automates headless/headed browser sessions, runs and debugs tests, and diagnoses failures with traces and screenshots. Covers locators, assertions, auth storageState, visual testing, network mocking, and performance budgets. Use when asked to test, automate, write E2E specs, scaffold Playwright, or debug browser tests.
---

# Playwright End-to-End Testing & Browser Automation

Complete guide for scaffolding, authoring, executing, and debugging production-grade Playwright tests and browser automations.

## Quick Reference Commands

```bash
# Running Tests
npx playwright test                         # Run all tests headlessly
npx playwright test e2e/homepage.spec.ts    # Run a single spec file
npx playwright test --headed                # Run with visible browser
npx playwright test --ui                    # Interactive UI mode with time-travel
npx playwright test --debug                 # Step-by-step inspector mode
npx playwright test --grep "@smoke"         # Run tests matching tag/pattern
npx playwright test --project=chromium      # Run specific browser engine

# Debugging & Tooling
npx playwright show-trace test-results/.../trace.zip  # Inspect trace zip
npx playwright show-report                  # Open HTML test report
npx playwright codegen http://localhost:3000 # Record interactions to code
npx playwright install --with-deps chromium # Install browser binaries
```

---

## 1. Scaffolding Playwright Infrastructure

When setting up Playwright in a new or existing repository:

### Step 1: Install Dependencies
```bash
npm install --save-dev @playwright/test
npx playwright install chromium
```

### Step 2: Generate `playwright.config.ts`
```typescript
import { defineConfig, devices } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    ['html', { open: 'never' }]
  ],
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
    headless: true,
  },
  projects: [
    // Setup project for shared authentication (if app requires login)
    { name: 'setup', testMatch: /.*\.setup\.ts/ },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'e2e/.auth/user.json', // Remove if no auth
      },
      dependencies: ['setup'], // Remove if no auth
    },
  ],
  webServer: {
    command: process.env.CI ? 'npm run start' : 'npm run dev',
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    stdout: 'ignore',
    stderr: 'pipe',
  },
});
```

### Step 3: Update `.gitignore`
```
/test-results/
/playwright-report/
/e2e/.auth/
```

---

## 2. Writing Resilient Spec Files

### Selector Strategy Hierarchy
Always prefer user-facing, accessible locators in this strict order:

```typescript
// 1. Role + Accessible Name (Gold Standard)
page.getByRole('button', { name: 'Submit' })
page.getByRole('link', { name: 'Explore missions' })
page.getByRole('heading', { level: 1, name: 'Mission Overview' })
page.getByRole('textbox', { name: 'Email' })

// 2. Form Labels
page.getByLabel('Password')

// 3. Test IDs (Explicit and stable)
page.getByTestId('telemetry-card')

// 4. Text Content (Unique copy)
page.getByText('Telemetry Active')

// 5. Placeholders
page.getByPlaceholder('Search systems...')

// AVOID: Brittle CSS selectors (.btn-primary > div) or hardcoded XPath
```

### Spec Template
```typescript
// e2e/navigation.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Portal Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('loads home title and verified emblems', async ({ page }) => {
    await expect(page).toHaveTitle(/MissileX/i);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('navigates to missiles catalog and filters items', async ({ page }) => {
    await page.getByRole('link', { name: /missiles/i }).first().click();
    await expect(page).toHaveURL(/.*missiles/);

    const filterBtn = page.getByRole('button', { name: /cruise/i });
    if (await filterBtn.isVisible()) {
      await filterBtn.click();
      await expect(page.getByText(/BrahMos/i)).toBeVisible();
    }
  });

  test('opens and closes modal via keyboard', async ({ page }) => {
    const storyBtn = page.getByRole('button', { name: /watch the story/i });
    if (await storyBtn.isVisible()) {
      await storyBtn.click();
      await expect(page.getByRole('dialog')).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(page.getByRole('dialog')).toBeHidden();
    }
  });
});
```

---

## 3. Authentication & Session Reuse (`storageState`)

Instead of logging in before every single test, log in once via a setup project:

```typescript
// e2e/auth.setup.ts
import { test as setup } from '@playwright/test';

const authFile = 'e2e/.auth/user.json';

setup('authenticate', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill(process.env.TEST_EMAIL || 'researcher@missilex.gov.in');
  await page.getByLabel('Password').fill(process.env.TEST_PASSWORD || 'Secret123!');
  await page.getByRole('button', { name: /sign in/i }).click();

  await page.waitForURL('**/dashboard');
  await page.context().storageState({ path: authFile });
});
```

To opt a test out of auth (e.g. testing the public login page itself):
```typescript
test.use({ storageState: { cookies: [], origins: [] } });
```

---

## 4. Network Interception & API Mocking

```typescript
test('mocks live telemetry feed', async ({ page }) => {
  await page.route('**/api/telemetry', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        status: 'OPERATIONAL',
        altitude: '420km',
        velocity: '7.8 km/s'
      })
    });
  });

  await page.goto('/');
  await expect(page.getByText('OPERATIONAL')).toBeVisible();
});
```

---

## 5. Visual Regression Testing

```typescript
test('matches snapshot of home hero', async ({ page }) => {
  await page.goto('/');
  // Wait for fonts and animations to settle
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveScreenshot('home-hero.png', {
    maxDiffPixelRatio: 0.05
  });
});
```

---

## 6. Diagnosing and Fixing Test Failures

### Step-by-Step Debugging Protocol
1. **Never weaken assertions**: Never replace `await expect(page).toHaveURL('/dashboard')` with a wildcard match `.*` just to make a test pass. Fix the test or the underlying application code to match truth.
2. **Inspect failure artifacts**:
   - Screenshot: `test-results/**/test-failed-1.png`
   - Trace viewer: `npx playwright show-trace test-results/.../trace.zip`
3. **Common failure modes**:
   - **Timing race condition**: Don't use `page.waitForTimeout(3000)`. Use auto-waiting assertions: `await expect(locator).toBeVisible()`.
   - **Hidden underneath modal/sticky header**: Use `scrollIntoViewIfNeeded()` or verify sticky header z-indexes.
   - **Hydration mismatch**: Verify that Next.js client component hydration has completed before checking text values.
