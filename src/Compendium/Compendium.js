import React, {Component} from 'react';
import './Compendium.css';

/**
 * Dropdown element for class selection
 */
class Compendium extends Component {
  filterResults() {
    let filters = this.props.filters;
    let dataset = [];

    // Chose right dataset
    if (filters.itemFlag) {
      dataset = this.props.itemData;
    } else {
      dataset = this.props.monsterData;
    }
    console.log("BEFORE FILTERS", dataset.length)

    // Filter based on location if applicable
    if (filters.location) {
        dataset = dataset.filter(function (datum) {
            return datum.location.toLowerCase().includes(filters.location);
        });
    }

    // Filter Items based on Rare item flag
    if (filters.itemFlag && filters.condItem !== undefined) {
        let condItemFlag = (filters.condItem === 'Yes');
        dataset = dataset.filter(function (datum) {
            return datum.conditional === condItemFlag;
        });
    }

    // TODO: Do rest of stuff here

    console.log("AFTER FILTERS", dataset.length)
    return dataset
  }

  /**
   * Renders this React class
   * @return {div} Rendered dropdown button
   */
  render() {
    console.log("COMPENDIUM PROPS -->")
    console.log(this.props);

    const dataset = this.filterResults()
    const doot = []
    dataset.forEach(function (val) {
        doot.push(<p>Name: {val.name}</p>)
    });

    return (
      <div className="Compendium">
        I am Compendium. Fear me.
        {doot}
      </div>
    );
  }
}

export default Compendium;