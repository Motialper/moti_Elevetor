import React, { Component, ReactNode } from 'react';

import ElevatorDisplay from '../elevetor/ElevatorDisplay';
import { Building } from './Building';
import FloorDisplay from '../floor/FloorDisplay';

interface Props {
  building: Building;
}
class BuildingDisplay extends Component<Props> {
  callElevator = (floorNumber: number) => {
    const nearestElevator = this.props.building.getNearestElevator(floorNumber);
    if (nearestElevator) {
      nearestElevator.call(floorNumber);
    } else {
      console.log('No available elevators at the moment.');
    }
    this.forceUpdate(); // Trigger re-render to update elevator positions
  };

  render(): ReactNode {
    const { floors, elevators } = this.props.building;
    return (
      <div className="building-container">
        <FloorDisplay floors={floors} callElevator={this.callElevator} />
        <ElevatorDisplay elevators={elevators} />
      </div>
    );
  }
}

export default BuildingDisplay;
