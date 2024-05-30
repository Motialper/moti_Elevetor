import React, { Component } from 'react';
import BuildingDisplay from './building/BuildingDisplay';
import { Building } from './building/Building';
import './App.css';
import BuildingFactory from './factoryClassass/BuildingFactory';

class App extends Component {
  buildings: Building[];

  constructor(props: {}) {
    super(props);
    this.buildings = [
      BuildingFactory.createBuilding(15, 3),
      BuildingFactory.createBuilding(5, 3),
      BuildingFactory.createBuilding(5, 3),
      BuildingFactory.createBuilding(5, 3),
    ];
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
