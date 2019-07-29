import React, {Component} from 'react';
import './FilterPanel.css';

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

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
        <Row>
          <Col xs="4">I am FilterPanel. Fear me.</Col>
          <Col xs="4">I am FilterPanel. Hate me.</Col>
          <Col xs="4">I am FilterPanel. Love me.</Col>
        </Row>
      </Container>
    );
  }
}

export default FilterPanel;