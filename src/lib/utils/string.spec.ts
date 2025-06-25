import { describe, it, expect } from "vitest";
import { camelCaseToTitleCase, transliterate } from "./string";

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

describe("transliterate", () => {
  it("handles a normal ascii string", () => {
    expect(transliterate("The quick brown fox jumped over the lazy dog. 12345")).toBe(
      "The quick brown fox jumped over the lazy dog. 12345",
    );
    expect(transliterate("#1 Single")).toBe("#1 Single");
    expect(transliterate("I.V. Drip")).toBe("I.V. Drip");
    expect(transliterate("Build-A-Blast Buckshot")).toBe("Build-A-Blast Buckshot");
    expect(transliterate("Nano Cola™ Nitrous")).toBe("Nano ColaTM Nitrous");
  });

  it("helps when searching for lookalike-ish characters", () => {
    expect(transliterate("Rüstung von Wilhelm")).toBe("Rustung von Wilhelm");
    expect(transliterate("Lille Fælde")).toBe("Lille Faelde");
    expect(transliterate("Volley à Deux")).toBe("Volley a Deux");
    expect(transliterate("Lúcio")).toBe("Lucio");
  });
});
