---
title: Arrow function
subTitle: When less is more
cover: photo-react-components-cover.jpg
---

Arrow function is a new fundamental building blocks of building modern web application. The new syntax both make your code more concise while also making the `this` keyword more manageable.

Let start with a basic function as an example

```javascript
// fn declaration
function add(x, y) {
	return x + y;
}

// fn expression
const add = function(x, y) {
	return x + y;
}

// fn in arrow
const add = (x,y) => {
	return x + y;
}
```

The structure looks more concise when combining arrow function with other functions, such as map:

```javascript
users.map(function() {

})

users.map(() => {

})
```

Another benefits of arrow function is **implicit returns**. With arrow function, we can omit the `return` keyword, and value will be return automatically (or implicitly).

```js
function getTweets(uid( {
	return fetch('http://api.users.com/' + uid)
		.then(res => res.json())
		.then(res => res.data)
		.then(tweets => tweets.filter(tweet => tweet.starts > 50)
}
```

Lastly, arrow function can bind `this` context automatilcally. For instance, applying arrow function in React class component, handling function with arrow syntax does not need to bind `this` in the constructor of React class.

In normal function form:

```javascript
class Popular extends React.Component {
  constructor(props) {
    super();
    this.state = {
      repos: null,
    };

    this.updateLanguage = this.updateLanguage.bind(this);
  }
  componentDidMount () {
    this.updateLanguage('javascript')
  }
  updateLanguage(lang) {
    api.fetchPopularRepos(lang)
      .then(function (repos) {
        this.setState(function () {
          return {
            repos: repos
          }
        }).bind(this));
      };
  }
  render() {
    // Stuff
  }	
}
```

**Note 1**: Remember the feature of `setState(updater, callback)`

Because arrow function don’t create their own context, therefore, we can rewrite the above code with more simple form:

```js
updateLanguage(lang) {
  api.fetchPopularRepos(lang)
    .then((repos) => {
      this.setState(() => ({
          repos: repos
      })
		);
    });
}	
```

**Note 2:** In above exams, we use a little trick when utilise implicit return feature of arrow function