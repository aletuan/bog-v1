---
title: React - VI
subTitle: What I talk when i talk about React
cover: photo-react-components-cover.png
---

A React application is made up of a ton of smaller and composable component.  Each component is self-sustaining, independent micro-entities that describe part of the UI.

## 1. Start a simple component

React components implements *render()* method thats takes input data and return whats to display. It uses an XML-like syntax called JSX. 

Here is a simple sample:

```jsx
class HelloMessage extends React.Component {
  render() {
    return (
      <div>
        Hello {this.props.name}
      </div>
    );
  }
}

ReactDOM.render(
  <HelloMessage name="Taylor" />,
  mountNode
);
```

In this sample, input data is passed into the component by using *this.props*. In the next section, we will talk more about component's data.

## 2. Props and State

Since the component is the UI part, it is able to display or get input data from the user.  There are two ways that the developer can combine component with data: either as **props** or **state**.  These data determine what a component rendering and how it behaves.

### Props

A component accepts an input or *this.props*, processes it, and render with some JSX code.

An important thing to remember: props is immutable and top-down flow

- Top-down flow: props is data that parent component pass down to its children

- Immutable: child component cannot modify its props.

### State

A component can maintain internal state data via *this.state*. When the component's state is changed, the render markup will be updated by re-invoking *render()*

```jsx
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { seconds: props.start };
  }

  tick() {
    this.setState(prevState => ({
      seconds: prevState.seconds + 1
    }));
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        Seconds: {this.state.seconds}
      </div>
    );
  }
}

ReactDOM.render(<Timer start=0 />, mountNode);
```

> The scope of a state is limited to the current component. State of parent component usually ends up being props of child component, so when a state is passed out of the current scope, it is referred as props.

## 3. State and Lifecycle

A component displays UI content based on user's input. To do it, the component need to invoke some licycle hooks methods. There are some methods that we did used in the previous sample:

+ *componentDidMount()*, runs after the component output has been render to DOM to set up the timer.
+ *componentWillUnMount()*, clean up the timer resource

We summarize some steps has been done with Timer component:

1. When *<Timer />* is passed to *ReactDOM.render()*, React call the constructor of the Timer component
2. React call the Timer's render method, with output of *render()* method, it update DOM
3. *componentDidMount()* is called, and ask browswer to set up timer for *tick()*
4. Every time calling *tick()*, state is updated, and *render()* is called again
5. If *Timer* is removed, then *componentWillUnMount()* is called to stop timer 

**Note**: We can remove timer from its parent component, using a conditional state variable and conditional rendering.

For example:

```jsx
{this.state.isShowTimer && 
  <Timers start={100} />
}
```

## 4. More highlight about State

In additional, there are some highlight about component’s state:

- We do not modify state directly, instead, using *setState()*
- State updates may be asynchronous. Beware if we want to use current state to generate a new state
- State updates are merged

### setState() is asyncronous

React may batch several *setState()* call into a single update for performance. Because *this.props* and *this.state* may be updated asynchronously, we should not rely on their values for calculating the next state.

This is the wrong way

```jsx
tick() {
  this.setState({
	  seconds: this.state.seconds + 1,
  });
}
```

This is the right way

```jsx
tick() {
  this.setState(prevState => ({
    seconds: prevState.seconds + 1
  }));
}
```

### State updates are merged

When your state contain several independent pieces of data (variable)

```jsx
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

### Top-down data flow

When we pass data to the component, we dont care if that component is a functional or class component.

```jsx
ReactDOM.render(<Timer start=0 />, mountNode);
```

The *Timer* component receive input value for *start*, without knowning whether it came from another component's state or props or direct value. This style is called "top-down" or "unidirectional" data flow. 

> Any state is always owned by some specific component, and any data or UI derived from that state can only affect component below them in the tree.

![](./photo-top-down-dataflow.png)

## 5. Handling event

Handling events with React elements is very similar to handling events on DOM elements. There are some syntactic differences:

- React evenets are named with camelCase, rather than lower case.
- With JSX, we pass a function as event handle, rather than a string. 

For example, the HTML

```javascript
<button onclick="activateLasers()">
  Activate Lasers
</button>
```

In the React:

```jsx
<button onClick={activateLasers}>
  Activate Lasers
</button>
```

In the DOM, we use method *addEventListener()* to add listener to an element after it creaated. For example:

```javascript
document.addEventListener("click", function(){
    document.getElementById("demo").innerHTML = "Hello World!";
});
```

In React, specially with ES6, we define an event handler to be a method on the class. For example:

```jsx
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
```

**Note:** In the above example, method *handleClick* use **this** to access component state. In JavaScript, *this* context is not bound by default. Therefore, we have to bind the method in the constructor.

To avoid the binding the method in the constructor, there are two options:

- Using *experimental public class fields syntax*

```jsx
  handleClick = () => {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }
```

- Using an *arrow function* in the callback

```jsx
  render() {
    // This syntax ensures `this` is bound within handleClick
    return (
      <button onClick={(e) => this.handleClick(e)}>
        Click me
      </button>
    );
  }
```

## 6. Conditional Rendering

This is the case when we want to render only some of React components depending on the state of the application.

In a simple way, we can use *if* condition, for example:

```jsx
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}
```

We can have a shorter way by using inline if with logical *&&* operator:

```jsx
let timer =  <Timers start={100} />;
...
{this.state.isShowTimer && 
  timer
}
```

## 7. Form

Form is collection of HTML form element, such as input text, input checkbox, textarea, select, file. Each element can be considered as a component whose value is controlled by form state. Since the form state control all values of form element, that React state be the **single source of truth**

There are two types of component
- *Controlled component*: is a form element whose value is controlled by React. For example, input, checkbox, textarea, select
- *Uncontrolled component*: has value is not controlled by React. For example, file component,  since its value is read-only.

Another note about form is the trick we can apply when want to handle form with multiple element. In that case, we can put **name** for element, then based on that name and element type to update element with correct data.

For example:

```jsx
handleChange(event) {
  const target = event.target;
  const name = target.name;

  // for checkbox
  const value = target.type === 'checkbox' ? 
    target.checked : 
    target.value;

  this.setState({
    [name]: value,
  });
}
```

