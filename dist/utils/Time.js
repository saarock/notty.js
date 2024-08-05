class Time {
  getRemainingTime(startTime, timeoutDelay) {
    const elapsedTime = Date.now() - startTime;
    return Math.max(timeoutDelay - elapsedTime, 0);
  }
}
const time = new Time();
export { time };
//# sourceMappingURL=Time.js.map
