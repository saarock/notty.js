import { time } from "../../src/utils/index.js";

describe("Time", () => {
  it("should return the correct remaining time", () => {
    const startTime = Date.now();
    const timeoutDelay = 5000; // 5 seconds

    // Immediate check
    let remainingTime = time.getRemainingTime(startTime, timeoutDelay);
    expect(remainingTime).to.be.closeTo(timeoutDelay, 10);

    // Check after 2 seconds
    cy.wait(2000).then(() => {
      remainingTime = time.getRemainingTime(startTime, timeoutDelay);
      expect(remainingTime).to.be.closeTo(timeoutDelay - 2000, 10); // 5s - 2s
    });

    // Check after 6 seconds (exceeding the timeout)
    cy.wait(4000).then(() => {
      remainingTime = time.getRemainingTime(startTime, timeoutDelay);
      expect(remainingTime).to.equal(0); // Timeout exceeded
    });
  });
});
