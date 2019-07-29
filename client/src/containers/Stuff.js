import React, { Component } from 'react';
import { connect } from 'react-redux';

class Stuff extends Component {
  state = {
    myFaveNumber: 1
  };

  handleIncrement = () => {
    this.setState({ myFaveNumber: this.state.myFaveNumber + 1 });
  };

  handleDecrement = () => {
    this.setState({ myFaveNumber: this.state.myFaveNumber - 1 });
  };

  render() {
    return (
      <div>
        <p>My fave number is: {this.props.counter}</p>
      </div>
    );
  }
}

function mapStateToProps({ counter }) {
  return { counter: counter.counter };
}

export default connect(
  mapStateToProps,
  null
)(Stuff);
