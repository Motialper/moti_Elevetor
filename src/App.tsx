import React, { Component } from 'react';
import BuildingDisplay from './building/BuildingDisplay';
import BuildingFactory from './factoryClassass/BuildingFactory';
import { Building } from './building/Building';
import './App.css'; // ודא שאתה מייבא את קובץ ה-CSS

class App extends Component {
  building1: Building;
  building2: Building;

  constructor(props: {}) {
    super(props);
    this.building1 = BuildingFactory.createBuilding(15, 3); 
    this.building2 = BuildingFactory.createBuilding(5, 3); 
  }

  render() {
    return (
      <div className="App">
        <h1>Building Display</h1>
        <div className="buildings-container">
          <BuildingDisplay building={this.building1} />
          <BuildingDisplay building={this.building2} />
        </div>
      </div>
    );
  }
}

export default App;
