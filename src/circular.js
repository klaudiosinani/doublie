'use strict';
const List = require('./list');
const Node = require('./node');

class Circular extends List {
  _addHead(value) {
    const {_head, _last} = this;
    const node = new Node(value);
    node.next = _head;
    node.prev = _last;
    this._head.prev = node;
    this._last.next = node;
    this._head = node;
    this._length++;
  }

  _addLast(value) {
    const {_head, _last} = this;
    const node = new Node(value);
    node.prev = _last;
    node.next = _head;
    this._head.prev = node;
    this._last.next = node;
    this._last = node;
    this._length++;
  }

  _initializeList(value) {
    const node = new Node(value);
    node.next = node;
    node.prev = node;
    this._head = node;
    this._last = node;
    this._length++;
  }

  append(...values) {
    values.forEach(value => {
      if (this.isEmpty()) {
        return this._initializeList(value);
      }

      return this._addLast(value);
    });
    return this;
  }

  forEach(fn) {
    let {_head: node} = this;

    if (node) {
      do {
        fn(node.value);
        node = node.next;
      } while (node !== this._head);
    }

    return this;
  }

  prepend(...values) {
    values.forEach(value => {
      if (this.isEmpty()) {
        return this._initializeList(value);
      }

      return this._addHead(value);
    });
    return this;
  }

  reduce(fn, acc) {
    let result = acc;

    this.forEach(x => {
      result = fn(result, x);
    });

    return result;
  }
}

module.exports = Circular;
