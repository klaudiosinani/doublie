'use strict';

class Node {
  constructor(options = {}) {
    this._next = null;
    this._value = options.value;
  }

  get next() {
    return this._next;
  }

  set next(node) {
    this._next = node;
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
  }
}

module.exports = Node;
