import { describe, it, expect } from "vitest";
import { ZodIssuePathInBuildToHumanString } from "./build";

describe("ZodIssuePathInBuildToHumanString", () => {
  it("Returns the first element with just one item", () => {
    expect(ZodIssuePathInBuildToHumanString(["title"])).toBe("Title");
    expect(ZodIssuePathInBuildToHumanString(["heroName"])).toBe("Hero Name");

    // Special case: convert "roundInfos" to "Rounds"
    expect(ZodIssuePathInBuildToHumanString(["roundInfos"])).toBe("Rounds");
  });

  it("Numbers the round correctly", () => {
    expect(ZodIssuePathInBuildToHumanString(["roundInfos", 0])).toBe("Round 1");
    expect(ZodIssuePathInBuildToHumanString(["roundInfos", 1])).toBe("Round 2");
    expect(ZodIssuePathInBuildToHumanString(["roundInfos", 6])).toBe("Round 7");
  });

  it("Labels field of round info correctly", () => {
    expect(ZodIssuePathInBuildToHumanString(["roundInfos", 0, "orderIndex"])).toBe(
      "Round 1: Order Index",
    );
    expect(ZodIssuePathInBuildToHumanString(["roundInfos", 2, "note"])).toBe("Round 3: Note");
    expect(ZodIssuePathInBuildToHumanString(["roundInfos", 5, "sections"])).toBe(
      "Round 6: Sections",
    );
  });

  it("Labels deeply nested fields correctly", () => {
    expect(ZodIssuePathInBuildToHumanString(["roundInfos", 0, "sections", 2])).toBe(
      "Round 1: Section 3",
    );
    expect(ZodIssuePathInBuildToHumanString(["roundInfos", 2, "sections", 0, "title"])).toBe(
      "Round 3: Section 1: Title",
    );
    expect(ZodIssuePathInBuildToHumanString(["roundInfos", 4, "sections", 1, "power", "id"])).toBe(
      "Round 5: Section 2: Power: Id",
    );
  });
});
