import React, {Component} from 'react';

import Col from 'react-bootstrap/Col';

class InfoPanel extends Component {

  renderActive(activeItem) {
      if (!activeItem) {
          return (<p>Please select an item to continue.</p>)
      }
        return (<p>{activeItem.name}</p>)
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

export default InfoPanel;