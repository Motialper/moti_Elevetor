import React, { Component } from 'react';
import '../building/BuildingDisplay.css';
import { Elevator } from './Elevetor';


interface Props {
  elevators: Elevator[];
}
// Displays the elevators within the building, including their current positions.

class ElevatorDisplay extends Component<Props> {

  // Moves an elevator to a specified floor
  moveElevatorToFloor(floor: number): void {
    const { elevators } = this.props;
    const elevator = elevators.find(e => e.currentFloor !== floor); 
    if (elevator) {
      elevator.requestStop(floor);
    }
    this.forceUpdate();
  }

  render() {
    const { elevators } = this.props;
    return (
      <div className="elevator-container">
        {elevators.map((elevator, index) => (
          <div key={index}>
            <span
              className="floor-number"
              onClick={() => this.moveElevatorToFloor(elevator.currentFloor)}
            >
              {elevator.currentFloor}
            </span>
            <img
              id={`elevator-${index}`}
              className="elevator-img"
              src={require('../assets/elv.png') }
              
              alt={`Elevator ${index}`}
              style={{ transform: `translateY(${elevator.currentFloor * -110}px)` }}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default ElevatorDisplay;
