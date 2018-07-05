---
title: Callback, Promise, Async
subTitle: If you want to promise, then do it right way
cover: photo-promise-cover.png
---

JavaScripts is a single-thread programming language, therefore, the callback is one of key stone to help application not being blocked in any long-time execution. This post explain how to use asynchronous code in JavaScript in high-level view

Let say we have a function that trying to print a String after a random amount of time:

```js
function printString(string){
  //any long time execution operation, i.e.,
  setTimeout(
    () => {
      console.log(string)
    }, 
    Math.floor(Math.random() * 100) + 1
  )
}

function printAll(){
  printString("A")
  printString("B")
  printString("C")
}
printAll()
```

Without being said, function `printAll` will give us different result in every time we call it. The timeout times are different, and making different outputs.

Now, we use callback function to passed to another one. 

```js
function printString(string, callback){
  setTimeout(
    () => {
      console.log(string)
      callback()
    }, 
    Math.floor(Math.random() * 100) + 1
  )
}

function printAll(){
  printString("A", () => {
    printString("B", () => {
      printString("C", () => {})
    })
  })
}
printAll()
```

Now, output is the same for all time of running. However, our source code is really hard to understand because of many nested function levels, `callback hell`

**Promise** is the way to fix this nesting issue. Promise is a wapper for a long-time operation, and when that operation is finish (resolved), then we call resolve function, (of reject function if the return is false). With the Promise, the previous example can be re-write in the form of **Promise Chain**

```js
function printString(string){
  return new Promise((resolve, reject) => {	  
    setTimeout(
      () => {
       console.log(string)
       resolve()
      }, 
     Math.floor(Math.random() * 100) + 1
    )
  })
}

function printAll() {
	printString("A").then(() => printString("B")).then(() => printString("C"));
}
```

**Asyn/Await** is just a syntatic suger of Promise. It make the asynchronous code look more like synchronous code, and eaiser to understand:

```js
async function printAll(){
  await printString("A")
  await printString("B")
  await printString("C")
}
printAll()
```

If each element in promise chain is depent on the result that returned from its prevous element, we can use `then` to take output from previous steps, input to the next steps. For example:

```js
function printString(previous, current){
  return new Promise((resolve, reject) => {	  
    setTimeout(
      () => {
       resolve(previous + current);
      }, 
     Math.floor(Math.random() * 100) + 1
    )
  })
}

function printAll() {
	printString("", "A")
		.then(result => {return printString(result, "B")})
		.then(result => {return printString(result, "C")})
		.then(result => console.log(result));
}

```

Using async/await style, it will be easier:

```js
async function addAll(){
  let toPrint = ''
  toPrint = await addString(toPrint, 'A')
  toPrint = await addString(toPrint, 'B')
  toPrint = await addString(toPrint, 'C')
  console.log(toPrint) // Prints out " A B C"
}
addAll()
```

Asynchronous is the key of success of JavaScript or Nodejs run-time environment. It makes application process not to be blocked on I/O operation (i.e, file read/write, http req/res) and increasing memory efficiency in the application.