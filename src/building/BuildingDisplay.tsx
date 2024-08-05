import React, { Component, ReactNode } from 'react';
import '../building/BuildingDisplay.css';
import { Building } from '../building/Building';
import FloorDisplay from '../floor/FloorDisplay';
import ElevatorDisplay from '../elevetor/ElevatorDisplay';


interface Props {
  building: Building;
}

interface State {
  currentCall: { floorNumber: number, building: Building } | null;
}

class BuildingDisplay extends Component<Props, State> {
  state: State = { currentCall: null };

  callElevator = (floorNumber: number) => {
    const { building } = this.props;
    const floor = building.floors.find(f => f.number === floorNumber);
    if (floor) {
      this.setState({ currentCall: { floorNumber, building } });
      floor.callElevator(floorNumber);
    }
  };

  render(): ReactNode {
    const { floors, elevators, elevatorController } = this.props.building;
    return (
      <div className="building-container">
        <FloorDisplay
          floors={floors}
          callElevator={this.callElevator}
          elevators={elevators}
          elevatorController={elevatorController}
        />
        <ElevatorDisplay elevators={elevators} elevatorController={elevatorController} />
      </div>
    );
  }
}

export default BuildingDisplay;
