import React, {Component} from 'react';
import './App.css';
import FilterPanel from './FilterPanel/FilterPanel';
import Compendium from './Compendium/Compendium';


class App extends Component {
  /**
   * Initializes App
   * @param {Object} props Properties of object
   */
  constructor(props) {
    super(props);
    this.state = {
      filters: {}
    };
  }

  updateFilters(newFilters) {
    const newState = this.state;
    newState.filters = newFilters;
    this.setState(newState);
  }

  render() {
    return (
      <div className="App">
        <FilterPanel updateFilters={this.updateFilters.bind(this)}></FilterPanel>
        <Compendium filters={this.state.filters}></Compendium>
      </div>
    );  
  }
}

export default App;
