<h1 align="center">
  Doublie
</h1>

<h4 align="center">
  Doubly circular & linear linked lists for ES6
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

ES6 implementation of the circular and linear doubly linked list data structures with TypeScript support.

Come over to [Twitter](https://twitter.com/klaussinani) to share your thoughts on the project.

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

Doublie exposes a chainable API, that can be utilized through a simple and minimal syntax, allowing you to combine methods effectively.

Usage examples can be also found at the [`test`](https://github.com/klaussinani/doublie/tree/master/test) directory.

```js
'use strict';
const {Circular, Linear} = require('doublie');

const linear = new Linear();
linear.prepend('A').append('B');
linear.head;
// => Node { next: Node { next: null, prev: [Circular], value: 'B' }, prev: null, value: 'A' }
linear.head.next;
// => Node { next: null, prev: Node { next: [Circular], prev: null, value: 'A' }, value: 'B' }
linear.head.next.next;
// => null
linear.head.prev;
// => null
linear.map(x => `[${x}]`).reverse().join(' -> ');
// => [B] -> [A]

const circular = new Circular();
circular.append(2).prepend(1);
circular.head;
// => Node {
//  next: Node { next: [Circular], prev: [Circular], value: 2 },
//  prev: Node { next: [Circular], prev: [Circular], value: 1 },
//  value: 'A' }
circular.head.next;
// => Node {
//  next: Node { next: [Circular], prev: [Circular], value: 1 },
//  prev: Node { next: [Circular], prev: [Circular], value: 1 },
//  value: 2 }
circular.head.next.next;
// => Node {
//  next: Node { next: [Circular], prev: [Circular], value: 2 },
//  prev: Node { next: [Circular], prev: [Circular], value: 2 },
//  value: 1 }
circular.head.prev;
// => Node {
//  next: Node { next: [Circular], prev: [Circular], value: 1 },
//  prev: Node { next: [Circular], prev: [Circular], value: 1 },
//  value: 2 }
circular.reduce((x, y) => x > y ? x : y, -Infinity);
// => 2
```

## In Depth

### Linear Doubly Linked List

Linear doubly linked lists can contain multiple nodes, where each node has only a `value`, a `prev` and `next` attribute. The `value` attribute holds the value stored inside of the node and the `prev` & `next` attributes point to the previous and next nodes in line respectively. The only exceptions are that the first node of the list has `null` stored to its `prev` attribute, indicating the lack of nodes before it, thus the beginning of the list, and the last node has `null` stored to its `next` attribute, indicating the lack of further nodes down the line, thus the end of the list. 

The following example demonstrates the operations that can be performed on any linear doubly linked list.

```js
'use strict';
const {Linear} = require('doublie');

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
linear.append(5, 10, 15, 20, 25).reduce((x, y) => x + y, 0);
//=> 75
```

### Circular Doubly Linked List

Circular doubly linked lists can also contain multiple nodes, where again each node has the same `value`, `prev` and `next` attributes. The only difference compared to linear lists, is that the last node always points back to the first node/head of the list, and similarly the first node/head points back to the last node of the list, thus the list is said to be circular or circularly linked.

The following example demonstrates the operations that can be performed on any circular doubly linked list.

```js
'use strict';
const {Circular} = require('doublie');

const circular = new Circular();

// Append a node holding the value `E`
circular.append('E');
circular.head; // => Node { value: 'E', next: [Circular], prev: [Circular] }
circular.last; // => Node { value: 'E', next: [Circular], prev: [Circular] }
circular.get(0); // => E

// Return the node corresponding to the index
circular.node(0); // => Node { value: 'E', next: [Circular], prev: [Circular] }
circular.node(0).value; // => E
circular.node(0).next.value; // => E
circular.node(0).next.next.value; // => E
circular.node(0).prev.value; // => E
circular.node(0).prev.prev.value; // => E

// Append multiple nodes at once
circular.append('F', 'G');
circular.length; // => 3
circular.node(0).next.value; // => F
circular.node(0).next.next.value; // => G
circular.node(0).next.next.next.value; // => E
circular.node(0).prev.value; // => G
circular.node(0).prev.prev.value; // => F
circular.node(0).prev.prev.prev.value; // => E
circular.toArray(); // => [ 'E', 'F', 'G' ]

// Prepend multiple nodes at once
circular.prepend('B', 'A');
circular.join(' '); // => A B E F G

// Insert multiple nodes to the given index
circular.insert({value: ['D', 'C', 'X'], index: 2});
circular.join(' '); // => A B X C D E F G

// Remove the node corresponding to the index
circular.remove(2);
circular.join(' '); // => A B C D E F G

// Update the value of the node corresponding to the index
circular.node(circular.length - 1).value = '!';
circular.join(' '); // => A B C D E F !
circular.set({value: 'G', index: circular.length - 1});
circular.join(' '); // => A B C D E F G

// Iterate over the list
const array = [];
circular.forEach(x => array.push(x));
// => [ 'A', 'B', 'C', 'D', 'E', 'F', 'G' ]

// Chain multiple methods
circular.reverse().map(x => `[${x}]`).join('->');
// => [G]->[F]->[E]->[D]->[C]->[B]->[A]

// Clear the list
circular.clear(); // => Circular { head: null, length: 0, last: null }

// Reduce values to a final sum
circular.append(5, 10, 15, 20, 25).reduce((x, y) => x + y, 0);
//=> 75
```

## API

The following documentation holds for both circular & linear lists. The described `list` instance is used to depict the same methods that are applicable to both a linear and a circular linked list, without overlooking their above described differences and unique qualities.

#### list.`append(value[, value])`

- Return Type: `Linked List`

Appends one of more nodes to the list.

##### **`value`**

- Type: `any`

Can be one or more comma delimited values. Each value corresponds to a single node.

```js
list.append('A', 'B', 'C', 'D');
// => { value: 'A', prev: [List], next: { value: 'B', next: [List] } }
```

#### list.`prepend(value[, value])`

- Return Type: `Linked List`

Prepends one of more nodes to the list.

##### **`value`**

- Type: `any`

Can be one or more comma delimited values. Each value corresponds to a single node.

```js
list.append('C' , 'D');
// => { value: 'C', next: [List], prev: [List] }
list.prepend('B', 'A');
// => { value: 'A', prev: [List], next: { value: 'B', prev: [List], next: { value: 'C', prev[List], next: [List] } } }
```

#### list.`head`

- Return Type: `Node | null`

Returns the first node / head on the list.

```js
list.append('A', 'B');
list.head;
// => Node { value: 'A', prev: [List], next: [List] }
```

#### list.`last`

- Return Type: `Node | null`

Returns the last node on the list.

```js
list.append('A', 'B');
list.last;
// => Node { value: 'B', prev: [List], next: [List] }
```

#### list.`length`

- Return Type: `Integer`

Returns the length of the list.

```js
list.append('A', 'B');
list.length;
// => 2
```

#### list.`isEmpty()`

- Return Type: `Boolean`

Checks whether or not the list is empty.

```js
list.append('A', 'B');
list.isEmpty();
// => false
```

#### list.`insert({value[, value], index})`

- Return Type: `Linked List`

Inserts one or more nodes to the given index.

##### **`value`**

- Type: `any`

Can be one or more comma delimited values. Each value corresponds to a single node.

##### **`index`**

- Type: `Integer`

Can be an integer corresponding to a list index.

```js
list.append('A', 'B', 'E');
list.insert({value: ['C', 'D'], index: 1});
// => { value: 'A', prev: [List], next: { value: 'D', prev: [List], next: { value: 'C', prev: [List], next: { value: 'B', prev: [List], next: [List] } } } }
```

#### list.`node(index)`

- Return Type: `Node`

Return the node corresponding to the given index.

##### **`index`**

- Type: `Integer`

Can be an integer corresponding to a list index.

```js
list.append('A', 'B', 'C', 'D');
const node = list.node(0);
// => { value: 'A', prev: [List], next: { value: 'B', prev: [List], next: [List] } }
node.value;
// => A
node.next;
// => { value: 'B', prev: [List], next: [List] }
```

#### list.`get(index)`

- Return Type: `any`

Return the value of node corresponding to the given index.

##### **`index`**

- Type: `Integer`

Can be an integer corresponding to a list index.

```js
list.append('A', 'B');

list.get(0);
// => A
list.get(0);
// => B
```

#### list.`remove(index)`

- Return Type: `Linked List`

Removes from the list the node located to the given index.

##### **`index`**

- Type: `Integer`

Can be an integer corresponding to a list index.

If not provided, the last node of the list will be removed.

```js
list.append('A', 'B', 'C', 'D');
// => { value: 'A', prev: [List], next: [List] }
list.remove(0);
// => { value: 'B', prev: [List], next: [List] }
list.remove(0);
// => { value: 'C', prev: [List], next: [List] }
```

#### list.`toArray()`

- Return Type: `Array`

Converts the list into an array.

```js
list.append('A', 'B', 'C');
// => { value: 'A', prev: [List], next: { value: 'B', prev: [List], next: [List] } }
const array = list.toArray();
// => [ 'A', 'B', 'C' ]
```

#### list.`clear()`

- Return Type: `Linked List`

Removes all nodes from the list.

```js
list.append('A', 'B', 'C');
list.head;
// => { value: 'A', prev: [List], next: { value: 'B', prev: [List], next: [List] } }
list.clear();
// => { head: null, last: null, length: 0 }
```

#### list.`join([separator])`

- Return Type: `String`

Joins the values of all nodes on the list into a string and returns the string.

##### **`separator`**

- Type: `String`
- Default: `Comma ','`

Specifies a string to separate each pair of adjacent node values of the array. 

If omitted, the node values are separated with a `comma ','`.

```js
list.append('A', 'B', 'C');
// => { value: 'A', prev: [List], next: { value: 'B', prev: [List], next: [List] } }
list.join();
// => 'A,B,C'
list.join('');
// => 'ABC'
list.join(' ');
// => 'A B C'
```

#### list.`forEach(function)`

- Return Type: `Linked List`

Executes a provided function once for each node value.

##### **`function`**

- Type: `Function`

Function to execute for each node value.

```js
const array = [];
list.append('A', 'B', 'C');
// => { value: 'A', prev: [List], next: { value: 'B', prev: [List], next: [List] } }
list.forEach(x => array.push(x));
console.log(array);
// => [ 'A', 'B', 'C' ];
```

#### list.`map(function)`

- Return Type: `Linked List`

Executes a provided function once for each node value.

##### **`function`**

- Type: `Function`

Function that produces a new node value for the new list.

```js
list.append('A', 'B', 'C');
// => { value: 'A', prev: [List], next: { value: 'B', prev: [List], next: [List] } }
const mapped = list.map(x => `[${x}]`);
array.join(' ');
// => '[A] [B] [C]'
```

#### list.`filter(function)`

- Return Type: `Linked List`

Creates a new liked list with all elements that pass the test implemented by the provided function.

##### **`function`**

- Type: `Function`

Function is a predicate, to test each element of the list. Return true to keep the element, false otherwise.

```js
list.append(1, 2, 3, 4, 5, 6);
// => { value: 1, prev: [List], next: { value: 2, prev: [List], next: [List] } }
const filtered = list.filter(x => x % 2 > 0);
filtered.toArray();
// => [ 1, 3, 5 ]
```

#### list.`reduce(function, initialValue)`

- Return Type: `Any`

Executes a reducer function on each member of the list resulting in a single output value.

##### **`function`**

- Type: `Function`

The reducer function takes two arguments: accumulator & current value. The reducer function's returned value is assigned to the accumulator, whose value is remembered across each iteration throughout the list and ultimately becomes the final, single resulting value.

```js
list.append(20, 50, 35, 41, 5, 67);
// => { value: 20, prev: [List], next: { value: 50, prev: [List], next: [List] } }
list.reduce((acc, x) => acc > x ? acc : x, -Infinity);
// => 67
```

#### list.`reduceRight(function, initialValue)`

- Return Type: `Any`

Executes a reducer function on each member of the list, from right-to-left, resulting in a single output value.

##### **`function`**

- Type: `Function`

The reducer function takes two arguments: accumulator & current value. The reducer function's returned value is assigned to the accumulator, whose value is remembered across each iteration throughout the list and ultimately becomes the final, single resulting value.

```js
list.append('A', 'B', 'C', 'D', 'E', 'F');
// => { value: 'A', prev: [List], next: { value: 'B', prev: [List], next: [List] } }
list.reduceRight((acc, x) => acc + x, '');
// => 'FEDCBA'
```

#### list.`includes(value)`

- Return Type: `Boolean`

The method determines whether a list, circular or linear, includes a certain value among its nodes, returning `true` or `false` as appropriate.

##### **`value`**

- Type: `Any`

The value to search for.

```js
list.append(20, 50, 35, 41, 5, 67);
// => { value: 20, prev: [List], next: { value: 50, prev: [List], next: [List] } }
list.includes();
// => false
list.includes(0);
// => false
list.includes(50);
// => true
```

#### list.`indexOf(value)`

- Return Type: `Number`

The method returns the first index at which a given element can be found in the circular/linear linked list, or -1 if it is not present.

##### **`value`**

- Type: `Any`

Element to locate in the array.

```js
list.append(20, 50, 35, 41, 5, 67);
// => { value: 20, next: { value: 50, next: [List] } }
list.indexOf();
// => -1
list.indexOf(0);
// => -1
list.indexOf(41);
// => 3
```

#### list.`toString()`

- Return Type: `String`

Returns a string representing the specified list and its elements.

```js
list.append(20, 50, 35, 41, 5, 67);
// => '20,50,35,41,5,67'
```

#### list.`isCircular()`

- Return Type: `Boolean`

Returns `true` if the linked list is circular or `false` if it is linear.

```js
const {Circular} = require('doublie');

const list = new Circular();

list.isCircular();
// => true
```

#### list.`isLinear()`

- Return Type: `Boolean`

Returns `true` if the linked list is linear or `false` if it is circular.

```js
const {Circular} = require('doublie');

const list = new Circular();

list.isLinear();
// => false
```

#### linear.`toCircular()`

- Return Type: `Circular Linked List`

Returns a new circular linked list containing all elements of the original linear linked list.

```js
const {Linear} = require('doublie');

const list = new Linear();

list.toCircular().isLinear();
// => false
```

#### circular.`toLinear()`

- Return Type: `Linear Linked List`

Returns a new linear linked list containing all elements of the original circular linked list.

```js
const {Circular} = require('doublie');

const list = new Circular();

list.toLinear().isLinear();
// => true
```

Also available, along with the `Circular` and `Linear` exposed classes, is the `Node` class, mainly useful for testing purposes, since it can be utilized to compare nodes residing in linear & circular linked lists. The class has a unary constructor method, with a `'value'` parameter, corresponding to the data stored in the created instance. 

Additionally, each `Node` instance has the following two public properties: 

#### node.`value`

- Return Type: `any`

The value that the node contains.

```js
const {Node} = require('doublie');

const node = new Node('A');
// => { value: 'A', next: null }

node.value;
//=> 'A'

node.value = 'B' // Update the `value` attribute to 'B'
// => { value: 'B', next: null }
```

#### node.`prev`

- Return Type: `Node | null`

The previous node in line, that the node instance points to.

```js
const {Node} = require('doublie');

const node1 = new Node('A');
// => { value: 'A', prev: null, next: null }

node1.prev
//=> null

const node2 = new Node('B');

node1.prev = node2; // `node1` now points to `node2`
//=> { value: 'A', prev: { value: 'B', prev: null, next: null }, next: null }
```

#### node.`next`

- Return Type: `Node | null`

The next node in line, that the node instance points to.

```js
const {Node} = require('doublie');

const node1 = new Node('A');
// => { value: 'A', prev: null, next: null }

node1.next
//=> null

const node2 = new Node('B');

node1.next = node2; // `node1` now points to `node2`
//=> { value: 'A', prev: null, next: { value: 'B', prev: null, next: null } }
```

## Development

For more info on how to contribute to the project, please read the [contributing guidelines](https://github.com/klaussinani/doublie/blob/master/contributing.md).

- Fork the repository and clone it to your machine
- Navigate to your local fork: `cd doublie`
- Install the project dependencies: `npm install` or `yarn install`
- Lint the code and run the tests: `npm test` or `yarn test`

## Related

- [avlbinstree](https://github.com/klaussinani/avlbinstree) - AVL self-balancing binary search trees for ES6
- [binstree](https://github.com/klaussinani/binstree) - Binary search trees for ES6
- [mheap](https://github.com/klaussinani/mheap) - Binary min & max heaps for ES6
- [prioqueue](https://github.com/klaussinani/prioqueue) - Priority queues for ES6
- [shtack](https://github.com/klaussinani/shtack) - LIFO Stacks for ES6
- [singlie](https://github.com/klaussinani/singlie) - Singly circular & linear linked lists for ES6

## Team

- Klaus Sinani [(@klaussinani)](https://github.com/klaussinani)

## License

[MIT](https://github.com/klaussinani/doublie/blob/master/license.md)
