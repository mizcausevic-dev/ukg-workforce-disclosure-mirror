import { describe, expect, test } from "vitest";

import {
  disclosureGaps,
  payload,
  reviewPosture,
  summary,
  validation,
  workforceLane
} from "./ukgWorkforceDisclosureMirrorService.js";

describe("ukg workforce disclosure mirror service", () => {
  test("summary reports program and packet counts", () => {
    const result = summary();
    expect(result.programs).toBe(3);
    expect(result.onTrackPrograms).toBe(1);
    expect(result.packets).toBe(5);
  });

  test("lane and review packets are present", () => {
    expect(workforceLane()).toHaveLength(4);
    expect(reviewPosture()).toHaveLength(3);
  });

  test("payload includes disclosure findings and verification", () => {
    expect(disclosureGaps().length).toBeGreaterThan(0);
    expect(validation()).toHaveLength(5);
    expect(payload().sample.programs[0]?.rollout).toBe("AI assistant acceptable-use refresh");
  });
});
