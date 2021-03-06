import React, {Component} from 'react';

import {capitalizeWords} from '../helpers';

import Col from 'react-bootstrap/Col';

class ItemInfoPanel extends Component {

  renderActive(activeItem) {
      if (!activeItem) {
          return (<p>Please select an item to continue.</p>)
      }

      let conditionalText = 'No';
      let conditionalMethod = 'N/A';
      if (activeItem.conditional) {
        conditionalText = 'Yes';
        conditionalMethod = activeItem.cond_method;
      }

      let takeChopMineText = 'No';
      if (activeItem.take_flag || activeItem.mine_flag || activeItem.chop_flag) {
          takeChopMineText = 'Yes';
      }

      let monsterSourceText = 'N/A';
      if (activeItem.monster_source) {
          monsterSourceText = capitalizeWords(activeItem.monster_source);
      }

      let locationText = 'N/A';
      if (activeItem.location) {
          locationText = capitalizeWords(activeItem.location);
      }

      return (
          <div>
              <h1>{activeItem.name}</h1>
              <p><b>Location:</b> {locationText}</p>
              <p><b>Price:</b> {activeItem.price}en</p>
              <p><b>Monster Source:</b> {monsterSourceText}</p>
              <p><b>Conditional:</b> {conditionalText}</p>
              <p><b>Conditional Method:</b> {conditionalMethod}</p>
              <p><b>Take/Chop/Mine:</b> {takeChopMineText}</p>
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

export default ItemInfoPanel;