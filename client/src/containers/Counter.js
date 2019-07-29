import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleIncrement, handleDecrement } from './../actions';

class Counter extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <h1>Counter</h1>
        <p>Counter: 0</p>
        <button onClick={this.props.incrementCounter}>Increment</button>
        <button onClick={this.props.decrementCounter}>Decrement</button>
      </div>
    );
  }
}

function mapStateToProps({ counter }) {
  return {
    counter: counter.counter
  };
}

export default connect(
  mapStateToProps,
  { handleIncrement, handleDecrement }
)(Counter);
