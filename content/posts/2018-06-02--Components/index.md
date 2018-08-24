---
title: React
subTitle: What I talk when i talk about React
cover: photo-react-components-cover.png
---

A React application is made up of a ton of smaller and composable component.  Each component is self-sustaining, independent micro-entities that describe part of the UI.

## Start a simple component

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

## Props and State

Since the component is the UI part, it is able to display or get input data from the user.  There are two ways that the developer can combine component with data: either as **props** or **state**.  These data determine what a component rendering and how it behaves.

### props

A component accepts an input or *this.props*, processes it, and render with some JSX code.

An important thing to remember: props is immutable and top-down flow

- Top-down flow: props is data that parent component pass down to its children

- Immutable: child component cannot modify its props.

### state

A component can maintain internal state data via *this.state*. When the component's state is changed, the render markup will be updated by re-invoking *render()*

```jsx
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { seconds: 0 };
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

ReactDOM.render(<Timer />, mountNode);
```

> The scope of a state is limited to the current component. State of parent component usually ends up being props of child component, so when a state is passed out of the current scope, it is referred as props.

## Update component state

In additional, there are some highlight about component’s state:

- We do not modify state directly, instead, using *setState()*
- State updates may be asynchronous. Beware if we want to use current state to generate a new state
- State updates are merged

### setState() is asyncronous

React may batch several *setState()* call into a single update for performance. Because *this.props* and *this.state* may be updated asynchronously, we should not rely on their values for calculating the next state.

This is the wrong way

```jsx
this.setState({
	count: this.state.count + this.props.increment,
});
```

This is the right way

```jsx
this.setState((prevState, props) => ({
	counter: preState.counter + props.increment
}));
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