# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout
Monorepo. The active project is **`web-api/`** — a Playwright + TypeScript suite covering both **web UI** (saucedemo.com) and **REST API** (restful-booker). Run all commands from `web-api/`.

## Commands (run from web-api/)
- Install deps + browsers:  `npm ci` then `npx playwright install --with-deps`
- Run all tests:            `npx playwright test`
- Run one file:             `npx playwright test tests/login.spec.ts`
- Run by tag (grep):        `npx playwright test --grep @smoke`
- Run one browser:          `npx playwright test --project=chromium`
- Target an environment:    `ENV=stg npx playwright test`   (ENV ∈ int | tst | stg | prd; default `prd`)
- Open HTML report:         `npx playwright show-report`
- Debug / UI mode:          `npx playwright test --debug`  |  `npx playwright test --ui`

## Environment resolution (`config/env.ts`) — the core architectural piece
`config/env.ts` reads `process.env.ENV` (default `prd`) and maps it to a base URL for BOTH surfaces, then fails fast on an unknown value:
- Web → `WEB_BASE_URLS[env]` (…saucedemo.com) → exported as `webBaseurl`
- API → `API_BASE_URLS[env]` (…restful-booker) → exported as `apiBaseurl`

`playwright.config.ts` uses `webBaseurl` as `baseURL`, so UI specs call `page.goto('/')`; API specs import `apiBaseurl` directly. Secrets (`WEB_USER`, `WEB_PASSWORD`, `API_USER`, `API_PASSWORD`) load from `web-api/.env` via dotenv inside `config/env.ts`. `.env` is gitignored; `.env.example` documents the keys.

## Test architecture
- **Page Object Model** — `tests/pages/*.page.ts`. Each page is a class constructed with `page`, exposing locators + action methods (`LoginPage.login()`, `ProductsPage.getProductPrices()`). Specs never use raw selectors.
- **Specs** — `tests/*.spec.ts` (web) and `tests/api/*.spec.ts` (API). Web specs build page objects in `beforeEach` and call `goto()`.
- **Tags** live in the test title; filter with `--grep`. Existing: `@createBooking`, `@auth`, `@negative`. Add `@smoke` to critical happy-paths.
- **Cross-browser** via `projects` (chromium/firefox/webkit); `fullyParallel: true`; `retries` + `workers:1` on CI only; `trace: 'on-first-retry'`.
- **CI** — `.github/workflows/playwright.yml`: a matrix fans out one parallel job per browser, `working-directory: web-api`, secrets from GitHub Actions Secrets, HTML report uploaded per browser.

## Conventions & guardrails
- Keep selectors inside page classes; expose behaviour, not locators.
- Read secrets from `process.env` — never hard-code or commit them.
- Retries are CI-only: a test that only passes on retry is a flake to investigate, not accept.

## Agentic testing workflow (when given a Jira ticket)
1. Read the ticket via the Jira MCP; identify which tests to run.
2. Run them from `web-api/` (e.g. smoke: `npx playwright test --grep @smoke`).
3. Summarise: passed/failed counts, which tests, duration.
4. On failure: inspect the trace/report and give a likely root cause.
5. Report back to Jira (comment with summary + report link) 
