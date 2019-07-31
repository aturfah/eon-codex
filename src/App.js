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

  [monsterData, itemData].forEach(function (rawData, index) {
    rawData.forEach(function (item, index) {
        let lc_loc = item.location.toLowerCase();
        let loc_arr = []
        if (!lc_loc.includes(' and ')) {
            loc_arr.push(lc_loc)
        } else {
            loc_arr = lc_loc.split(' and ')
        }
    
        loc_arr.forEach(function (loc_part) {
            raw_output.add(loc_part);
            if (!order.includes(loc_part)) {
                order.push(loc_part);
            }
        });
      });
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

function getMonsterTypes() {
    const monsterTypes = new Set()
    monsterData.forEach(function (val) {
        monsterTypes.add(val.cat)
    });

    const output = Array.from(monsterTypes);
    output.sort();
    output.unshift('(All)');
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
    this.monsterTypes = getMonsterTypes();
  }

  updateFilters(key, filterValue, clearFlag) {
    let newState = null;
    if (clearFlag === true) { // Preserve the old ones
      newState = defaultState()
      //newState.filters.location = this.state.filters.location;
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
          locations={this.locations}
          monsterTypes={this.monsterTypes}>
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
