import React, {Component} from 'react';

import {capitalizeWords} from '../helpers';

import Col from 'react-bootstrap/Col';

class ItemInfoPanel extends Component {

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
                <p>Location: {locationText}</p>
                <p>Category: {categoryText}</p>
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