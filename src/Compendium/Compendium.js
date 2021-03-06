import React, {Component} from 'react';
import './Compendium.css';
import ItemInfoPanel from './ItemInfoPanel';
import MonsterInfoPanel from './MonsterInfoPanel';

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

/**
 * Dropdown element for class selection
 */
class Compendium extends Component {
    constructor(props) {
        super(props);
        this.active = null;
    }

    setActive(datum) {
        console.log('ACTIVE -->')
        console.log(datum);
        this.active = datum;
        this.forceUpdate();
    };

  filterResults() {
    let filters = this.props.filters;
    let dataset = [];

    // Chose right dataset
    if (filters.itemFlag) {
      dataset = this.props.itemData;
    } else {
      dataset = this.props.monsterData;
    }

    console.log("BEFORE FILTERS", dataset.length)

    // Filter based on location if applicable
    if (filters.location) {
        dataset = dataset.filter(function (datum) {
            return datum.location.toLowerCase().includes(filters.location);
        });
    }

    // Filter based on name
    if (filters.name) {
        dataset = dataset.filter(function (datum) {
            return datum.name.toLowerCase().includes(filters.name);
        });
    }

    // Filter Items based on Rare item flag
    if (filters.itemFlag && filters.condItem !== undefined) {
        let condItemFlag = (filters.condItem === 'Yes');
        dataset = dataset.filter(function (datum) {
            return datum.conditional === condItemFlag;
        });
    }

    // Filter Items based on Monster Source
    if (filters.itemFlag && filters.monsterSourceName && filters.monsterSourceName !== undefined) {
        dataset = dataset.filter(function (datum) {
            if (datum.monster_source != null) {
                return datum.monster_source.toLowerCase().includes(filters.monsterSourceName);
            }
            return false;
        });
    }

    // Filter Items based on gathering flags
    if (filters.itemFlag && (filters.chopFlag || filters.mineFlag || filters.takeFlag)) {
        const datasetChop = dataset.filter(function (datum) {
            return filters.chopFlag && datum.chop_flag
        });

        const datasetTake = dataset.filter(function (datum) {
            return filters.takeFlag && datum.take_flag
        });

        const datasetMine = dataset.filter(function (datum) {
            return filters.mineFlag && datum.mine_flag
        });

        const newDataset = [];
        dataset.forEach(function(value) {
            if (datasetChop.includes(value)) {
                newDataset.push(value)
            } else if (datasetTake.includes(value)) {
                newDataset.push(value)
            } else if (datasetMine.includes(value)) {
                newDataset.push(value)
            }
        });
        console.log(dataset.length)
        console.log(newDataset.length)
        dataset = newDataset;
    } 

    // Filter items based on min cost
    if (filters.itemFlag && filters.minCost) {
        dataset = dataset.filter(function (datum) {
            return parseInt(datum.price) >= parseInt(filters.minCost);
        });
    }

    // Filter items based on max cost
    if (filters.itemFlag && filters.maxCost) {
        dataset = dataset.filter(function (datum) {
            return parseInt(datum.price) <= parseInt(filters.maxCost);
        });
    }

    // Filter Monsters based on Monster Type
    if (!filters.itemFlag && filters.monsterType !== undefined) {
        dataset = dataset.filter(function(datum) {
            return datum.cat === filters.monsterType;
        });
    }

    // Filter Monsters based on drops
    if (!filters.itemFlag && filters.monsterItemDrop !== undefined) {
        dataset = dataset.filter(function(datum) {
            if (datum.drops === undefined) {
                return false
            } else {
                let result = false;
                Object.keys(datum.drops).forEach(function (dropKey) {
                    const dropName = datum.drops[dropKey].name.toLowerCase();
                    if (dropName.includes(filters.monsterItemDrop)) {
                        result = true;
                    }
                });
                return result;
            }
        });
    }

    // Filter Monsters based on weakness
    if (!filters.itemFlag && ![undefined, {}].includes(filters.dmgVulnerability)) {
        dataset = dataset.filter(function(datum) {
            let result = true;
            Object.keys(filters.dmgVulnerability).forEach(function (vulKey) {
                if (filters.dmgVulnerability[vulKey] === 'Weak') {
                    result = result && (datum.damageVul[vulKey] > 100)
                } else if (filters.dmgVulnerability[vulKey] === 'Neu') {
                    result = result && (datum.damageVul[vulKey] === 100)
                } else if (filters.dmgVulnerability[vulKey] === 'Res') {
                    result = result && (datum.damageVul[vulKey] < 100)
                }
            })
            return result;
        });
    }

    // TODO: Do rest of stuff here

    // Reset active
    if (this.active && !dataset.includes(this.active)) {
        console.log("Active missing...")
        this.active = null;
    }

    console.log("AFTER FILTERS", dataset.length)
    return dataset
  }

  /**
   * Renders this React class
   * @return {div} Rendered dropdown button
   */
  render() {
    console.log("COMPENDIUM PROPS -->")
    console.log(this.props);

    const dataset = this.filterResults()
    const doot = []
    const updateFunc = this.setActive.bind(this);
    dataset.forEach(function (val) {
        doot.push(<p
            key={val.name + '|' + val.monster_source}
            onClick={() => updateFunc(val)}
            >
            <b>Name:</b> {val.name}
        </p>);
    });

    let infoPanel = null;
    if (this.props.filters.itemFlag) {
        infoPanel = <ItemInfoPanel
            active={this.active}
        >
        </ItemInfoPanel>
    } else {
        infoPanel = <MonsterInfoPanel
            active={this.active}
        >
        </MonsterInfoPanel>
    }

    return (
      <Container fluid={true} className="Compendium">
        <Row>
        <Col xs="3" className="selectList">
            I am Compendium Menu. Click me.
            {doot}
        </Col>
        {infoPanel}
        </Row>
      </Container>
    );
  }
}

export default Compendium;