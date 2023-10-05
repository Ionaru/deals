import { TimePipe } from "./time.pipe";

describe("timePipe", () => {
  it("create an instance", () => {
    expect.assertions(1);
    const pipe = new TimePipe();
    expect(pipe).toBeTruthy();
  });
});
