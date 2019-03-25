'use strict';
const List = require('./list');
const Node = require('./node');

class Linear extends List {
  _initializeList(value) {
    const node = new Node(value);
    this._head = node;
    this._last = node;
    this._length++;
  }

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

  append(...values) {
    values.forEach(value => {
      return this.isEmpty() ? this._initializeList(value) : this._appendLast(value);
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

  prepend(...values) {
    values.forEach(value => {
      return this.isEmpty() ? this._initializeList(value) : this._appendHead(value);
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
