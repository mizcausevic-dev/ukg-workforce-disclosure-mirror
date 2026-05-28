// SPDX-License-Identifier: AGPL-3.0-or-later

import { analyze } from "../analyze.js";
import { reviewPackets, sampleUkgWorkforceDisclosurePayload, workforceLanePackets } from "../data/sampleUkgWorkforceDisclosures.js";
import type { Finding } from "../types.js";

const NOW = "2026-05-31T00:00:00Z";
const report = analyze(sampleUkgWorkforceDisclosurePayload, {
  now: NOW,
  staleDetectionAfterHours: 72
});

function severityRank(finding: Finding): number {
  return finding.severity === "high" ? 0 : finding.severity === "medium" ? 1 : finding.severity === "low" ? 2 : 3;
}

export function summary() {
  return {
    programs: report.programs,
    onTrackPrograms: report.onTrackPrograms,
    packets: report.packets,
    highSeverityPackets: report.highSeverityPackets,
    workflowGaps: report.workflowGaps,
    stalePackets: report.stalePackets,
    recommendation:
      "Restore missing employee notice proof, close the acknowledgment and provisioning packet gaps, repair stale manager attestations, and stabilize workforce ownership before the next review window."
  };
}

export function workforceLane() {
  return workforceLanePackets.map((lane) => ({
    ...lane,
    relatedFindings: report.findingsList.filter((finding) => {
      if (lane.id === "disclosure-lane") return finding.code === "workforce-disclosure-gap" || finding.code === "missing-policy-disclosure";
      if (lane.id === "acknowledgment-lane") return finding.code === "missing-employee-acknowledgment" || finding.code === "stale-open-packet";
      if (lane.id === "provisioning-lane") return finding.code === "missing-provisioning-attestation" || finding.code === "workflow-gap";
      if (lane.id === "manager-lane") return finding.code === "high-severity-unassigned" || finding.code === "stale-open-packet";
      return false;
    }).length
  }));
}

export function disclosureGaps() {
  return [...report.findingsList]
    .sort((left, right) => severityRank(left) - severityRank(right))
    .map((finding) => ({
      ...finding,
      owner:
        finding.owner ??
        (finding.code === "missing-policy-disclosure"
          ? "HR Technology Governance"
          : finding.code === "missing-employee-acknowledgment"
            ? "People Operations"
            : finding.code === "missing-provisioning-attestation"
              ? "Identity Operations"
              : "People Manager Enablement")
    }));
}

export function reviewPosture() {
  return reviewPackets;
}

export function verification() {
  return [
    "The dashboard is backed by a real offline UKG/workforce disclosure analyzer and CLI, not static copy alone.",
    "Workforce, packet, and review snapshots are synthetic sample data only; no live employee, tenant, or payroll records are published.",
    "The control plane keeps employee notice proof, acknowledgment evidence, provisioning drift, and review readiness visible for HR and audit stakeholders.",
    "This surface demonstrates workforce disclosure routing and review-safe sequencing, not a generic HR keyword page.",
    "It complements identity, governance, and growth-ops surfaces with a reusable workforce evidence-routing primitive."
  ];
}

export const validation = verification;

export function payload() {
  return {
    summary: summary(),
    workforceLane: workforceLane(),
    disclosureGaps: disclosureGaps(),
    reviewPosture: reviewPosture(),
    verification: verification(),
    sample: sampleUkgWorkforceDisclosurePayload
  };
}
