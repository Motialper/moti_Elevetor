import React, { Component, ReactNode } from 'react';
import { Floor } from './Floor';
import '../building/BuildingDisplay.css';
import { Elevator } from '../elevetor/Elevetor';

interface Props {
  floors: Floor[];
  callElevator: (floorNumber: number) => void;
  elevators: Elevator[];
}

interface State {
  activeFloor: number | null;
  countdown: { [key: number]: number };
}

// Displays the floors within the building and allows users to call elevators from each floor.
class FloorDisplay extends Component<Props, State> {
  state: State = {
    activeFloor: null,
    countdown: {},
  };

  // Handles the elevator call request from a specific floor
  handleCallElevator = (floorNumber: number) => {
    const { callElevator, elevators } = this.props;
    const closestElevator = elevators.reduce((prev, curr) =>
      Math.abs(curr.currentFloor - floorNumber) < Math.abs(prev.currentFloor - floorNumber) ? curr : prev
    );
    const timeToArrival = Math.abs(closestElevator.currentFloor - floorNumber) * 0.7;
    let countdown = Math.ceil(timeToArrival);
    this.setState(prevState => ({
      activeFloor: floorNumber,
      countdown: { ...prevState.countdown, [floorNumber]: countdown }
    }));

    callElevator(floorNumber);
    const intervalId = setInterval(() => {
      this.setState(prevState => {
        const newCountdown = { ...prevState.countdown, [floorNumber]: prevState.countdown[floorNumber] - 1 };
        return { countdown: newCountdown };
      });
      countdown--;

      if (countdown <= 0) {
        clearInterval(intervalId);
        this.setState(prevState => {
          const newCountdown = { ...prevState.countdown };
          delete newCountdown[floorNumber];
          return { activeFloor: null, countdown: newCountdown };
        });
      }
    }, 1000);
  };

  render(): ReactNode {
    const { floors } = this.props;
    const { activeFloor, countdown } = this.state;

    return (
      <div className="metal">
        {floors.map((floor, index) => (
          <div key={index} className="floor">
            <button
              className={`floor-number ${activeFloor === floor.number ? 'active' : ''}`}
              onClick={() => this.handleCallElevator(floor.number)}
            >
              {floor.number}
              {activeFloor === floor.number && countdown[floor.number] !== undefined ? ` (${countdown[floor.number]})` : ''}
            </button>
            <div className="floor-divider"></div>
          </div>
        ))}
        <div className="floor-divider"></div>
      </div>
    );
  }
}

export default FloorDisplay;
