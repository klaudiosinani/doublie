'use strict';
const List = require('./list');

class Linear extends List {
  forEach(fn) {
    let {_head: node} = this;

    while (node) {
      fn(node.value);
      node = node.next;
    }

    return this;
  }
}

module.exports = Linear;
