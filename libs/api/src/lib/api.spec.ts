import { api } from "./api";

describe("api", () => {
  it("should work", () => {
    expect.assertions(1);
    expect(api()).toBe("api");
  });
});
