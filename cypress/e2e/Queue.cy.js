import { Queue } from "../../dist/models/index.js";

describe("Queue", () => {
  let queue;

  beforeEach(() => {
    queue = new Queue(5);
  });

  it("should initialize with the correct size", () => {
    expect(queue.length()).to.equal(5);
    expect(queue.usedLength()).to.equal(0);
  });

  it("should enqueue elements correctly", () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    expect(queue.usedLength()).to.equal(3);
    expect(queue.store[0]).to.equal(1);
    expect(queue.store[1]).to.equal(2);
    expect(queue.store[2]).to.equal(3);
  });

  it("should not enqueue if data is null", () => {
    queue.enqueue(null);

    expect(queue.usedLength()).to.equal(0);
  });

  it("should not enqueue if the queue is full", () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    queue.enqueue(4);
    queue.enqueue(5);
    queue.enqueue(6);

    expect(queue.usedLength()).to.equal(5);
  });

  it("should dequeue elements correctly", () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    expect(queue.dequeue()).to.equal(1);
    expect(queue.dequeue()).to.equal(2);
    expect(queue.dequeue()).to.equal(3);
    expect(queue.dequeue()).to.be.null;

    expect(queue.usedLength()).to.equal(0);
  });

  it("should return null when dequeueing from an empty queue", () => {
    expect(queue.dequeue()).to.be.null;
  });

  it("should identify when the queue is empty", () => {
    expect(queue.isEmpty()).to.be.true;

    queue.enqueue(1);
    expect(queue.isEmpty()).to.be.false;

    queue.dequeue();
    expect(queue.isEmpty()).to.be.true;
  });

  it("should identify when the queue is full", () => {
    expect(queue.isFull()).to.be.false;

    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    queue.enqueue(4);
    queue.enqueue(5);

    expect(queue.isFull()).to.be.true;
  });

  it("should calculate usedLength correctly", () => {
    expect(queue.usedLength()).to.equal(0);

    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    expect(queue.usedLength()).to.equal(3);

    queue.dequeue();
    expect(queue.usedLength()).to.equal(2);

    queue.dequeue();
    queue.dequeue();
    expect(queue.usedLength()).to.equal(0);
  });
});
