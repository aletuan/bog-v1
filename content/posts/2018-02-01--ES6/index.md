---
title: New features of ES6
subTitle: Just another introduce about son of
cover: photo-es6-cover.jpg
---

In 2018, it is like out of date, when we are talking about ECMAScript 6 introduced in 2015. But since ES7 is still quite new, and personally I think it does not include many interesting features like ES6. So let turn back *old time* and recap again about ES6 *new*  features

There are the features that will be covered in the following sections:

* Arrow functions and let keyword; block scope
* Classes and inheritance
* Destructured assignment, Default parameters
* Interator and Maps, Set
* Promises; Async
* Rest parameters; Spread operator;

### Arrow function and let keyword

In some other languages, Arrow function, was called lamda expression  (`scientific term`) . It like an anonymous functions. It is compact, context auto binding, and very useful when apply with functional composing (the way to construct complex functions from simple ones)

For example:

```js
let square = x => x * x;
let add = (a, b) => a + b;
let pi = () => 3.1415;

console.log(square(5)); // 25
console.log(add(3, 4)); // 7
console.log(pi()); // 3.1415
```

In the previous code block, we are using `let` keyword to declare new function, or new variable. So what the heck of it, where is my `var`. Guys, it is 2018, and `var` is not existed anymore. Its guilty is the moment when local scope can override global scope. ( i don’t know why, but JS has many weird mistakes,  `declaration hoisting` is an example). Let make an example to explain this:

```js
for (let i = 0; i < 10; i++) {
}

try {
  console.log(i);
} catch(e) {
	// es5: no catching error message
  // es6: i still existed when exit code block execution
  // therefore, we will see catching error message
  console.log('i does not exist here!');
}
```

### Class and inheritance

This fancy syntax is introduced to make OOP people to be more happier. Very similar as Java, C# languages, JS now include some new keywords like `class, constructor, extends, super and get` (why not set ?). Unfortunately, there are no keywords for private methods or properties

```js
class Polygon {
  constructor(height, width) { //class constructor
    this.name = 'Polygon';
    this.height = height;
    this.width = width;
  }

  sayName() { //class method
    console.log('Hi, I am a', this.name + '.');
  }
}

class Square extends Polygon {
  constructor(length) {
    super(length, length); //call the parent method with super
    this.name = 'Square';
  }

  get area() { 
    return this.height * this.width;
  }
}

let s = new Square(5);

s.sayName(); // Hi, I am a Square.
console.log(s.area); // 25
```

Without this sugar syntax, in ES5, developer has to make code to be more complex by using Prototype for inheritance

```js
function Polygon(height, width) { //class constructor
  this.name = 'Polygon';
  this.height = height;
  this.width = width;
}

Polygon.prototype = {
  sayName: function () { //class method
    console.log('Hi, I am a ' + this.name + '.');
  }
};

function Square(length) { //class constructor
  Polygon.call(this, length, length);
  this.name = 'Square';
}
// Square inherits from Polygon
Square.prototype = Object.create(Polygon.prototype);
// Set the "constructor" property to refer to Square
Square.prototype.constructor = Square;
// Add getter
Square.prototype.getArea = function() { //class method
  return this.height * this.width;
};

var p = new Polygon(5,5);
p.sayName(); // Hi, I am a Polygon.

var s = new Square(5);
s.sayName(); // Hi, I am a Square.
console.log(s.getArea()); // 25
```

### Destructured assignment, Default parameters

Default parameters and destructured assignment are some improvements that make coding is more compact and easier. Let an example to explain it to save our time

Default parameters

```js
function sayMsg(msg){
  var msg = msg || 'This is a default message.';
  console.log(msg);
}

sayMsg();  // This is a default message.
sayMsg('This is a different message!'); // This is a different message!
```

Destructured assignment (applied for both array and object struct)

```js
let [one, two] = [1, 2];
let {three, four} = {three: 3, four:  4};

console.log(one, two, three, four); // 1 2 3 4
```

### Interator and Maps

Iterators in JavaScript is quite similar as `IEnumerable` in .NET and `Iterable` in Java.

For example:

```js
let arr = [1, 2, 3];
let sum = 0;

for (let v of arr) {
  sum += v;
}

console.log('1 + 2 + 3 =', sum);
```

> Note that the syntax `for ... of` and `for ... in` are different since `for ... in` is applied to iterate the object properties

```js
var string1 = "";
var object1 = {a: 1, b: 2, c: 3};

for (var property1 in object1) {
  string1 = string1 + object1[property1];
}

console.log(string1);
```

Map is a structure to keep data as [key, value]. Unlike object, Map can use any value as key to keep the value.

To init and update content, Map uses functions:

```js
const map = new Map([[]])
map.has(key)  // boolean
map.set(key, value)
map.get(key) // value
map.delete(key)
```

To inspect Map content, using functions

```js
map.size       returns its size
map.entries()  returns entries in insertion order [k,v]
map.keys()     returns just values in insertion order [k]
map.values()   returns just values in insertion order [v]
```

For example:

```js
const m = new Map([[]]);
m.set(1, 'a');
m.set(2, 'b');
// entries iteration
for(let i of m) {
   console.log(i);
}
// print key - value
m.forEach((key, value) => console.log(`${key} - ${value}`));
```

### Promises

Promise support `Callback hell` issue in JavaScript with more readable syntax.
Let refer to another post *Callback, Promise and Async/Await* to get more details about Java async way.

An example of Promises

```js
const getFn = () => {
   let msg = "say hi";
   return new Promise(
      function(resolve, reject) {
         setTimeout(resolve(msg), 1000);
      }
   );
};

const printFn = msg => console.log(msg);

getFn().then(printFn);
```

The `rest parameter` syntax allows us to represent an indefinite number of arguments as an array

For example:

```js
const sum = (...args) => args.reduce((prev, cur) => prev+cur, 10);
sum(1,2,3); // 16
```

The `spread operator` is able to convert an array into the list of parameters. So we can combine with `rest parameter` as below:

```js
const sum = (...args) => args.reduce((prev, cur) => prev+cur, 10);
const input = [1,2,3];
sum(...input); // 16
```



