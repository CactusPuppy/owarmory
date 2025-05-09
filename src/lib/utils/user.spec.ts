import { describe, it, expect } from "vitest";
import { cleanName } from "./user";

describe("cleanName", () => {
  it("Should return string without a delimiter", () => {
    expect(cleanName("User#123")).toBe("User");
    expect(cleanName("User With Spaces#123")).toBe("User With Spaces");
    expect(cleanName("User")).toBe("User");
  });
});
