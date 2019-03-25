'use strict';
const List = require('./list');
const Node = require('./node');

class Linear extends List {
  _appendHead(value) {
    const {_head} = this;
    const node = new Node(value);
    node.next = _head;
    this._head.previous = node;
    this._head = node;
    this._length++;
  }

  _appendLast(value) {
    const {_last} = this;
    const node = new Node(value);
    node.prev = _last;
    this._last.next = node;
    this._last = node;
    this._length++;
  }

  _initializeList(value) {
    const node = new Node(value);
    this._head = node;
    this._last = node;
    this._length++;
  }

  append(...values) {
    values.forEach(value => {
      if (this.isEmpty()) {
        return this._initializeList(value);
      }

      return this._appendLast(value);
    });
    return this;
  }

  forEach(fn) {
    let {_head: node} = this;

    while (node) {
      fn(node.value);
      node = node.next;
    }

    return this;
  }

  map(fn) {
    const list = new Linear();
    this.forEach(x => list.append(fn(x)));
    return list;
  }

  node(index) {
    if (!this._isValid(index)) {
      throw new RangeError('List index out of bounds');
    }

    let count = 0;
    let {_head: node} = this;

    while (index !== count) {
      node = node.next;
      count++;
    }

    return node;
  }

  prepend(...values) {
    values.forEach(value => {
      if (this.isEmpty()) {
        return this._initializeList(value);
      }

      return this._appendHead(value);
    });
    return this;
  }

  reverse() {
    const list = new Linear();
    this.forEach(x => list.prepend(x));
    return list;
  }

  toArray() {
    const array = [];
    this.forEach(x => array.push(x));
    return array;
  }
}

module.exports = Linear;
