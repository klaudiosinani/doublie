import {Circular} from '../..';

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

circular.append('R', 'O', 'G');
circular.includes('G'); //=> true
circular.includes('D'); //=> false
