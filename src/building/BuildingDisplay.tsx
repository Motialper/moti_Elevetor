import React, { Component, ReactNode } from 'react';
import '../building/BuildingDisplay.css';
import { Building } from '../building/Building';
import FloorDisplay from '../floor/FloorDisplay';
import ElevatorDisplay from '../elevetor/ElevatorDisplay';

interface Props {
  building: Building;
}

class BuildingDisplay extends Component<Props> {

  // Calls an elevator to a specific floor
  handleElevatorCall = (floorNumber: number) => {
    const { building } = this.props;
    const floor = building.floors.find(f => f.number === floorNumber);
    if (floor) {
      floor.requestElevatorService();
    }
  };

  render(): ReactNode {
    const { floors, elevators, elevatorController } = this.props.building;
    return (
      <div className="building-container">
        <FloorDisplay
          floors={floors}
          callElevator={this.handleElevatorCall} // להעביר את הפונקציה לתוך FloorDisplay
          elevators={elevators}
          elevatorController={elevatorController}
        />
        <ElevatorDisplay elevators={elevators} elevatorController={elevatorController} />
      </div>
    );
  }
}

export default BuildingDisplay;
