import React, { Component } from 'react';
import { useTimer } from 'react-timer-hook';
import '../building/BuildingDisplay.css';
import { Floor } from './Floor';
import { Elevator } from '../elevetor/Elevetor';
import { ElevatorController } from '../elevetor/ElevatorController';

interface Props {
  floors: Floor[];
  callElevator: (floorNumber: number) => void;
  elevators: Elevator[];
  elevatorController: ElevatorController;
}

interface State {
  activeFloors: { floorNumber: number; timerEnd: Date }[];
}

class FloorDisplay extends Component<Props, State> {
  state: State = {
    activeFloors: [],
  };

  handleCallElevator = (floorNumber: number) => {
    const { callElevator, elevators } = this.props;
    if (this.isElevatorAlreadyOnFloor(floorNumber)) {
      console.log(`Elevator is already present or en route to floor ${floorNumber}`);
      return;
    }

    const closestElevator = this.findNearestElevator(floorNumber);
    const timeToArrival = this.calculateTravelTime(closestElevator, floorNumber);
    const timerEnd = new Date();
    timerEnd.setSeconds(timerEnd.getSeconds() + timeToArrival);

    callElevator(floorNumber);

    this.setState((prevState) => ({
      activeFloors: [...prevState.activeFloors, { floorNumber, timerEnd }],
    }));

    setTimeout(() => {
      this.setState((prevState) => ({
        activeFloors: prevState.activeFloors.filter((floor) => floor.floorNumber !== floorNumber),
      }));
    }, timeToArrival * 1000);
  };

  isElevatorAlreadyOnFloor = (floorNumber: number): boolean => {
    const { elevators } = this.props;
    return elevators.some(elevator => elevator.currentFloor === floorNumber || elevator.destinationFloors.includes(floorNumber));
  }

  findNearestElevator = (floorNumber: number): Elevator => {
    const { elevators } = this.props;
    let nearestElevator = elevators[0];
    let minTime = Infinity;

    for (const elevator of elevators) {
      const time = this.calculateTravelTime(elevator, floorNumber);
      if (time < minTime) {
        nearestElevator = elevator;
        minTime = time;
      }
    }

    return nearestElevator;
  };

  calculateTravelTime = (elevator: Elevator, floorNumber: number): number => {
    if (elevator.isBusy) {
      let time = elevator.destinationFloors.length
        ? elevator.calculateTimeToFloor(floorNumber)
        : Math.abs(elevator.currentFloor - floorNumber) * 2000;
      return time / 1000; // Convert to seconds
    } else {
      return Math.abs(elevator.currentFloor - floorNumber) * 1100 / 1000; // Convert to seconds
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
        <div className="floor-divider"></div>
      </div>
    );
  }
}

interface TimerProps {
  expiryTimestamp: Date;
}

const Timer: React.FC<TimerProps> = ({ expiryTimestamp }) => {
  const { seconds, minutes, hours } = useTimer({ expiryTimestamp, onExpire: () => console.warn('Timer expired') });

  return (
    <div>
      <div className="timer">
        {hours > 0 && <span>{hours.toString().padStart(2, '0')}:</span>}
        <span>{minutes.toString().padStart(2, '0')}:</span>
        <span>{seconds.toString().padStart(2, '0')}</span>
      </div>
    </div>
  );
};

export default FloorDisplay;
