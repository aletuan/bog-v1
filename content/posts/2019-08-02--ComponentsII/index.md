---
title: React - VII (Advanced)
subTitle: What I talk when i talk about React
cover: photo-react-components-cover.png
---

In this section, we continue to learning more advanced techniques that are useful in React application development.

## 1. Render Props

This is a simple technique for sharing code between React Components using props whose value is a function.

Let start with a sample. We have two components, *Cat* and *Mouse*. Mouse is a component that encapsulate its position within state, and it need to share this state with Cat. The simple solution is putting the Cat within the Mouse's render method, but this way will break the reusability, every time a component need to know about Mouse, it has to be insert in Mouse's render.

To fix this issue, we use a a mouse's property as a function to render the Cat (or any component) without making them tighly couple.

```jsx
class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>
        {this.props.render(this.state)}
      </div>
    );
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>
        <Mouse render={mouse => (
          <Cat mouse={mouse} />
        )}/>
      </div>
    );
  }
}
```

We can even improve more reusability in the above code by encapsulate the render within the a function (this kind of function is called HOC, but we will learn about it in the next section).

```jsx
// If you really want a HOC for some reason, you can easily
// create one using a regular component with a render prop!
function withMouse(Component) {
  return class extends React.Component {
    render() {
      return (
        <Mouse render={mouse => (
          <Component {...this.props} mouse={mouse} />
        )}/>
      );
    }
  }
}
```

In this HOC function, we can render Mouse, and sharing its position state with any other external component. Actually, we have created a new component based on the existing components.

> A high-order component (HOC) is a function that takes a component and return new component.


