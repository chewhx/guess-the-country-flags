const data = require("./src/data/data.json");

class Node {
  constructor({ question, options, answer }) {
    this.question = question;
    this.options = options;
    this.answer = answer;
    this.checked = false;
    this.previous = null;
    this.next = null;
  }
}

class Questions {
  constructor(data) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let each of data) {
      this.add(new Node(each));
    }

    this.current = this.head;
  }

  add(node) {
    if (!this.head) {
      this.head = node;
      this.length++;
      return;
    }

    if (!this.tail) {
      this.head.next = node;
      this.tail = node;
      this.tail.previous = this.head;
      this.length++;
      return;
    }

    this.tail.next = node;
    const oldtail = this.tail;
    this.tail = node;
    this.tail.previous = oldtail;
    this.length++;
    return;
  }

  get(index) {
    let n = 0;
    let current = this.head;
    while (n < index + 1) {
      current = this.head.next;
      n++;
    }
    return current;
  }

  next() {
    this.current = this.current.next;
    return this.current;
  }

  previous() {
    this.current = this.current.previous;
    return this.current;
  }
}

const questions = new Questions(data);

let currentQuestion = questions.current;
console.log(currentQuestion.question);

currentQuestion = questions.next();
console.log(currentQuestion.question);

currentQuestion = questions.next();
console.log(currentQuestion.question);

currentQuestion = questions.previous();
console.log(currentQuestion.question);
