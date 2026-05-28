// SPDX-License-Identifier: AGPL-3.0-or-later

export type ProgramStatus = "ON_TRACK" | "AT_RISK";
export type PacketStatus = "OPEN" | "RESOLVED";
export type Severity = "high" | "medium" | "low" | "info";
export type EvidenceKind = "Disclosure" | "Acknowledgment" | "Escalation" | "Provisioning" | "Attestation" | string;
export type DisclosureDomain = "AI_NOTICE" | "PAYROLL" | "IDENTITY" | "MANAGER" | "POLICY" | string;

export interface WorkforceProgram {
  id: string;
  rollout: string;
  population: string;
  platform: string;
  owner: string;
  status: ProgramStatus;
  workflowHealthy: boolean;
  daysToReview: number;
  packet: string;
  excerpt: string;
  nextAction: string;
}

export interface DisclosurePacket {
  id: string;
  programId: string;
  rollout: string;
  population: string;
  platform: string;
  owner?: string;
  domain: DisclosureDomain;
  kind: EvidenceKind;
  severity: Severity;
  status: PacketStatus;
  scope: string;
  principal?: string;
  message: string;
  openedAt: string;
  dueAt: string;
}

export interface UkgWorkforceDisclosureExport {
  programs: WorkforceProgram[];
  packets: DisclosurePacket[];
}

export type FindingCode =
  | "no-on-track-programs"
  | "workforce-disclosure-gap"
  | "missing-policy-disclosure"
  | "missing-employee-acknowledgment"
  | "missing-provisioning-attestation"
  | "workflow-gap"
  | "stale-open-packet"
  | "high-severity-unassigned";

export interface Finding {
  code: FindingCode;
  severity: Severity;
  subject: "program" | "packet" | "workflow";
  subjectId: string;
  subjectName?: string;
  owner?: string;
  scope?: string;
  principal?: string;
  message: string;
}

export interface AnalysisOptions {
  now?: string;
  staleDetectionAfterHours?: number;
}

export interface CoverageReport {
  ok: boolean;
  programs: number;
  onTrackPrograms: number;
  packets: number;
  highSeverityPackets: number;
  workflowGaps: number;
  stalePackets: number;
  findingsList: Finding[];
}
