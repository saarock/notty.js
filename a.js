// Store timeout information
const timeoutDelay = 5000; // 5 seconds
const startTime = Date.now();
console.log(typeof startTime);
const timeoutId = setTimeout(() => {
    console.log('Timeout reached!');
    clearInterval(time)
}, timeoutDelay);


    // Function to calculate remaining time
    function getRemainingTime() {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(timeoutDelay - elapsedTime, 0);
        return remainingTime;
    }


