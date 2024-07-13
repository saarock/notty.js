export class Queue {
    constructor(size) {
        this.front = -1;
        this.rear = -1;
        this.size = size;
        this.store = new Array(size);
    }
    enqueue(data) {
        if (data === null) {
            return;
        }
        if (this.isFull()) {
            return;
        }
        if (this.isEmpty()) {
            this.front = 0;
            this.rear = 0;
            this.store[this.front] = data;
        }
        else {
            this.rear = (this.rear + 1) % this.size;
            this.store[this.rear] = data;
        }
    }
    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        const currentData = this.store[this.front];
        if (this.front === this.rear) {
            this.front = this.rear = -1;
        }
        else {
            this.front = (this.front + 1) % this.size;
        }
        return currentData;
    }
    isEmpty() {
        return this.front === -1 && this.rear === -1;
    }
    isFull() {
        return (this.rear + 1) % this.size === this.front;
    }
    length() {
        return this.size;
    }
    usedLength() {
        if (this.isEmpty()) {
            return 0;
        }
        else if (this.front <= this.rear) {
            return (this.rear - this.front) + 1;
        }
        else {
            return (this.size - this.front) + (this.rear + 1);
        }
    }
}
const queue = new Queue(100);
export { queue };
//# sourceMappingURL=Queue.js.map