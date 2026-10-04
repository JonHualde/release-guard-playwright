// Turns Playwright's JSON results into the two files published on GitHub
// Pages next to the HTML report:
//
//   latest.json   the last run, test by test (read by jonhualde.com's hero)
//   history.json  one line per run, newest first, capped at HISTORY_LIMIT
//
// Usage: node scripts/summarize-run.mjs <results.json> <output dir>
// The output dir may already hold a history.json from earlier runs.
// No dependencies, so CI can run it before or without npm ci.

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const HISTORY_LIMIT = 50;

const [resultsPath, outDir] = process.argv.slice(2);
if (!resultsPath || !outDir) {
  console.error("Usage: node scripts/summarize-run.mjs <results.json> <output dir>");
  process.exit(1);
}

const results = JSON.parse(readFileSync(resultsPath, "utf8"));

// Playwright statuses: expected, unexpected, flaky, skipped.
const STATUS = {
  expected: "passed",
  unexpected: "failed",
  flaky: "flaky",
  skipped: "skipped",
};

// Workflow trigger, in words a visitor understands. A deploy of the site
// arrives as a repository_dispatch sent by the site's own workflow.
const TRIGGER = {
  schedule: "schedule",
  push: "push",
  workflow_dispatch: "manual",
  repository_dispatch: "deploy",
};

const tests = [];
const walk = (suite, path) => {
  // the root suites are files: keep their title out of the test name
  const here = suite.title && suite.title !== suite.file ? [...path, suite.title] : path;
  for (const spec of suite.specs ?? []) {
    for (const test of spec.tests ?? []) {
      const last = test.results?.at(-1);
      tests.push({
        title: [...here, spec.title].join(" › "),
        file: spec.file,
        project: test.projectName,
        status: STATUS[test.status] ?? test.status,
        durationMs: last?.duration ?? 0,
        retries: Math.max(0, (test.results?.length ?? 1) - 1),
      });
    }
  }
  for (const child of suite.suites ?? []) walk(child, here);
};
for (const suite of results.suites ?? []) walk(suite, []);

const count = (status) => tests.filter((t) => t.status === status).length;
const totals = {
  total: tests.length,
  passed: count("passed"),
  failed: count("failed"),
  flaky: count("flaky"),
  skipped: count("skipped"),
};

const env = process.env;
const runUrl =
  env.GITHUB_SERVER_URL && env.GITHUB_REPOSITORY && env.GITHUB_RUN_ID
    ? `${env.GITHUB_SERVER_URL}/${env.GITHUB_REPOSITORY}/actions/runs/${env.GITHUB_RUN_ID}`
    : null;

const latest = {
  schema: 1,
  runAt: results.stats?.startTime ?? new Date().toISOString(),
  durationMs: Math.round(results.stats?.duration ?? 0),
  status: totals.failed > 0 ? "failed" : "passed",
  totals,
  trigger: TRIGGER[env.GITHUB_EVENT_NAME] ?? env.GITHUB_EVENT_NAME ?? "local",
  commit: env.GITHUB_SHA ? env.GITHUB_SHA.slice(0, 7) : null,
  runUrl,
  reportPath: "report/",
  tests,
};

const historyPath = join(outDir, "history.json");
let history = [];
if (existsSync(historyPath)) {
  try {
    history = JSON.parse(readFileSync(historyPath, "utf8"));
    if (!Array.isArray(history)) history = [];
  } catch {
    // a corrupt history must not block publishing the new run
    history = [];
  }
}

const titles = (status) =>
  tests.filter((t) => t.status === status).map((t) => `${t.project} › ${t.title}`);

history = [
  {
    runAt: latest.runAt,
    status: latest.status,
    totals,
    durationMs: latest.durationMs,
    trigger: latest.trigger,
    commit: latest.commit,
    runUrl,
    failedTests: titles("failed"),
    flakyTests: titles("flaky"),
  },
  ...history.filter((run) => run.runUrl !== runUrl || runUrl === null),
].slice(0, HISTORY_LIMIT);

writeFileSync(join(outDir, "latest.json"), JSON.stringify(latest, null, 2) + "\n");
writeFileSync(historyPath, JSON.stringify(history, null, 2) + "\n");

console.log(
  `${latest.status}: ${totals.passed} passed, ${totals.failed} failed, ` +
    `${totals.flaky} flaky, ${totals.skipped} skipped. History: ${history.length} run(s).`,
);
