'use strict';
const List = require('./list');
const Node = require('./node');

class Circular extends List {
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
}

module.exports = Circular;
