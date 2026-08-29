"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const appPath = path.join(__dirname, "..", "app.js");
const source = fs.readFileSync(appPath, "utf8");
const startMarker = "function parseIndexCount(";
const endMarker = "\nfunction createCell(";
const start = source.indexOf(startMarker);
const end = source.indexOf(endMarker, start);

assert.notEqual(start, -1, "count parser must remain present in app.js");
assert.notEqual(end, -1, "count parser block must remain extractable from app.js");

const factory = new Function(
  `"use strict";\n${source.slice(start, end)}\nreturn normalizeAdvisoryFailureCounts;`
);
const normalizeAdvisoryFailureCounts = factory();

const cases = [
  {
    name: "legacy total remains the primary value",
    input: { advisory_failed: 17 },
    expected: { current: 17, historical: null, total: 17, hasSplit: false }
  },
  {
    name: "valid split displays the current value",
    input: {
      advisory_failed: 17,
      latest_advisory_failed: 13,
      historical_advisory_failed: 4
    },
    expected: { current: 13, historical: 4, total: 17, hasSplit: true }
  },
  {
    name: "zero is a valid split value",
    input: {
      advisory_failed: 4,
      latest_advisory_failed: 0,
      historical_advisory_failed: 4
    },
    expected: { current: 0, historical: 4, total: 4, hasSplit: true }
  },
  {
    name: "all-zero split remains valid",
    input: {
      advisory_failed: 0,
      latest_advisory_failed: 0,
      historical_advisory_failed: 0
    },
    expected: { current: 0, historical: 0, total: 0, hasSplit: true }
  },
  {
    name: "numeric strings preserve legacy compatibility",
    input: {
      advisory_failed: "17",
      latest_advisory_failed: "13",
      historical_advisory_failed: "4"
    },
    expected: { current: 13, historical: 4, total: 17, hasSplit: true }
  },
  {
    name: "an incomplete split falls back to the compatibility total",
    input: { advisory_failed: 17, latest_advisory_failed: 13 },
    expected: { current: 17, historical: null, total: 17, hasSplit: false }
  },
  {
    name: "a mismatched split falls back to the compatibility total",
    input: {
      advisory_failed: 17,
      latest_advisory_failed: 14,
      historical_advisory_failed: 4
    },
    expected: { current: 17, historical: null, total: 17, hasSplit: false }
  },
  {
    name: "invalid counts fail safely",
    input: {
      advisory_failed: -1,
      latest_advisory_failed: Number.NaN,
      historical_advisory_failed: null
    },
    expected: { current: 0, historical: null, total: 0, hasSplit: false }
  }
];

const appContractChecks = [
  [
    'const advisoryLabelKey = advisoryFailureCounts.hasSplit',
    "the metric label must follow split validity"
  ],
  [
    '? "metric_advisory_failed_current"',
    "a valid split must select the current label"
  ],
  [
    ': "metric_advisory_failed";',
    "legacy data must select the compatibility label"
  ],
  [
    '${t("metric_advisory_failed_note")} · ${t("metric_advisory_failed_historical")}',
    "the split note must retain its non-blocking description"
  ]
];

for (const testCase of cases) {
  assert.deepEqual(
    normalizeAdvisoryFailureCounts(testCase.input),
    testCase.expected,
    testCase.name
  );
}

for (const [fragment, message] of appContractChecks) {
  assert.ok(source.includes(fragment), message);
}

const totalChecks = cases.length + appContractChecks.length;
console.log(`advisory count compatibility: ${totalChecks}/${totalChecks} passed`);
