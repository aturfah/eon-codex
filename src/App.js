import React, {Component} from 'react';
import './App.css';
import FilterPanel from './FilterPanel/FilterPanel';
import Compendium from './Compendium/Compendium';
import itemData from './ItemData';
import monsterData from './MonsterData';

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

  updateFilters(key, filterValue) {
    console.log("Updating filter", key, filterValue)
    const newState = this.state;
    newState.filters[key] = filterValue;
    this.setState(newState);
    console.log("NEW STATE -->")
    console.log(this.state)
  }

  render() {
    return (
      <div className="App">
        <FilterPanel updateFilters={this.updateFilters.bind(this)}></FilterPanel>
        <Compendium
          filters={this.state.filters}
          itemData={itemData}
          monsterData={monsterData}>
        </Compendium>
      </div>
    );  
  }
}

export default App;
