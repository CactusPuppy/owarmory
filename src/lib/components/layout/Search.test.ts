import { fireEvent, render } from "@testing-library/svelte";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Search from "./Search.svelte";
import { goto } from "$app/navigation";

vi.mock("$app/navigation", () => ({
  afterNavigate: vi.fn(),
  goto: vi.fn(),
}));

describe("Search.svelte", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("Should navigate to search page with given query on form submit", async () => {
    const { getByRole } = render(Search);

    await fireEvent.input(getByRole("searchbox"), { target: { value: "Some query" } });
    await fireEvent.click(getByRole("button"));

    expect(goto).toHaveBeenCalledWith("/search?query=Some query");
  });

  it("Should not navigate to search page on form submit when no query is given", async () => {
    const { getByRole } = render(Search);

    await fireEvent.input(getByRole("searchbox"), { target: { value: "" } });
    await fireEvent.click(getByRole("button"));

    expect(goto).not.toHaveBeenCalled();
  });
});
