import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { analyze } from "../src/analyze.js";
import { toMarkdown, toSummary } from "../src/format.js";
import type { UkgWorkforceDisclosureExport } from "../src/types.js";

const here = fileURLToPath(new URL(".", import.meta.url));
const fixture = (name: string): UkgWorkforceDisclosureExport =>
  JSON.parse(readFileSync(`${here}/../fixtures/${name}`, "utf8")) as UkgWorkforceDisclosureExport;

const NOW = "2026-05-30T00:00:00Z";

describe("analyze", () => {
  it("counts programs and packets", () => {
    const report = analyze(fixture("ukg-workforce-disclosures.json"), { now: NOW });
    expect(report.programs).toBe(3);
    expect(report.onTrackPrograms).toBe(1);
    expect(report.packets).toBe(5);
  });

  it("flags missing on-track programs as high", () => {
    const report = analyze({ programs: [], packets: [] }, { now: NOW });
    expect(report.findingsList.find((finding) => finding.code === "no-on-track-programs")?.severity).toBe("high");
  });

  it("flags workforce disclosure gaps", () => {
    const report = analyze(fixture("ukg-workforce-disclosures.json"), { now: NOW });
    expect(report.findingsList.find((finding) => finding.code === "workforce-disclosure-gap")?.scope).toBe("UKG Pro + Entra");
  });

  it("flags disclosure, acknowledgment, provisioning, and workflow gaps", () => {
    const report = analyze(fixture("ukg-workforce-disclosures.json"), { now: NOW });
    expect(report.findingsList.find((finding) => finding.code === "missing-policy-disclosure")).toBeDefined();
    expect(report.findingsList.find((finding) => finding.code === "missing-employee-acknowledgment")).toBeDefined();
    expect(report.findingsList.find((finding) => finding.code === "missing-provisioning-attestation")).toBeDefined();
    expect(report.findingsList.find((finding) => finding.code === "workflow-gap")).toBeDefined();
  });

  it("flags stale open packets", () => {
    const report = analyze(fixture("ukg-workforce-disclosures.json"), { now: NOW, staleDetectionAfterHours: 24 });
    expect(report.findingsList.find((finding) => finding.code === "stale-open-packet")).toBeDefined();
  });

  it("ok=true on a clean fixture", () => {
    const report = analyze(fixture("ukg-workforce-disclosures-clean.json"), { now: NOW });
    expect(report.ok).toBe(true);
    expect(report.findingsList.filter((finding) => finding.severity === "high")).toEqual([]);
  });
});

describe("formatters", () => {
  it("toMarkdown ranks high findings first", () => {
    const markdown = toMarkdown(analyze(fixture("ukg-workforce-disclosures.json"), { now: NOW }));
    expect(markdown).toContain("❌");
    expect(markdown.indexOf("🔴")).toBeLessThan(markdown.indexOf("🟠"));
  });

  it("toSummary emits a one-liner", () => {
    const summary = toSummary(analyze(fixture("ukg-workforce-disclosures.json"), { now: NOW }));
    expect(summary).toMatch(/programs/);
    expect(summary).toMatch(/packets/);
  });
});
