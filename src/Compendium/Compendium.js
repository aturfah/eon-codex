import React, {Component} from 'react';
import './Compendium.css';

/**
 * Dropdown element for class selection
 */
class Compendium extends Component {
  /**
   * Initializes App
   * @param {Object} props Properties of object
   */
  constructor(props) {
    super(props);
  }

  filterResults() {
    let filters = this.props.filters;
    let dataset = null;
    console.log("Item Flag", filters.itemFlag)
    if (filters.itemFlag) {
      dataset = this.props.itemData;
    } else {
      dataset = this.props.monsterData;
    }
    console.log(dataset);
    return 8
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