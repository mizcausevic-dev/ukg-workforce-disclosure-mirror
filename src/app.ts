// SPDX-License-Identifier: AGPL-3.0-or-later

import express from "express";
import { fileURLToPath } from "node:url";

import {
  disclosureGaps,
  payload,
  reviewPosture,
  summary,
  verification,
  workforceLane
} from "./services/ukgWorkforceDisclosureMirrorService.js";
import {
  renderDisclosureGaps,
  renderDocs,
  renderOverview,
  renderReviewPosture,
  renderValidation,
  renderWorkforceLane,
} from "./services/render.js";

const app = express();
const port = Number(process.env.PORT ?? 5524);
const host = process.env.HOST || "0.0.0.0";

app.get("/", (_req, res) => res.type("html").send(renderOverview()));
app.get("/workforce-lane", (_req, res) => res.type("html").send(renderWorkforceLane()));
app.get("/disclosure-gaps", (_req, res) => res.type("html").send(renderDisclosureGaps()));
app.get("/review-posture", (_req, res) => res.type("html").send(renderReviewPosture()));
app.get("/verification", (_req, res) => res.type("html").send(renderValidation()));
app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
app.get("/api/workforce-lane", (_req, res) => res.json(workforceLane()));
app.get("/api/disclosure-gaps", (_req, res) => res.json(disclosureGaps()));
app.get("/api/review-posture", (_req, res) => res.json(reviewPosture()));
app.get("/api/verification", (_req, res) => res.json(verification()));
app.get("/api/sample", (_req, res) => res.json(payload()));

const currentFile = fileURLToPath(import.meta.url);
const invokedDirectly = process.argv[1] !== undefined && currentFile === process.argv[1];

if (invokedDirectly) {
  app.listen(port, host, () => {
    console.log(`UKG Workforce Disclosure Mirror listening on http://${host}:${port}`);
  });
}

export default app;
