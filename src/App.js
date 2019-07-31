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
  const order = [];

  monsterData.forEach(function (item, index) {
    const lc_loc = item.location.toLowerCase();
    raw_output.add(lc_loc);
    if (!order.includes(lc_loc)) {
        order.push(lc_loc);
    }
  });

  itemData.forEach(function (item, index) {
    const lc_loc = item.location.toLowerCase();
    raw_output.add(lc_loc);
    if (!order.includes(lc_loc)) {
        order.push(lc_loc);
    }
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
  output.sort(function (value) {
      console.log(value, -1 * (order.indexOf(value) + order.length))
      return -1 * (order.indexOf(value) + order.length)
  });
  output.unshift('(All)') // Empty first element
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
    this.locations = getLocations();
  }

  updateFilters(key, filterValue, clearFlag) {
    let newState = null;
    if (clearFlag === true) { // Preserve the old ones
      newState = defaultState()
      newState.filters.location = this.state.filters.location;
    }
    else {
      newState = this.state;
    }

    // Add ability to delete from filters
    if (filterValue === undefined || filterValue === null) {
        delete newState.filters[key];
    }
    else {
        newState.filters[key] = filterValue;
    }

    this.setState(newState);
  }

  render() {
    return (
      <div className="App">
        <FilterPanel
          updateFilters={this.updateFilters.bind(this)}
          locations={this.locations}>
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
