---
title: New features of ES6
subTitle: Just another introduce about son of
cover: photo-es6-cover.png
---

In 2018, it is like out of date, when we are talking about ECMAScript 6 introduced in 2015. But since ES7 is still quite new, and personally I think it does not include many interesting features like ES6. So let turn back *old time* and recap again about ES6 *new*  features

There are the features that will be covered in the following sections:

* Arrow functions and let keyword; block scope
* Classes and inheritance
* Default parameters
* Destructured assignment
* Generator, Interator and Maps
* Promises; Rest parameters; Set
* Spread operator; Template literals

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
