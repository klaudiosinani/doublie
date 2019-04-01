'use strict';

class List {
  constructor() {
    this._head = null;
    this._length = 0;
    this._last = null;
  }

  get head() {
    return this._head;
  }

  get length() {
    return this._length;
  }

  get last() {
    return this._last;
  }

  _arrayify(x) {
    return Array.isArray(x) ? x : [x];
  }

  _isValid(index) {
    return index >= 0 && index < this.length;
  }

  _traverse(index) {
    let count = 0;
    let {_head: node} = this;

    while (index !== count) {
      node = node.next;
      count++;
    }

    return node;
  }

  _traverseRight(index) {
    let count = this.length - (index + 1);
    let {_last: node} = this;

    while (count !== 0) {
      node = node.prev;
      count--;
    }

    return node;
  }

  clear() {
    this._head = null;
    this._last = null;
    this._length = 0;
    return this;
  }

  get(index) {
    const {value} = this.node(index);
    return value;
  }

  isCircular() {
    return this.constructor.name === 'Circular';
  }

  isEmpty() {
    return this.length === 0 && !this._head;
  }

  isLinear() {
    return this.constructor.name === 'Linear';
  }

  node(index) {
    if (!this._isValid(index)) {
      throw new RangeError('List index out of bounds');
    }

    if (index < this.length / 2) {
      return this._traverse(index);
    }

    return this._traverseRight(index);
  }

  set({value, index}) {
    const node = this.node(index);
    node.value = value;
    return this;
  }
}

module.exports = List;
