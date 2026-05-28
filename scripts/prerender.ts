// SPDX-License-Identifier: AGPL-3.0-or-later

import { mkdir, writeFile } from "node:fs/promises";

import {
  disclosureGaps,
  payload,
  reviewPosture,
  summary,
  verification,
  workforceLane
} from "../src/services/ukgWorkforceDisclosureMirrorService.js";
import {
  renderDisclosureGaps,
  renderDocs,
  renderOverview,
  renderReviewPosture,
  renderValidation,
  renderWorkforceLane
} from "../src/services/render.js";

async function writePage(route: string, html: string) {
  const directory = route === "/" ? "site" : `site${route}`;
  await mkdir(directory, { recursive: true });
  await writeFile(`${directory}/index.html`, html, "utf8");
}

async function writeJson(name: string, value: unknown) {
  await mkdir("site/api", { recursive: true });
  await writeFile(`site/api/${name}.json`, JSON.stringify(value, null, 2), "utf8");
}

await writePage("/", renderOverview());
await writePage("/workforce-lane", renderWorkforceLane());
await writePage("/disclosure-gaps", renderDisclosureGaps());
await writePage("/review-posture", renderReviewPosture());
await writePage("/verification", renderValidation());
await writePage("/docs", renderDocs());

await writeJson("summary", summary());
await writeJson("workforce-lane", workforceLane());
await writeJson("disclosure-gaps", disclosureGaps());
await writeJson("review-posture", reviewPosture());
await writeJson("verification", verification());
await writeJson("sample", payload());
