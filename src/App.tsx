import React, { Component } from 'react';
import BuildingDisplay from './building/BuildingDisplay';
import { Building } from './building/Building';
import './App.css';
import BuildingFactory from './factoryClassass/BuildingFactory';

import buildingData from './config/buildingData.json';

class App extends Component {
  buildings: Building[];

  constructor(props: {}) {
    super(props);

    this.buildings = buildingData.map(data =>
      BuildingFactory.createBuilding(data.numOfFloor, data.numOfElevator)
    );
  }

  render() {
    return (
      <div className="App">
        <h1>Building Display</h1>
        <div className="buildings-container">
          {this.buildings.map((building, index) => (
            <BuildingDisplay key={index} building={building} />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
