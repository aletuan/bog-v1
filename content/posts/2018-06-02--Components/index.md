---
title: React component
subTitle: React component usage
cover: photo-react-components-cover.png
---

A React application is made up of a ton of smaller and composable component.  Each component is self-sustaining, independent micro-entities that describe part of your UI application.

One of the best parts of the component is reusable. We can use one component in a different place or combine many components to make a more complex component.

## Props and State
Since the component is the UI part, it is able to display or get input data from the user.  There are two ways that the developer can combine component with data: either as **props** or **state**.  These data determine what a component rendering and how it behaves.

### props

If we think components as a plain JavaScript function, then props would be the function input.  So in that way, a component accepts an input (props), processes it, and render with some JSX code.

An important thing to remember: props is immutable and top-down flow
		* Top-down flow: props is data that parent component pass down to its children
		* Immutable: child component cannot modify its props.

Props is an NDA that each child component inherits from its parent.

### state

The state is the data that owned by the component where it declared. A component can initialize state (maybe initialized by props data), and update it whenever necessary. 

The scope of a state is limited to the current component. State of parent component usually ends up being props of child component, so when a state is passed out of the current scope, it is referred as props.

```js
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
  
  componentWillUnmount() {
    clearInterval(this.timerID);
  }  
  
  tick() {
    this.setState({
      date: new Date()
    });
  }  

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

In additional, there are some highlight about component’s state:

	* We do not modify state directly, instead, using `setState()`
	* State updates may be asynchronous. Beware if we want to use current state to generate a new state [1]
	* State updates are merged [2]

[1] React may batch several `setState()` call into a single update for performance. Because `this.props` and `this.state` may be updated asynchronously, we should not rely on their values for calculating the next state.

This is the wrong way

```js
this.setState({
	count: this.state.count + this.props.increment,
});
```

This is the right way

```js
this.setState((prevState, props) => ({
	counter: preState.counter + props.increment
}));
```

[2] When your state contain several independent pieces of data (variable)

```js
constructor(props) {
	super(props);
	this.state = {
		posts: [],
		comments: [],
	};
}

componentDidMount() {
	fetchPosts().then(response => {
		this.setState({
			posts: response.posts
		});
	});

	fetchComments().then(response => {
		this.setState({
			comments: response.comments
		});
	});
}
```

## Functional & Class components

A React component can be also classified with two types: class component or functional component. The difference between two categories are quite obivious with different advantages.

### Functional component

This is just JavaScript function. They take an optional input and generate an output (with JSX code). In ES6, functional component should be written with arrow functions (this content is auto binding with arrow function, one plus point).

```js
function tick() {
	// this is where props come
  function Welcome(props) {
    return <h1>Hello, {props.name}</h1>
  }
  ReactDOM.render(<Welcome name='andy' />, document.getElementById('root'));
}

tick();
//setInterval(tick, 1000);
```

### Class component

Class component come with additional features. For example, React provide some methods that we can override during the life cycle of React component (mounting, rendering, unmount DOM).  

```js
class Welcome extends React.Component {
  render() {
    return <h1>Hi, {this.props.name}</h1>;
  }
}
function tick() {
  ReactDOM.render(<Welcome name='andy' />, document.getElementById('root'));
}

tick();
```


There are some notes when implementing React component by class form.

	- React class component can exist without state (stateless component)
	- If we want to initilize state of React component, let use `constructor` method. 
	- The constructor accept props as an input, inside it, we should call `super` to passdown what it should inherit from its parent class.

## Stateful component and Stateless component

Simplicity, components may have state or the component may not.

	* Stateful component are always class component (Nah, not functional component)
	* Stateful component  have to use `this.state` and `this.setState` to get or set state of the component
	* Developer can use functional or class form to define stateless component.  But unless we don’t need to involbe some lifecycle hoook, we should go for *stateless functional component*

## Presentational and Container component

This is kind of design pattern when we develop React component.

### Presentaional components

This kind of component is coupled with the view only. They accept props from their container (parent) component and render them. Everything that has to do with describing the UI should go here.

Presentational components are highly reusable and should stay decoupled from the behaviour layer. In case, presentational want to communicate with container (parent) component (for example, receiving input, or button click event), it can perform a callback to the container component. The callback is also kind of props that presentational component receives from container component.

The functional component should be the first candidate if we want to develop a presentational component unless it requires state. But if it requires state, it should be concerned with the UI state, not actual data (for example, a status of a button, text content in the input text field).

The presentational component does not interact with Redux store or make API call. It should be a pure component.

### Container component

Container component deals with the behavioural part. A container component tells the presentational component what should be rendered using props. It should not contain limited DOM markup and styles.

If we using Redux, a container component contain the code that dispatches action to a store. 

> This is the place where we make API calls or store the result from component state  

So, the structure is that we have container component at the top, that pass down the data to its children component as props. 

This model work perfectly for a smaller project; however, when projects go bigger, we will have a lot of intermediate components that just accept props, and pass them on to child components. This is nasty and hard to maintain. When this happens, it is better to create a container component unique to the left component, and this will ease the burden on the intermediate components.

In conclusion, this is my mantra:

> Presentational component: functional, stateless style  
> Container component: class, stateful style  

