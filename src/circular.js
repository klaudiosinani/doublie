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

  filter(fn) {
    const list = new Circular();

    this.forEach(x => {
      if (fn(x)) {
        list.append(x);
      }
    });

    return list;
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

  get(index) {
    const {value} = this.node(index);
    return value;
  }

  map(fn) {
    const list = new Circular();
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

      return this._addHead(value);
    });
    return this;
  }

  join(separator) {
    let result = '';
    let {_head: node} = this;

    if (node) {
      do {
        result += node.value;

        if (node.next) {
          result += separator;
        }

        node = node.next;
      } while (node !== this._head);
    }

    return result;
  }

  reduce(fn, acc) {
    let result = acc;

    this.forEach(x => {
      result = fn(result, x);
    });

    return result;
  }

  reduceRight(fn, acc) {
    let result = acc;
    let {_last: node} = this;

    if (node) {
      do {
        result = fn(result, node.value);
        node = node.prev;
      } while (node !== this._last);
    }

    return result;
  }

  reverse() {
    const list = new Circular();
    this.forEach(x => list.prepend(x));
    return list;
  }

  set({value, index}) {
    const node = this.node(index);
    node.value = value;
    return this;
  }

  toArray() {
    const array = [];
    this.forEach(x => array.push(x));
    return array;
  }
}

module.exports = Circular;
