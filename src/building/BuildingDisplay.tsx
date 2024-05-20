import React, { Component, ReactNode } from 'react';
import '../building/BuildingDisplay.css';
import { Building } from './Building';
import FloorDisplay from '../floor/FloorDisplay';
import { Floor } from '../floor/Floor';
import ElevatorDisplay from '../elevetor/ElevatorDisplay';

interface Props {
  building: Building;
}
//  * Displays the building layout including floors and elevators.

class BuildingDisplay extends Component<Props> {
  // Calls an elevator from a specified floor.

  callElevator = (floorNumber: number) => {
    const { building } = this.props;
    const floorInstance = new Floor(floorNumber); 
    floorInstance.callElevator(floorNumber, building); 
    this.forceUpdate(); 
  };
  
  render(): ReactNode {
    const { floors, elevators } = this.props.building;
    return (
      <div className="building-container">
        <FloorDisplay floors={floors} callElevator={this.callElevator} elevators={elevators}/>
        <ElevatorDisplay elevators={elevators} />
      </div>
    );
  }
}

export default BuildingDisplay;
