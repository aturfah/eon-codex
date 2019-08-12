import React, {Component} from 'react';

import {capitalizeWords} from '../helpers';

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