import React, { Component } from 'react';
import { useTimer } from 'react-timer-hook';
import '../building/BuildingDisplay.css';
import { Floor } from './Floor';
import { Elevator } from '../elevetor/Elevetor';
import { ElevatorController } from '../elevetor/ElevatorController';


interface Props {
  floors: Floor[];
  elevators: Elevator[];
  callElevator: (floorNumber: number) => void; // פונקציה בממשק Props
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
    const { elevatorController } = this.props;
    const nearestElevator = elevatorController.findNearestAvailableElevator(floorNumber);
    if (nearestElevator) {
      const timeToArrival = nearestElevator.calculateTimeToFloor(floorNumber);
      elevatorController.callElevator(floorNumber);
  
      const timerEnd = new Date();
      timerEnd.setMilliseconds(timerEnd.getMilliseconds() + timeToArrival); // חישוב הזמן הנכון במילישניות
  
      this.setState((prevState) => ({
        activeFloors: [...prevState.activeFloors, { floorNumber, timerEnd }],
      }));
  
      setTimeout(() => {
        this.setState((prevState) => ({
          activeFloors: prevState.activeFloors.filter((floor) => floor.floorNumber !== floorNumber),
        }));
      }, timeToArrival);
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
