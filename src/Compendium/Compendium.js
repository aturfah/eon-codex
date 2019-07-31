import React, {Component} from 'react';
import './Compendium.css';

/**
 * Dropdown element for class selection
 */
class Compendium extends Component {
  filterResults() {
    let filters = this.props.filters;
    let dataset = null;

    // Chose right dataset
    if (filters.itemFlag) {
      dataset = this.props.itemData;
    } else {
      dataset = this.props.monsterData;
    }

    // Filter based on location if applicable


    // TODO: Do rest of stuff here

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