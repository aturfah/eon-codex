import React, {Component} from 'react';
import './Compendium.css';

/**
 * Dropdown element for class selection
 */
class Compendium extends Component {
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
        console.log('MIN COST', filters.minCost)
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

    // TODO: Do rest of stuff here

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
    dataset.forEach(function (val) {
        doot.push(<p key={val.name + '|' + val.monster_source}>Name: {val.name}</p>)
    });

    return (
      <div className="Compendium">
        I am Compendium. Fear me.
        {doot}
      </div>
    );
  }
}

export default Compendium;