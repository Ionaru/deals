import { describe, beforeEach, it, expect } from "vitest";

import { AlbertHeijn } from "./albert-heijn";
import { Product } from "./api";
import arielBigOneColor from "./test-data/ah-ariel-big-one-color.json";
import goudsalami from "./test-data/ah-goudsalami.json";
import speklap from "./test-data/ah-speklap-3st.json";

describe("Albert Heijn", () => {
  let scraper: AlbertHeijn;

  beforeEach(() => {
    scraper = new AlbertHeijn({} as any);
  });

  it("should have the correct discounts for Goudsalami", async () => {
    const parsed = await scraper.parseDiscounts(goudsalami as Product, "");
    expect(parsed?.price).toBe(2.35);
    expect(parsed?.dealPrice).toBe(1.75);
    expect(parsed?.purchaseAmount).toBe(1);
  });

  it("should have the correct discounts for Speklap", async () => {
    const parsed = await scraper.parseDiscounts(speklap as Product, "");
    expect(parsed?.price).toBe(4.39);
    expect(parsed?.dealPrice).toBe(3.96);
    expect(parsed?.purchaseAmount).toBe(1);
  });

  it("should have the correct discounts for Ariel Big One Color", async () => {
    const parsed = await scraper.parseDiscounts(
      arielBigOneColor as Product,
      "",
    );
    expect(parsed?.price).toBe(22.99);
    expect(parsed?.dealPrice).toBe(14.94);
    expect(parsed?.purchaseAmount).toBe(1);
  });
});
