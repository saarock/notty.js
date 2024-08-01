class Time {
  // timer
  getRemainingTime(startTime: number, timeoutDelay: number): number {
    const elapsedTime = Date.now() - startTime;
    return Math.max(timeoutDelay - elapsedTime, 0);
  }
}

const time = new Time();
export { time };
