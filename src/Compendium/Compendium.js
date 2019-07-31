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

    return (
      <div className="Compendium">
        I am Compendium. Fear me.
      </div>
    );
  }
}

export default Compendium;