import React, {Component} from 'react';
import './FilterPanel.css';

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

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
    this.activeLocation = this.props.locations[0];
    this.rareItemFlag = '(All)';

    this._toggleItemFlag = this._toggleItemFlag.bind(this);
    this.locationDropdownSelect = this.locationDropdownSelect.bind(this);
    this.rareItemDropdownSelect = this.rareItemDropdownSelect.bind(this);
    this.toggleItemFlagOn();
  }

  _toggleItemFlag(itemFlag) {
    this.itemFlag = itemFlag;
    this.props.updateFilters('itemFlag', itemFlag, true);
  }

  toggleItemFlagOn() {
    console.log("Item Flag On")
    this._toggleItemFlag(true);
  }

  toggleItemFlagOff() {
    console.log("Item Flag Off")
    this._toggleItemFlag(false);
  }

  buildLocationDropdown() {
    const buttonLists = [];
    this.props.locations.forEach(function (item, index) {
      buttonLists.push(<Dropdown.Item eventKey={item}>{item}</Dropdown.Item>)
    });

    return <DropdownButton
        size="sm"
        id="location-dropdown-select"
        ref="locationDropdownSelect"
        title={this.activeLocation}
        onSelect={this.locationDropdownSelect}
        >
      {buttonLists}
    </DropdownButton>
  }

  locationDropdownSelect(event) {
    const dropdown = this.refs.locationDropdownSelect;
    dropdown.title = event;
    this.activeLocation = event;
    if (event !== '(All)') {
        this.props.updateFilters('location', event);
    } else {
        this.props.updateFilters('location', null);
    }

  }

  buildRareItemDropdown() {
    const buttonList = [];
    ['(All)', 'Yes', 'No'].forEach(function (val) {
        buttonList.push(<Dropdown.Item eventKey={val}>{val}</Dropdown.Item>)
    });

    return <DropdownButton
        size="sm"
        id="rare-item-dropdown-select"
        ref="rareItemDropdownSelect"
        title={this.rareItemFlag}
        onSelect={this.rareItemDropdownSelect}
        >
      {buttonList}
    </DropdownButton>
  }

  rareItemDropdownSelect(event) {
    const dropdown = this.refs.rareItemDropdownSelect;
    dropdown.title = event;
    this.rareItemFlag = event;
    if (event !== '(All)') {
        this.props.updateFilters('rareItem', event);
    } else {
        this.props.updateFilters('rareItem', null);
    }
  }

  /**
   * Renders this React class
   * @return {div} Rendered dropdown button
   */
  render() {
    console.log("FILTER PROPS -->");
    console.log(this.props);

    // Set button properties properly
    let itemButtonVariant = 'success';
    let monsterButtonVariant = 'secondary';
    let itemFiltersVisible = true;
    if (this.itemFlag===false) {
      itemButtonVariant = 'secondary';
      monsterButtonVariant = 'success';
      itemFiltersVisible = false;
    }

    // Build dropdown for Locations
    const locationDropdown = this.buildLocationDropdown();
    const rareItemDropdown = this.buildRareItemDropdown();

    return (
      <Container fluid={true} className="FilterPanel">
        <Row>
          <Col xs="12" md="4">
            <p>I am FilterPanel. Fear me.</p>
            <ButtonToolbar className="CenterToolbar">
              <ToggleButtonGroup type="radio" size="sm" name="ItemMonstOpts" defaultValue={1}>
                <ToggleButton
                  onClick={this.toggleItemFlagOn.bind(this)}
                  value={1}
                  variant={itemButtonVariant}
                  >
                    Items
                </ToggleButton>
                <ToggleButton
                  size="sm"
                  onClick={this.toggleItemFlagOff.bind(this)}
                  value={2}
                  variant={monsterButtonVariant}
                  >
                    Monsters
                </ToggleButton>
              </ToggleButtonGroup>
            </ButtonToolbar>
            {locationDropdown}
            {rareItemDropdown}
          </Col>
          <Col xs="12" md="8" hidden={!itemFiltersVisible}>I am Items FilterPanel. Hate me.</Col>
          <Col xs="12" md="8" hidden={itemFiltersVisible}>I am Monsters FilterPanel. Love me.</Col>
        </Row>
      </Container>
    );
  }
}

export default FilterPanel;