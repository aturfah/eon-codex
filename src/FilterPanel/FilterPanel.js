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
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

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
    this.resetFlags();

    this._toggleItemFlag = this._toggleItemFlag.bind(this);
    this.nameFilterType = this.nameFilterType.bind(this);
    this.monsterSourceFilterType = this.monsterSourceFilterType.bind(this);
    this.locationDropdownSelect = this.locationDropdownSelect.bind(this);
    this.condItemDropdownSelect = this.condItemDropdownSelect.bind(this);
    this.monsterTypeDropdownSelect = this.monsterTypeDropdownSelect.bind(this);
    this.gatherPointDropdownSelect = this.gatherPointDropdownSelect.bind(this);
    this.toggleItemFlagOn();
  }

  resetFlags() {
    this.activeLocation = this.props.locations[0];
    this.condItemFlag = '(All)';
    this.monsterTypeFlag = '(All)';
    this.nameFilter = '';
    this.monsterNameFilter = '';
    this.gatherPointFlag = '(N/A)'
  }

  _toggleItemFlag(itemFlag) {
    this.itemFlag = itemFlag;
    this.resetFlags();
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
    let activeLocation = this.activeLocation;
    this.props.locations.forEach(function (item, index) {
      buttonLists.push(
        <Dropdown.Item
            eventKey={item}
            disabled={item===activeLocation}
            >
            {item}
        </Dropdown.Item>
      );
    });

    return <DropdownButton
        size="sm"
        id="location-dropdown-select"
        ref="locationDropdownSelect"
        title={'Location: ' + this.activeLocation}
        onSelect={this.locationDropdownSelect}
        className="leftPadded"
        >
      {buttonLists}
    </DropdownButton>
  }

  locationDropdownSelect(event) {
    const dropdown = this.refs.locationDropdownSelect;
    dropdown.title = event;
    this.activeLocation = event;
    if (event !== '(All)') {
        this.props.updateFilters('location', event.toLowerCase());
    } else {
        this.props.updateFilters('location', null);
    }

  }

  buildCondItemDropdown() {
    const buttonList = [];
    let condItemFlag = this.condItemFlag;
    ['(All)', 'Yes', 'No'].forEach(function (val) {
        buttonList.push(
          <Dropdown.Item
            eventKey={val}
            disabled={val===condItemFlag} 
            >
           {val}
        </Dropdown.Item>
        )
    });

    return <DropdownButton
        size="sm"
        id="rare-item-dropdown-select"
        ref="condItemDropdownSelect"
        title={'Conditional: ' + this.condItemFlag}
        onSelect={this.condItemDropdownSelect}
        >
      {buttonList}
    </DropdownButton>
  }

  condItemDropdownSelect(event) {
    const dropdown = this.refs.condItemDropdownSelect;
    dropdown.title = event;
    this.condItemFlag = event;
    if (event !== '(All)') {
        this.props.updateFilters('condItem', event);
    } else {
        this.props.updateFilters('condItem', null);
    }
  }

  buildMonsterTypeDropdown() {
    const buttonList = [];
    let monsterTypeFlag = this.monsterTypeFlag;
    this.props.monsterTypes.forEach(function (val) {
        buttonList.push(
          <Dropdown.Item
            eventKey={val}
            disabled={val===monsterTypeFlag} 
            >
           {val}
        </Dropdown.Item>
        )
    });

    return <DropdownButton
        size="sm"
        id="monster-type-dropdown-select"
        ref="monsterTypeDropdownSelect"
        title={'Monster Type: ' + this.monsterTypeFlag}
        onSelect={this.monsterTypeDropdownSelect}
        className='paddedButton'
        >
      {buttonList}
    </DropdownButton>
  }

  monsterTypeDropdownSelect(event) {
    const dropdown = this.refs.monsterTypeDropdownSelect;
    dropdown.title = event;
    this.monsterTypeFlag = event;
    if (event !== '(All)') {
        this.props.updateFilters('monsterType', event);
    } else {
        this.props.updateFilters('monsterType', null);
    }
  }

  buildNameFilter() {
    return (<InputGroup className="mb-3">
        <FormControl
        ref="nameFilterText"
        placeholder="Item/Monster Name"
        value={this.nameFilter}
        aria-label="Item/Monster Name"
        onChange={this.nameFilterType}
        />
    </InputGroup>)
  }

  nameFilterType() {
    const textbox = this.refs.nameFilterText;
    this.nameFilter = textbox.value;
    if (textbox.value) {
        this.props.updateFilters('name', textbox.value.toLowerCase());
    } else {
        this.props.updateFilters('name', null);
    }
  }

  buildMonsterSourceFilter() {
    return (<InputGroup className="mb-3">
    <FormControl
    ref="monsterSourceFilterText"
    placeholder="Monster Source Name"
    value={this.monsterNameFilter}
    aria-label="Monster Source Name"
    onChange={this.monsterSourceFilterType}
    />
    </InputGroup>)
  }

  monsterSourceFilterType() {
    const textbox = this.refs.monsterSourceFilterText;
    this.monsterNameFilter = textbox.value;
    if (this.monsterNameFilter) {
        this.props.updateFilters('monsterSourceName', this.monsterNameFilter.toLowerCase());
    } else {
        this.props.updateFilters('monsterSourceName', null);
    }
  }

  buildGatherPointDropdown() {
    const buttonList = [];
    let gatherPointFlag = this.gatherPointFlag;
    ['(N/A)', '(All)', '(None)', 'Chop', 'Mine', 'Take'].forEach(function (val) {
        buttonList.push(
          <Dropdown.Item
            eventKey={val}
            disabled={val===gatherPointFlag} 
            >
           {val}
        </Dropdown.Item>
        )
    });

    return <DropdownButton
        size="sm"
        id="gather-point-dropdown-select"
        ref="gatherPointDropdownSelect"
        title={'Gather Point: ' + this.gatherPointFlag}
        onSelect={this.gatherPointDropdownSelect}
        className="leftPadded"
        >
      {buttonList}
    </DropdownButton>
  }

  gatherPointDropdownSelect(event) {
    const dropdown = this.refs.gatherPointDropdownSelect;
    this.gatherPointFlag = event;
    dropdown.title = event;

    let chopFlag = false;
    let mineFlag = false;
    let takeFlag = false;
    if (event !== '(N/A)') {
        if (event === '(All)') {
            chopFlag = true;
            mineFlag = true;
            takeFlag = true;
        }
        else if (event === 'Chop') {
            chopFlag = true;
        } else if (event === 'Mine') {
            mineFlag = true;
        } else if (event === 'Take') {
            takeFlag = true;
        }
    } else {
        chopFlag = null;
        mineFlag = null;
        takeFlag = null;
    }

    this.props.updateFilters('chopFlag', chopFlag);
    this.props.updateFilters('mineFlag', mineFlag);
    this.props.updateFilters('takeFlag', takeFlag);
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
    const nameFilter = this.buildNameFilter();
    const locationDropdown = this.buildLocationDropdown();
    const condItemDropdown = this.buildCondItemDropdown();
    const gatherPointDropdown = this.buildGatherPointDropdown();
    const monsterSourceTextField = this.buildMonsterSourceFilter()
    const monsterTypeDropdown = this.buildMonsterTypeDropdown();

    return (
      <Container fluid={true} className="FilterPanel">
        <Row>
          <Col xs="12" md="4">
            <p>I am FilterPanel. Fear me.</p>
            <ButtonToolbar className="CenterToolbar paddedButton" >
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
              {locationDropdown}
            </ButtonToolbar>
            {nameFilter}
          </Col>
          <Col xs="12" md="8" hidden={!itemFiltersVisible}>
              I am Items FilterPanel. Hate me.
            <ButtonToolbar className="CenterToolbar paddedButton">
                {condItemDropdown}
                {gatherPointDropdown}
            </ButtonToolbar>
            {monsterSourceTextField}
          </Col>
          <Col xs="12" md="8" hidden={itemFiltersVisible}>
              I am Monsters FilterPanel. Love me.
            {monsterTypeDropdown}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default FilterPanel;