import React, {Component} from 'react';

import {capitalizeWords, formatVulnerability} from '../helpers';

import Col from 'react-bootstrap/Col';


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
    return <p>Doot</p>
  }

  return <table className="table">
    <thead>
      <tr>
        <th colSpan="3"><h4>Damage Vulnerability</h4></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>Cut</th>
        <th>Stab</th>
        <th>Bash</th>
      </tr>
      <tr>
        <td>{formatVulnerability(dmgVulData.Cut)}</td>
        <td>{formatVulnerability(dmgVulData.Stab)}</td>
        <td>{formatVulnerability(dmgVulData.Bash)}</td>
      </tr>
      <tr>
        <th>Fire</th>
        <th>Ice</th>
        <th>Volt</th>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <th colSpan="3">Almighty</th>
      </tr>
      <tr>
        <td colSpan="3"></td>
      </tr>
    </tbody>
  </table>
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