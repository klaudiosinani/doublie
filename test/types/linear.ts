import {Linear} from '../..';

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

linear.append('R', 'O', 'G');
linear.includes('G'); //=> true
linear.includes('D'); //=> false

linear.indexOf('G'); //=> 2
linear.indexOf('D'); //=> -1
