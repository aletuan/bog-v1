---
title: Functional style
subTitle: It let me play by my way
cover: photo-compose-cover.jpg
---

Before going into the some theories of functional programming, let make a recap about some `transform functions` that are introduced in Array.Prototype. These functions take an array as input, making some logic filter or calculation to transform and produce a new array (without change the input)

`Array.Prototype.map()`: take an array, apply function in map to each array element to produce new set of results.

```js
// An array of objects.
const myFriends = [
  { name: "John", surname: "Smith", age: 52},  
  { name: "Sarah", surname: "Smith", age: 49},  
  { name: "Michael", surname: "Jones", age: 46},  
  { name: "Garry", surname: "Thomas", age: 48}
];
const fullName = (x) =>  x.name + " " + x.surname;
}

myFriends.map(fullName);
// ["John Smith", "Sarah Smith", "Michael Jones", "Garry Thomas"]
```


`Array.Prototype.filter()`: take an array, with condition in filters, produce a new array include elements that make satisify the condition.

```js
let myFriends = [
  { name: "John", gender: "male" },
  { name: "Kate", gender: "female" },
  { name: "Mike", gender: "male" },
  { name: "Sophie", gender: "female" },
  { name: "Richard", gender: "male" },
  { name: "Keith", gender: "male" }
];

const isMale = (x) =>x.gender == "male";

myFriends.filter(isMale); // John, Mike, Richard, Keith
```

`Array.Prototype.reduce()`, this is a general-purpose array transformation.  It lets you iterate over a list, apply a function to an accumulated value, and next item in the list, until the iteration is complete.

Using `reduce` function, some complex request can be resolved quite quickly. Want to flattening a structure, here is an example:

```js
const data = [['a', 'b', 'c'], ['c', 'd', 'a']];
const flattened = data.reduce((accu, item) => acc.concat(item), []);
```

It's easy right. How about if we want to get only unique element from `data`, let apply the unique feature of new `Set` structure of ES6, here it is:

```js
const data = [['a', 'b', 'c'], ['c', 'd', 'a']];
const flattened = data.reduce((accu, item) => acc.concat(item), []);
const unique = flattened.reduce((acc, item) => acc.add(item), new Set([]));
// any way to use only one time of reduce
```


`Reduce` is special one since it can define all other transform functions like `map()` or `filter`:

```js
const map = (fn, arr) => arr.reduce((acc, item) => acc.concat(fn(item)), []);
const filter = (fn, array) => arr.reduce((acc, item) => fn(item) ? acc.concat(item) : acc,, []);
```

Now, what we see in the last example is the way we `compose function`. It a way to make a function of chain, when we want to apply a function to an output of the other function. JavaScript provide `.reduceRight()` method to make compose functions

For example

```js
// math form: compose = x => g => f => f(g(x)) 
g = x => x + 2;
f = y => y * 3;
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x); 
h = compose(f,g);
console.log(h(2)); // guest what ;) -> 12
```

The `.reduceRight()` function is right-oriented, since it takes the last element (right - side) to apply input, and iterate pickup to the first version. In the other way, we make a reduce *left* function as below:

```js
g = x => x + 2;
f = y => y * 3;
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
h = pipe(f,g);
console.log(h(2)); => 8
```

It may enough for examples. We have seen transform function as `high-order functions`, with the definition:

> High-order function is a function that take other functions as arguments, or return another function as a result.  

High-order function or compose function is one of the key of functional programming style. It makes a complex function by combining smaller functions.  One more thing to catch here, in the functional programming, every function should be a pure function, which mean that it does not make any side-effects to the environment or others (stateless). A pure function always return the same output for the same input in every time of execution. It reduce side-effects of the whole program, and therefore, the debugging of function can be more easier, but that may be another story.