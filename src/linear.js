'use strict';
const List = require('./list');
const Node = require('./node');

class Linear extends List {
  _addHead(value) {
    const {_head} = this;
    const node = new Node(value);
    node.next = _head;
    this._head.prev = node;
    this._head = node;
    this._length++;
  }

  _addLast(value) {
    const {_last} = this;
    const node = new Node(value);
    node.prev = _last;
    this._last.next = node;
    this._last = node;
    this._length++;
  }

  _addNode(value, index) {
    const target = this.node(index);
    const node = new Node(value);
    node.next = target;
    node.prev = target.prev;
    target.prev.next = node;
    target.prev = node;
    this._length++;
  }

  _initializeList(value) {
    const node = new Node(value);
    this._head = node;
    this._last = node;
    this._length++;
  }

  _removeHead() {
    const {next} = this._head;

    if (!next) {
      return this.clear();
    }

    this._head = next;
    this._head.prev = null;
    this._length--;
    return this;
  }

  _removeLast() {
    const {prev} = this._last;

    if (!prev) {
      return this.clear();
    }

    this._last = prev;
    this._last.next = null;
    this._length--;
    return this;
  }

  _removeNode(index) {
    const node = this.node(index);
    const {prev, next} = node;
    prev.next = next;
    next.prev = prev;
    this._length--;
    return this;
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
    const list = new Linear();

    this.forEach(x => {
      if (fn(x)) {
        list.append(x);
      }
    });

    return list;
  }

  forEach(fn) {
    let {_head: node} = this;

    while (node) {
      fn(node.value);
      node = node.next;
    }

    return this;
  }

  get(index) {
    const {value} = this.node(index);
    return value;
  }

  insert({value, index}) {
    this._arrayify(value).forEach(x => {
      if (index === 0) {
        return this.prepend(x);
      }

      return this._addNode(x, index);
    });
    return this;
  }

  join(separator) {
    let result = '';
    let {_head: node} = this;

    while (node) {
      result += node.value;

      if (node.next) {
        result += separator;
      }

      node = node.next;
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

    while (node) {
      result = fn(result, node.value);
      node = node.prev;
    }

    return result;
  }

  map(fn) {
    const list = new Linear();
    this.forEach(x => list.append(fn(x)));
    return list;
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

  remove(index) {
    if (index === 0) {
      return this._removeHead();
    }

    if (index === this.length - 1) {
      return this._removeLast();
    }

    return this._removeNode(index);
  }

  reverse() {
    const list = new Linear();
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

  toCircular() {
    const Circular = require('./circular');
    const list = new Circular();
    this.forEach(x => list.append(x));
    return list;
  }

  toString() {
    return this.join(',');
  }
}

module.exports = Linear;
