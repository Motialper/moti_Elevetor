import React, { Component } from 'react';
import eleImg from '../assets/elv.png';
import '../building/BuildingDisplay.css';
import { Elevator } from './Elevetor'; // וודא שהקובץ והמחלקה Elevator מיובאים כאן

interface Props {
  elevators: Elevator[];
}

class ElevatorDisplay extends Component<Props> {
  
  moveElevatorToFloor(floor: number): void {
    const { elevators } = this.props;
    const elevator = elevators[floor]; 
    elevator.moveToFloor(floor);
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
              src={eleImg}
              alt={`Elevator ${index}`}
              style={{ top: `${elevator.currentFloor * 47}px` }}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default ElevatorDisplay;
