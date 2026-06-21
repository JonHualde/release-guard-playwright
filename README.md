# Release Guard Playwright

[![Playwright Tests](https://github.com/JonHualde/release-guard-playwright/actions/workflows/playwright.yml/badge.svg)](https://github.com/JonHualde/release-guard-playwright/actions/workflows/playwright.yml)

Lightweight Playwright release guard for a freelance portfolio website.

The goal is not exhaustive regression testing. The suite protects the critical promises of the site before a release: conversion, localization, credibility content, navigation, technical health, and mobile usability.

## Requirements

- Node.js 24+
- npm
- A running or deployed target website

## Setup

```bash
npm install
npx playwright install
```

## Target URL

The suite reads the target from `BASE_URL`. Keep your real target URL private by storing it in `.env` locally or in a GitHub Actions secret in CI.

Create a local `.env` file:

```bash
cp .env.example .env
```

Then edit `.env`:

```bash
BASE_URL=https://your-site.example
```

Run the tests:

```bash
npm test
```

You can also provide the URL inline:

```bash
BASE_URL="https://your-site.example" npm test
```

If `BASE_URL` is not provided outside CI, Playwright uses the local fallback configured in `playwright.config.ts`.

In GitHub Actions, add a repository secret named `BASE_URL`. Do not commit your real `.env` file.

## Commands

```bash
npm test
npm run test:headed
npm run test:ui
npm run report
```

## Browser Projects

The suite runs targeted browser projects to keep CI output readable and avoid intentional skips:

- `desktop-chromium`: conversion, localization, credibility content, navigation, and technical health.
- `mobile-chromium`: conversion, credibility content, mobile usability, and technical health.

Tests are filtered at the project level instead of using runtime `test.skip` calls, so a healthy CI run should report passed tests without skipped noise.

## Project Shape

- `tests/`: release guard specs.
- `page-objects/`: lightweight page objects and shared page actions.
- `playwright.config.ts`: browser projects, base URL, reporter, and debug artifacts.
- `.github/workflows/playwright.yml`: CI execution and report upload.

## Debug Artifacts

Playwright keeps useful evidence when a test fails:

- HTML report: `playwright-report/`
- traces: `test-results/`
- screenshots on failure
- videos on failure

These artifacts should make a failed release guard actionable without rerunning locally first.

In public repositories, traces, screenshots, videos, and HTML reports can reveal the tested site. CI artifact upload is disabled by default; set the GitHub repository variable `UPLOAD_ARTIFACTS=true` only when the target and report contents are safe to share.

## Documentation

- [Test Strategy](./test-strategy.md)
- [Coverage Matrix](./coverage-matrix.md)

## V2 Backlog

- Add mobile localization if the language switcher becomes exposed in the mobile navigation.
- Add a deeper Cal.com handoff test if the external flow is stable enough.
- Publish a controlled public report only when the target URL and report contents are safe to expose.
