import React, {Component} from 'react';
import './FilterPanel.css';

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

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
          <Col xs="4">
            <p>I am FilterPanel. Fear me.</p>
            <ButtonToolbar className="CenterToolbar">
              <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
                <ToggleButton value={1}>Items</ToggleButton>
                <ToggleButton value={2}>Monsters</ToggleButton>
              </ToggleButtonGroup>
            </ButtonToolbar>
          </Col>
          <Col xs="4">I am FilterPanel. Hate me.</Col>
          <Col xs="4">I am FilterPanel. Love me.</Col>
        </Row>
      </Container>
    );
  }
}

export default FilterPanel;