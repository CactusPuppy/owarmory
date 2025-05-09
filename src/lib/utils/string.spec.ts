import { describe, it, expect } from "vitest";
import { camelCaseToTitleCase } from "./string";

describe("camelCaseToTitleCase", () => {
  it("converts one-word names", () => {
    expect(camelCaseToTitleCase("test")).toBe("Test");
    expect(camelCaseToTitleCase("test34")).toBe("Test34");
    expect(camelCaseToTitleCase("hero")).toBe("Hero");
  });

  it("converts multi-word names", () => {
    expect(camelCaseToTitleCase("heroName")).toBe("Hero Name");
    expect(camelCaseToTitleCase("roundInfos")).toBe("Round Infos");
    expect(camelCaseToTitleCase("fooBazBar")).toBe("Foo Baz Bar");
  });

  it("Does not separate letters of an abbreviation", () => {
    expect(camelCaseToTitleCase("iconURL")).toBe("Icon URL");
  });
});
