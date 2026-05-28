// SPDX-License-Identifier: AGPL-3.0-or-later

import type { UkgWorkforceDisclosureExport } from "../types.js";

export const sampleUkgWorkforceDisclosurePayload: UkgWorkforceDisclosureExport = {
  programs: [
    {
      id: "WFD-1008",
      rollout: "AI assistant acceptable-use refresh",
      population: "North America exempt workforce",
      platform: "UKG Pro + Entra",
      owner: "HR Technology Governance",
      status: "AT_RISK",
      workflowHealthy: false,
      daysToReview: 3,
      packet: "Employee notice and acknowledgment packet",
      excerpt: "Policy review found missing employee-facing AI notice proof and incomplete manager escalation attestation.",
      nextAction: "Route the notice packet and manager attestation before the workforce change board review."
    },
    {
      id: "WFD-2041",
      rollout: "Open enrollment policy update",
      population: "EMEA salaried workforce",
      platform: "UKG Pro",
      owner: "People Operations",
      status: "ON_TRACK",
      workflowHealthy: true,
      daysToReview: 5,
      packet: "Enrollment disclosure and attestation packet",
      excerpt: "Employee notice packet is complete; only final review acknowledgment is pending.",
      nextAction: "Keep the packet ready and hold for workforce signoff."
    },
    {
      id: "WFD-3112",
      rollout: "Privileged access manager onboarding notice",
      population: "Global admin and helpdesk cohort",
      platform: "UKG Pro + CyberArk",
      owner: "Identity Operations",
      status: "AT_RISK",
      workflowHealthy: false,
      daysToReview: 1,
      packet: "Provisioning, acknowledgment, and fallback packet",
      excerpt: "Disclosure reopened after provisioning drift and stale acknowledgment evidence across the privileged-access rollout.",
      nextAction: "Repair the provisioning chronology and finalize employee acknowledgment proof for the high-risk cohort."
    }
  ],
  packets: [
    {
      id: "PKT-001",
      programId: "WFD-1008",
      rollout: "AI assistant acceptable-use refresh",
      population: "North America exempt workforce",
      platform: "UKG Pro + Entra",
      owner: "HR Technology Governance",
      domain: "AI_NOTICE",
      kind: "Disclosure",
      severity: "high",
      status: "OPEN",
      scope: "Employee AI notice review",
      principal: "Employee notice packet",
      message: "Employee AI notice packet is still missing the final workforce-facing proof referenced in the review board packet.",
      openedAt: "2026-05-24T08:00:00Z",
      dueAt: "2026-05-30T18:00:00Z"
    },
    {
      id: "PKT-002",
      programId: "WFD-1008",
      rollout: "AI assistant acceptable-use refresh",
      population: "North America exempt workforce",
      platform: "UKG Pro + Entra",
      owner: "People Manager Enablement",
      domain: "MANAGER",
      kind: "Attestation",
      severity: "medium",
      status: "OPEN",
      scope: "Manager escalation review",
      principal: "Manager attestation packet",
      message: "Manager escalation packet does not yet reconcile local review ownership and employee-safe fallback guidance.",
      openedAt: "2026-05-26T12:00:00Z",
      dueAt: "2026-05-30T18:00:00Z"
    },
    {
      id: "PKT-003",
      programId: "WFD-3112",
      rollout: "Privileged access manager onboarding notice",
      population: "Global admin and helpdesk cohort",
      platform: "UKG Pro + CyberArk",
      owner: "Identity Operations",
      domain: "PAYROLL",
      kind: "Acknowledgment",
      severity: "high",
      status: "OPEN",
      scope: "Employee acknowledgment packet",
      principal: "Recorded acknowledgment chronology",
      message: "Acknowledgment packet is missing the final chronology tying workforce notice delivery to the privileged-access path.",
      openedAt: "2026-05-23T09:30:00Z",
      dueAt: "2026-05-29T21:00:00Z"
    },
    {
      id: "PKT-004",
      programId: "WFD-3112",
      rollout: "Privileged access manager onboarding notice",
      population: "Global admin and helpdesk cohort",
      platform: "UKG Pro + CyberArk",
      owner: "Identity Operations",
      domain: "IDENTITY",
      kind: "Provisioning",
      severity: "medium",
      status: "OPEN",
      scope: "Provisioning mirror review",
      principal: "Provisioning attestation",
      message: "Provisioning mirror proof needs reattached evidence after the reopened workforce review.",
      openedAt: "2026-05-25T16:00:00Z",
      dueAt: "2026-05-29T21:00:00Z"
    },
    {
      id: "PKT-005",
      programId: "WFD-2041",
      rollout: "Open enrollment policy update",
      population: "EMEA salaried workforce",
      platform: "UKG Pro",
      owner: "People Operations",
      domain: "POLICY",
      kind: "Attestation",
      severity: "low",
      status: "RESOLVED",
      scope: "Disclosure and review packet",
      principal: "Policy completion proof",
      message: "Disclosure packet was accepted on the last workforce-governance touchpoint.",
      openedAt: "2026-05-22T10:00:00Z",
      dueAt: "2026-05-28T17:00:00Z"
    }
  ]
};

