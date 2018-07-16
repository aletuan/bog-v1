---
title: Destructuring Nested Objects
subTitle: ES6 News
cover: photo-destructuring-cover.png
---

Destructuring is a new feature in an ES6. In React, developer can use this feature in function's parameters to make clear about what kid of parameters sent to the function. It also support to saving memory (we only use some selective individual fields instead of whole object structure). Let take an example to clear this feature.

```js
const user = {
    id: 111,
    name: 'Andy',
    age: 35,    
};

const { id, name, age } = user;
```

More interesting, destructure can also apply for nested object, for example:

```js
const user = {
    id: 111,
    name: 'Andy',
    age: 35,
    education: {
        degree: 'master',
    },
};

const { education: { degree }} = user;
console.log(degree);
```

