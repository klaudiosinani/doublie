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

  clear() {
    this._head = null;
    this._last = null;
    this._length = 0;
    return this;
  }

  isEmpty() {
    return this.length === 0 && !this._head;
  }

  isLinear() {
    return this.constructor.name === 'Linear';
  }
}

module.exports = List;
