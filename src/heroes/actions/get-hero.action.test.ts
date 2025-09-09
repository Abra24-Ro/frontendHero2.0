import { describe, expect, test } from "vitest";
import { getHeroAction } from "./get-hero.action";

describe("getHeroAction", () => {
  test("should fetch hero data and return with complete url", async () => {
    const idSlug = "clark-kent";
    const result = await getHeroAction(idSlug);

    expect(result).toBeDefined();
    expect(result.image).toContain("http");
  });

  test("should throw an error if hero is not found", async () => {
    const idSlug = "susy-dias";

    await expect(getHeroAction(idSlug)).rejects.toThrow(
      "Request failed with status code 404"
    );
  });
});
