# Cross-Platform Test Automation Framework

A cross-platform test-automation framework demonstrating **web, API, cross-browser, CI, environment configuration and secrets management** — built with **Playwright + TypeScript**, with a **Java module** and **native mobile (Appium)** on the roadmap.

Built to show framework *design* (not just scripts): Page Objects, data-driven testing, environment switching, secure credential handling, and CI-ready parallel execution.

---

## Tech & Coverage

| Layer | Stack | Status |
|---|---|---|
| **Web + API** | Playwright + TypeScript | ✅ Done |
| **Cross-browser** | Chromium · Firefox · WebKit | ✅ Done |
| **Design** | Page Object Model + encapsulation | ✅ Done |
| **Data-driven** | one test logic, many datasets | ✅ Done |
| **Env switching** | `ENV` → base URL (web *and* API) | ✅ Done |
| **Secrets** | `.env` + dotenv, gitignored | ✅ Done |
| **CI** | GitHub Actions | ✅ Done |
| **Java module** | Selenium + TestNG + REST Assured | 🔜 Phase 2 |
| **Native mobile** | WebdriverIO + Appium (iOS + Android) | 🔜 Phase 2 |
| **Cloud** | Sauce Labs (cross-browser + real device) | 🔜 Phase 2 |

## Structure (monorepo — one stack per folder)
```
test-automation-framework/
├── web-api/     # Playwright + TypeScript — web + API      (✅)
├── java/        # Selenium + TestNG + REST Assured         (🔜 Phase 2)
└── mobile/      # WebdriverIO + Appium — native iOS/Android (🔜 Phase 2)
```

## What's implemented (`web-api/`)
- **Page Objects** — `LoginPage`, `ProductsPage` (private locators, public actions — encapsulation)
- **Tests** — valid/invalid login, **data-driven** login (3 scenarios), **sorted-price verification**, API **auth** + **create-booking**
- **Cross-browser** — every UI test runs on Chromium/Firefox/WebKit; API tests scoped to run once
- **Environment switching** — `config/env.ts` resolves the base URL from `ENV`, with fail-fast validation
- **Secrets** — credentials loaded from a gitignored `.env` via dotenv; nothing hardcoded
- **Tags + grep**, CI-aware retries/workers

## Running it
```bash
cd web-api
npm install
npx playwright install          # browsers, first time

npx playwright test             # all tests, all browsers
ENV=stg npx playwright test     # point the suite at staging (env switching)
npx playwright test --grep @auth   # run by tag
npx playwright show-report      # HTML report
```
Create a `web-api/.env` (gitignored) with your API credentials — see `web-api/.env.example` for the shape:
```
API_USER=<username>
API_PASSWORD=<password>
```
*(For restful-booker, use its publicly documented demo login. Real credentials never live in the repo — `.env` is gitignored; only the placeholder `.env.example` is committed.)*

## Design highlights (the "why")
- **Environment-driven config** — one command retargets the whole suite; unknown env fails fast with a clear message.
- **Secrets never in code** — `.env` gitignored + dotenv; a leaked secret would be rotated, history scrubbed, then prevented with secret-scanning.
- **CI-aware** — retries on CI only, workers pinned to 1 on CI for deterministic runs.
- **Encapsulated Page Objects** — tests call actions (`login()`), not raw selectors, so a selector change is a one-line fix.

## Test targets
- **Web/UI:** [saucedemo.com](https://www.saucedemo.com) (Sauce Labs demo shop)
- **API:** [restful-booker](https://restful-booker.herokuapp.com)

## Roadmap (Phase 2)
1. **Java module** — Selenium + TestNG (`@DataProvider` data-driven) + REST Assured, proving Java automation alongside the TypeScript stack.
2. **Native mobile** — WebdriverIO + Appium against the Sauce Labs sample app (iOS + Android).
3. **Cloud** — run the suites on Sauce Labs (cross-browser + real devices), wired into CI.

---
*Built and debugged by hand — a demonstration of framework design and the engineering reasoning behind each choice.*
