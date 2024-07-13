 export class Queue<T> {
    private readonly store: T[];
    private front: number = -1;
    private rear: number = -1;
    private readonly size: number;

    constructor(size: number) {
        this.size = size;
        this.store = new Array<T>(size);
    }


    public enqueue(data: T): void {
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
        } else {
            this.rear = (this.rear+1) % this.size;
            this.store[this.rear] = data;
        }

    }


    public dequeue():T | null {
        if (this.isEmpty()) {
            return null;
        }
       const currentData: T =  this.store[this.front];
        if (this.front === this.rear) {
            this.front = this.rear = -1;
        } else {
            this.front = (this.front + 1) % this.size;
        }
        return currentData;

    }

    public isEmpty(): boolean {
        return this.front === -1 && this.rear === -1;
    }

    public isFull(): boolean {
        return (this.rear + 1) % this.size === this.front;
    }

    public length(): number {
        return this.size;
    }
    public usedLength(): number {
        if (this.isEmpty()) {
            return 0;
        } else if (this.front <= this.rear) {
            return (this.rear - this.front) + 1;
        } else {
            return (this.size - this.front) + (this.rear + 1)
        }
    }
}

const queue = new Queue(100);
export {queue}
