import { describe, expect, test } from "vitest";

import { renderDocs, renderOverview } from "./render.js";

describe("render surfaces", () => {
  test("overview carries the new workforce disclosure title", () => {
    expect(renderOverview()).toContain("UKG Workforce Disclosure Mirror");
    expect(renderOverview()).toContain("/workforce-lane");
  });

  test("docs route exposes the CLI and API shape", () => {
    const html = renderDocs();
    expect(html).toContain("ukg-workforce-board");
    expect(html).toContain("/api/disclosure-gaps");
  });
});
