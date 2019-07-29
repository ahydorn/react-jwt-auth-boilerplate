import React, { Component } from 'react';
import Counter from './Counter';
import Stuff from './Stuff';

class App extends Component {
  state = {
    myFaveNumber: 0
  };
  render() {
    return (
      <div>
        <Counter />
        <Stuff />
      </div>
    );
  }
}

export default App;
