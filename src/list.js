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
}

module.exports = List;
