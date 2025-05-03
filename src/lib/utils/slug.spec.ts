import { describe, it, expect } from "vitest";
import { toSlug } from "./slug";

describe("toSlug", () => {
  it("Should replace space with dashes without repeats", () => {
    expect(toSlug("Some String")).toBe("some-string");
    expect(toSlug("Some 0 string")).toBe("some-0-string");
    expect(toSlug("Some   string")).toBe("some-string");
  });

  it("Should replace special characters with dashes without repeats", () => {
    expect(toSlug("Some_-_string")).toBe("some-string");
    expect(toSlug("Some:string")).toBe("some-string");
    expect(toSlug("!Some_string!")).toBe("some-string");
    expect(toSlug("Some@string!!!")).toBe("some-string");
  });
});
