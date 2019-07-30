import React, {Component} from 'react';
import './App.css';
import FilterPanel from './FilterPanel/FilterPanel';
import Compendium from './Compendium/Compendium';
import itemData from './ItemData';
import monsterData from './MonsterData';

function defaultState() {
  return {
    filters: {}
  };
}

function getLocations() {
  // Get first list of items
  const raw_output = new Set();
  itemData.forEach(function (item, index) {
    raw_output.add(item.location.toLowerCase());
  });

  monsterData.forEach(function (item, index) {
    raw_output.add(item.loc.toLowerCase());
  });

  // Remove all composite locations
  const final_set = new Set();
  raw_output.forEach(function (item, index) {
    if(!item.includes('and')) {
      final_set.add(item);
    }
  });

  // Sort and return
  const output = Array.from(final_set);
  output.sort();
  return output;
}


class App extends Component {
  /**
   * Initializes App
   * @param {Object} props Properties of object
   */
  constructor(props) {
    super(props);
    this.state = defaultState();
  }

  updateFilters(key, filterValue, clearFlag) {
    let newState = null;
    if (clearFlag === true) {
      newState = defaultState()
    }
    else {
      newState = this.state;
    }

    newState.filters[key] = filterValue;
    this.setState(newState);
  }

  render() {
    const locations = getLocations();
    return (
      <div className="App">
        <FilterPanel
          updateFilters={this.updateFilters.bind(this)}
          locations={locations}>
        </FilterPanel>
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
