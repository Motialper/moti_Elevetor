import React, { Component } from 'react';
import { useTimer } from 'react-timer-hook';
import '../building/BuildingDisplay.css';
import { Floor } from './Floor';
import { Elevator } from '../elevetor/Elevetor';
import { ElevatorController } from '../elevetor/ElevatorController';

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
  state: State = {
    activeFloors: [],
  };

  // Handles the request to call an elevator to a specified floor
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
      setTimeout(() => {
        this.setState((prevState) => ({
          activeFloors: prevState.activeFloors.filter((floor) => floor.floorNumber !== floorNumber),
        }));
      }, timeToArrival);
    } else {
      console.warn('No available elevator');
    }
  };

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
                <Timer expiryTimestamp={activeFloors.find((f) => f.floorNumber === floor.number)?.timerEnd!} />
              )}
            </div>
            <div className="floor-divider"></div>
          </div>
        ))}
      </div>
    );
  }
}

interface TimerProps {
  expiryTimestamp: Date;
}

// Timer component to show countdown
const Timer: React.FC<TimerProps> = ({ expiryTimestamp }) => {
  const { seconds, minutes, hours } = useTimer({ expiryTimestamp, onExpire: () => console.warn('Timer expired') });

  return (
    <div className="timer">
      {hours > 0 && <span>{hours.toString().padStart(2, '0')}:</span>}
      <span>{minutes.toString().padStart(2, '0')}:</span>
      <span>{seconds.toString().padStart(2, '0')}</span>
    </div>
  );
};

export default FloorDisplay;
