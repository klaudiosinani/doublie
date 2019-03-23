'use strict';
const Circular = require('./circular');
const Linear = require('./linear');
const Node = require('./src/node');

module.exports = Object.assign({}, {Circular}, {Linear}, {Node});
