import React, {Component} from 'react';
import './FilterPanel.css';

import Container from 'react-bootstrap/Container'


/**
 * Dropdown element for class selection
 */
class FilterPanel extends Component {
  /**
   * Renders this React class
   * @return {div} Rendered dropdown button
   */
  render() {
    return (
      <Container fluid={true} className="FilterPanel">
        I am FilterPanel. Fear me.
      </Container>
    );
  }
}

export default FilterPanel;