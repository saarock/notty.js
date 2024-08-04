var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
export class Queue {
  constructor(size) {
    this.front = -1;
    this.rear = -1;
    this.size = size;
    this.store = new Array(size);
  }
  enqueue(data) {
    return __awaiter(this, void 0, void 0, function* () {
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
        this.rear = (this.rear + 1) % this.size;
        this.store[this.rear] = data;
      }
    });
  }
  dequeue() {
    return __awaiter(this, void 0, void 0, function* () {
      if (this.isEmpty()) {
        return null;
      }
      const currentData = this.store[this.front];
      if (this.front === this.rear) {
        this.front = this.rear = -1;
      } else {
        this.front = (this.front + 1) % this.size;
      }
      return currentData;
    });
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
    } else if (this.front <= this.rear) {
      return this.rear - this.front + 1;
    } else {
      return this.size - this.front + (this.rear + 1);
    }
  }
}
const queue = new Queue(100);
export { queue };
//# sourceMappingURL=Queue.js.map
