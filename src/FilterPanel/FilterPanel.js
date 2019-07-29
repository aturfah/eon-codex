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
   * Initializes App
   * @param {Object} props Properties of object
   */
  constructor(props) {
    super(props);
    this.itemFlag = true;
    this._toggleItemFlag = this._toggleItemFlag.bind(this);
    console.log("FILTER PROPS -->");
    console.log(props);
  }

  _toggleItemFlag(itemFlag) {
    console.log("HERE!!!")
    this.itemFlag = itemFlag;
    this.props.updateFilters('itemFlag', itemFlag);
  }

  toggleItemFlagOn() {
    console.log("Flag On")
    this._toggleItemFlag(true);
  }

  toggleItemFlagOff() {
    console.log("Flag Off")
    this._toggleItemFlag(false);
  }

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
              <ToggleButtonGroup type="radio" name="ItemMonstOpts" defaultValue={1}>
                <ToggleButton onClick={this.toggleItemFlagOn.bind(this)} value={1} active={this.itemFlag===true}>Items</ToggleButton>
                <ToggleButton onClick={this.toggleItemFlagOff.bind(this)} value={2} active={this.itemFlag===false}>Monsters</ToggleButton>
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