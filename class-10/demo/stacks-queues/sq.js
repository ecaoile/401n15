// Stacks and Queues

/*
  Stacks
    First In / Last Out
    Last In / First Out

    push()
    pop()
    peek()

*/

// Also other array methods: shift, unshift

class Stack {
  constructor() {
    this.storage = new Array();
  }
  push(item) {
    this.storage.push(item);
  }
  pop() {
    return this.storage.pop();
  }
  peek() {
    return this.storage[this.storage.length-1];
  }

  print() {
    while(value = this.pop()) {
      console.log(value);
    }
  }
}

/*
  Queue

  First In / First Out

  peek() -- looks at the one on the front
  enqueue() -- puts one at the end
  dequeue() -- takes the one off the front
*/

class Queue {
  constructor() {
    this.storage = new Array();
  }
  enqueue(item) {
    this.storage.push();
  }
  dequeue() {
    return this.storage.shift();
  }
  peek() {
    return this.storage[0];
  }
}
