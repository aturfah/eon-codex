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
    console.log("COMPENDIUM PROPS -->")
    console.log(props);
  }

  /**
   * Renders this React class
   * @return {div} Rendered dropdown button
   */
  render() {
    return (
      <div className="Compendium">
        I am Compendium. Fear me.
      </div>
    );
  }
}

export default Compendium;