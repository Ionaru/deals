import { ScraperStatus } from "./api";

describe("api", () => {
  it("should work", () => {
    expect.assertions(1);
    expect(ScraperStatus.IDLE).toBe("IDLE");
  });
});
