import { ScraperStatus } from "./api.js";

describe("api", () => {
  it("should work", () => {
    expect.assertions(1);
    expect(ScraperStatus.IDLE).toBe("IDLE");
  });
});
