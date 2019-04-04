<h1 align="center">
  Doublie
</h1>

<h4 align="center">
  ⚡ Doubly circular & linear linked lists for ES6
</h4>

<p align="center">
  <a href="https://travis-ci.com/klaussinani/doublie">
    <img alt="Build Status" src="https://travis-ci.com/klaussinani/doublie.svg?branch=master">
  </a>
  <a href='https://coveralls.io/github/klaussinani/doublie?branch=master'>
    <img alt="Coverage Status" src="https://coveralls.io/repos/github/klaussinani/doublie/badge.svg?branch=master">
  </a>
</p>

## Description

Progressive and minimal implementation of the circular and linear doublie linked list data structures in modern ES6.

Visit the [contributing guidelines](https://github.com/klaussinani/doublie/blob/master/contributing.md#translating-documentation) to learn more on how to translate this document into more languages.

## Contents

- [Description](#description)
- [Install](#install)
- [Usage](#usage)
- [In Depth](#in-depth)
- [API](#api)
- [Development](#development)
- [Related](#related)
- [Team](#team)
- [License](#license)

## Install

### Yarn

```bash
yarn add doublie
```

### NPM

```bash
npm install doublie
```

## Usage

Doublie exposes a progressive and composable API, that can be utilized through a simple and minimal syntax, allowing you to combine and chain methods effectively.

Usage examples can be also found at the [`test`](https://github.com/klaussinani/doublie/tree/master/test) directory.

```js
'use strict';
const {Circular, Linear} = require('singlie');

const linear = new Linear();
linear.prepend('A').append('B');
linear.node(0);
// => Node { next: Node { next: null, prev: [Circular], value: 'B' }, prev: null, value: 'A' }
linear.node(0).next;
// => Node { next: null, prev: Node { next: [Circular], prev: null, value: 'A' }, value: 'B' }
linear.node(0).next.next;
// => null
linear.map(x => `[${x}]`).reverse().join(' -> ');
// => [B] -> [A]

const circular = new Circular();
circular.append('B').prepend('A');
circular.node(0);
// => Node {
//  next: Node { next: [Circular], prev: [Circular], value: 'B' },
//  prev: Node { next: [Circular], prev: [Circular], value: 'B' },
//  value: 'A' }
circular.node(0).next;
// => Node {
//  next: Node { next: [Circular], prev: [Circular], value: 'A' },
//  prev: Node { next: [Circular], prev: [Circular], value: 'A' },
//  value: 'B' }
circular.node(0).next.next;
// => Node {
//  next: Node { next: [Circular], prev: [Circular], value: 'B' },
//  prev: Node { next: [Circular], prev: [Circular], value: 'B' },
//  value: 'A' }
circular.map(x => `[${x}]`).reverse().toArray();
// => [ '[B]', '[A]' ]
```

## In Depth

### Linear Doubly Linked List

Linear doubly linked lists can contain multiple nodes, where each node has only a `value`, a `prev` and `next` attribute. The `value` attribute holds the value stored inside of the node and the `prev` & `next` attributes point to the previous and next nodes in line respectively. The only exceptions are that the first node of the list has `null` stored to its `prev` attribute, indicating the lack of nodes before it thus the beginning of the list, and the last node has `null` stored to its `next` attribute, indicating the lack of further nodes down the line, thus the end of the list. 

The following example demonstrates the operations that can be performed on any linear doubly linked list.

```js
'use strict';
const {Linear} = require('singlie');

const linear = new Linear();

// Append a node holding the value `E`
linear.append('E');
linear.head; // => Node { value: 'E', next: null, prev: null }
linear.last; // => Node { value: 'E', next: null, prev: null }
linear.get(0); // => E

// Return the node corresponding to the index
linear.node(0); // => Node { value: 'E', next: null, prev: null }
linear.node(0).value; // => E
linear.node(0).next; // => null
linear.node(0).prev; // => null

// Append multiple nodes at once
linear.append('F', 'G');
linear.length; // => 3
linear.node(0).next.value; // => F
linear.node(0).next.next.value; // => G
linear.toArray(); // => [ 'E', 'F', 'G' ]

// Prepend multiple nodes at once
linear.prepend('B', 'A');
linear.join(' '); // => A B E F G

// Insert multiple nodes to the given index
linear.insert({value: ['D', 'C', 'X'], index: 2});
linear.join(' '); // => A B X C D E F G

// Remove the node corresponding to the index
linear.remove(2);
linear.join(' '); // => A B C D E F G

// Update the value of the node corresponding to the index
linear.node(linear.length - 1).value = '!';
linear.join(' '); // => A B C D E F !
linear.set({value: 'G', index: linear.length - 1});
linear.join(' '); // => A B C D E F G

// Iterate over the list
const array = [];
linear.forEach(x => array.push(x));
// => [ 'A', 'B', 'C', 'D', 'E', 'F', 'G' ]

// Chain multiple methods
linear.reverse().map(x => `[${x}]`).join('->');
// => [G]->[F]->[E]->[D]->[C]->[B]->[A]

// Clear the list
linear.clear(); // => Linear { head: null, length: 0, last: null }

// Reduce values to a final sum
linear.append(5, 10, 15, 20, 25).reduce((x + y) => x + y, 0);
//=> 75
```

### Circular Doubly Linked List

## API

The following documentation holds for both circular & linear lists. The described `list` instance is used to depict the same methods that are applicable to both a linear and a circular linked list, without overlooking their above described differences and unique qualities.

## Development

For more info on how to contribute to the project, please read the [contributing guidelines](https://github.com/klaussinani/doublie/blob/master/contributing.md).

- Fork the repository and clone it to your machine
- Navigate to your local fork: `cd doublie`
- Install the project dependencies: `npm install` or `yarn install`
- Lint the code and run the tests: `npm test` or `yarn test`

## Related

- [singlie](https://github.com/klaussinani/singlie) - Singly circular & linear linked lists for ES6

## Team

- Klaus Sinani [(@klaussinani)](https://github.com/klaussinani)

## License

[MIT](https://github.com/klaussinani/doublie/blob/master/license.md)
