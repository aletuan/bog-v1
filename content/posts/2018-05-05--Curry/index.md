---
title: Curry function
subTitle: series of Functional programming
cover: photo-curry-cover.png
---

> Curry a  technique which helps us to transform a function with an arity higher than one into a series of functions each with arity of one  

*Note*: Arity  is a term that specifies the amount of arguments that a function takes.

For example:

```js
// a function with arity of 2
const add = (x, y) => x + y; 
add(2,3);

// convery into curry function
const curriedAdd = x => y => x + y;
const addTwo = curriedAdd(2);
addTwo(3);
```

In the example, `curriedAdd` function takes an argument `x`, and return a **function**. It does not take any calculation at this point. When calling `curriedAdd(2)`, x get value 2, and return function `addTwo`. when calling `addTwo(3)`, y get value 3, and return sum of x and y, which is 5.

What behind this scene. The function `addTwo` is a nested function, and therefore, it can access to the outer scope if its parent function `curriedAdd` by support of its closure.  So we can re-write the example as below:

```js
const curriedAdd = x => { 
	// return a function
	return y => x + y;
};
curriedAdd(2)(3);
```


So, benefits of curry function:

- It helps to make abstraction for function with nesting layer.
- Clean code
- Make functional style (pure functional programming language like Haskell, use curry function by default)



