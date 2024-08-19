import React, { Component } from 'react';
import '../building/BuildingDisplay.css';
import { Floor } from './Floor';
import { Elevator } from '../elevetor/Elevetor';
import { ElevatorController } from '../elevetor/ElevatorController';
import TimerDisplay from '../timer/TimerDisplay';

interface Props {
  floors: Floor[];
  elevators: Elevator[];
  callElevator: (floorNumber: number) => void;
  elevatorController: ElevatorController;
}

interface State {
  activeFloors: { floorNumber: number; timerEnd: Date }[];
}

class FloorDisplay extends Component<Props, State> {
  private timers: { [key: number]: NodeJS.Timeout } = {};

  state: State = {
    activeFloors: [],
  };

  // 
  handleCallElevator = (floorNumber: number) => {
    const { elevatorController } = this.props;
    const nearestElevator = elevatorController.findNearestAvailableElevator(floorNumber);

    if (nearestElevator) {
      const timeToArrival = nearestElevator.calculateTimeToFloor(floorNumber);

      // Call the elevator immediately
      elevatorController.callElevator(floorNumber);

      const timerEnd = new Date();
      timerEnd.setMilliseconds(timerEnd.getMilliseconds() + timeToArrival);

      // Update state to show the timer
      this.setState((prevState) => ({
        activeFloors: [...prevState.activeFloors, { floorNumber, timerEnd }],
      }));

      // Remove the floor from the active list after the timer expires
      const timeoutId = setTimeout(() => {
        this.setState((prevState) => ({
          activeFloors: prevState.activeFloors.filter((floor) => floor.floorNumber !== floorNumber),
        }));
      }, timeToArrival);

      this.timers[floorNumber] = timeoutId;
    } else {
      console.warn('No available elevator');
    }
  };

  componentWillUnmount() {
    // Clean up all timeouts when component unmounts
    Object.values(this.timers).forEach(clearTimeout);
  }

  render() {
    const { floors } = this.props;
    const { activeFloors } = this.state;

    return (
      <div className="metal">
        {floors.map((floor, index) => (
          <div key={index} className="floor">
            <button
              className={`floor-number ${activeFloors.some((f) => f.floorNumber === floor.number) ? 'active' : ''}`}
              onClick={() => this.handleCallElevator(floor.number)}
            >
              {floor.number}
            </button>
            <div className="timer-container">
              {activeFloors.some((f) => f.floorNumber === floor.number) && (
                <TimerDisplay expiryTimestamp={activeFloors.find((f) => f.floorNumber === floor.number)?.timerEnd!} />
              )}
            </div>
            <div className="floor-divider"></div>
          </div>
        ))}
      </div>
    );
  }
}

export default FloorDisplay;
