import React, {Component} from 'react';

import {capitalizeWords, formatVulnerability} from '../helpers';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


function renderDrops(activeItem) {
  const drops = activeItem.drops
  const dropsArr = []

  // Build list of drops
  if (drops === undefined) {
    dropsArr.push(<i>None</i>)
  } else {
    Object.keys(drops).forEach(function (dropName) {
      let newObj = null;
      let displayText = dropName;

      // Add comma if not last element of list
      if (Object.keys(drops).indexOf(dropName) !== Object.keys(drops).length - 1) {
        displayText = displayText + ', '
      }

      // Italicize conditional drops
      if (drops[dropName].conditional) {
        newObj = <i key={dropName}>{displayText}</i>
      } else {
        newObj = <span key={dropName}>{displayText}</span>
      }

      dropsArr.push(newObj);
    });
  }

  return dropsArr
}


function renderDmgVulnerability(activeItem) {
  const dmgVulData = activeItem.damageVul;
  if (!dmgVulData) {
    return <p>Doot Damage</p>
  }

  return <ul><b>Damage Vulnerability:</b>
    <Row>
      <Col xs="3"></Col>
      <Col xs="12" md="3">
        <li>Cut: {formatVulnerability(dmgVulData.Cut)}</li>
        <li>Stab: {formatVulnerability(dmgVulData.Stab)}</li>
        <li>Bash: {formatVulnerability(dmgVulData.Bash)}</li>
        <li>Almighty: {formatVulnerability(dmgVulData.Almighty)}</li>
      </Col>
      <Col xs="12" md="3">
        <li>Fire: {formatVulnerability(dmgVulData.Fire)}</li>
        <li>Ice: {formatVulnerability(dmgVulData.Ice)}</li>
        <li>Volt: {formatVulnerability(dmgVulData.Volt)}</li>
      </Col>
    </Row>
  </ul>
}

function renderAilmentVulnerability(activeItem) {
  const ailVulData = activeItem.ailmentVul;
  if (!ailVulData) {
    return <p>Doot Ailment</p>
  }

  return <ul><b>Bind/Ailment Vulnerability:</b>
    <Row>
      <Col xs="3"></Col>
      <Col xs="12" md="3">
        <li type="square">Stun: {formatVulnerability(ailVulData.Stun)}</li>
        <li type="square">Instant Death: {formatVulnerability(ailVulData['Instant Death'])}</li>
        <li>Blind: {formatVulnerability(ailVulData.Blind)}</li>
        <li>Poison: {formatVulnerability(ailVulData.Poison)}</li>
        <li>Paralysis: {formatVulnerability(ailVulData.Paralysis)}</li>
        <li>Panic: {formatVulnerability(ailVulData.Panic)}</li>
      </Col>
      <Col xs="12" md="3">
      <li>Sleep: {formatVulnerability(ailVulData.Sleep)}</li>
        <li>Curse: {formatVulnerability(ailVulData.Curse)}</li>
        <li>Petrification: {formatVulnerability(ailVulData.Petrification)}</li>
        <li type="circle">Head Bind: {formatVulnerability(ailVulData['Head Bind'])}</li>
        <li type="circle">Arm Bind: {formatVulnerability(ailVulData['Arm Bind'])}</li>
        <li type="circle">Leg Bind: {formatVulnerability(ailVulData['Leg Bind'])}</li>
      </Col>
    </Row>
  </ul>
}


class MonsterInfoPanel extends Component {

  renderActive(activeItem) {
      if (!activeItem) {
          return (<p>Please select a monster to continue.</p>)
      }
      let categoryText = 'N/A';
      if (activeItem.cat) {
        categoryText = activeItem.cat;
      }

      let locationText = 'N/A';
      if (activeItem.location) {
          locationText = capitalizeWords(activeItem.location);
      }

      return (
          <div>
              <h1>{activeItem.name}</h1>
              <p><b>Location:</b> {locationText}</p>
              <p><b>Category:</b> {categoryText}</p>
              <p><b>Drops</b>: {renderDrops(activeItem)}</p>
              {renderDmgVulnerability(activeItem)}
              {renderAilmentVulnerability(activeItem)}
          </div>
      )
  }

  render() {
    console.log('InfoPanel Props -->')
    console.log(this.props.active);

    return <Col xs="9">
      I am Copendium Info Panel. Read me. <br/>
      {this.renderActive(this.props.active)}
    </Col>
  }
}

export default MonsterInfoPanel;