export const workforceLanePackets = [
  {
    id: "disclosure-lane",
    lane: "Employee disclosure and review packet triage",
    owner: "HR Technology Governance",
    focus: "Missing employee notice proof and review-safe disclosure context",
    status: "RED",
    nextAction: "Repair the two at-risk packets before workforce review posture hardens.",
    note: "The intake desk should surface which rollouts are missing notice proof, not just acknowledgment counts."
  },
  {
    id: "acknowledgment-lane",
    lane: "Acknowledgment and notice coverage",
    owner: "People Operations",
    focus: "Acknowledgment evidence and employee-notice visibility",
    status: "YELLOW",
    nextAction: "Close the acknowledgment chronology gap for WFD-3112.",
    note: "Acknowledgment packets need owner-safe routing before they become workforce exceptions."
  },
  {
    id: "provisioning-lane",
    lane: "Provisioning mirror and identity proof",
    owner: "Identity Operations",
    focus: "Provisioning attestation mapping and employee-safe enablement readiness",
    status: "YELLOW",
    nextAction: "Complete provisioning mirror reconciliation for the privileged-access rollout.",
    note: "Provisioning drift should stay visible before it contaminates workforce trust."
  },
  {
    id: "manager-lane",
    lane: "Manager escalation and fallback operations",
    owner: "People Manager Enablement",
    focus: "Manager review queues, local fallback, and escalation-safe attestation",
    status: "RED",
    nextAction: "Finalize the manager fallback chronology and repair stale escalation proof.",
    note: "Workforce disclosure packets must stay readable to both rollout managers and auditors."
  }
];

export const reviewPackets = [
  {
    packetId: "WPK-14",
    lane: "AI assistant acceptable-use refresh",
    owner: "HR Technology Governance",
    completenessScore: 58,
    status: "RED",
    blocker: "Employee AI notice proof still missing",
    launchWindowHours: 18,
    decisionNote: "Do not clear the rollout until the employee disclosure and manager attestation are bundled together."
  },
  {
    packetId: "WPK-18",
    lane: "Open enrollment policy update",
    owner: "People Operations",
    completenessScore: 91,
    status: "GREEN",
    blocker: "No active blocker",
    launchWindowHours: 42,
    decisionNote: "Packet is safe for workforce confirmation and operator follow-up."
  },
  {
    packetId: "WPK-22",
    lane: "Privileged access manager onboarding notice",
    owner: "Identity Operations",
    completenessScore: 63,
    status: "YELLOW",
    blocker: "Acknowledgment chronology is stale",
    launchWindowHours: 12,
    decisionNote: "Review can clear if the acknowledgment packet is repaired in the current launch window."
  }
];
