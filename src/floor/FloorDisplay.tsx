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
  activeFloors: { floorNumber: number; time: Date }[];
}

class FloorDisplay extends Component<Props, State> {
  state: State = {
    activeFloors: [],
  };

  handleCallElevator = (floorNumber: number) => {
    const { callElevator, elevators } = this.props;

    // מציאת המעלית הקרובה ביותר
    const closestElevator = elevators.reduce((prev, curr) => {
      const prevTime = prev.calculateTimeToFloor(floorNumber);
      const currTime = curr.calculateTimeToFloor(floorNumber);
      return prevTime < currTime ? prev : curr;
    });

    const timeToArrival = Math.ceil(closestElevator.calculateTimeToFloor(floorNumber) / 1000); // המרה לשניות
    const time = new Date();
    time.setSeconds(time.getSeconds() + timeToArrival);

    // התחלת תנועת המעלית מיד
    callElevator(floorNumber);

    this.setState(prevState => ({
      activeFloors: [...prevState.activeFloors, { floorNumber, time }],
    }));

    // עדכון הממשק הגרפי לאחר שהמעלית הגיעה
    setTimeout(() => {
      this.setState(prevState => ({
        activeFloors: prevState.activeFloors.filter(floor => floor.floorNumber !== floorNumber),
      }));
    }, timeToArrival * 1000);
  };

  render() {
    const { floors } = this.props;
    const { activeFloors } = this.state;

    return (
      <div className="metal">
        {floors.map((floor, index) => (
          <div key={index} className="floor">
            <button
              className={`floor-number ${activeFloors.some(f => f.floorNumber === floor.number) ? 'active' : ''}`}
              onClick={() => this.handleCallElevator(floor.number)}
            >
              {floor.number}
            </button>
            <div className="timer-container">
              {activeFloors.some(f => f.floorNumber === floor.number) && (
                <Timer expiryTimestamp={activeFloors.find(f => f.floorNumber === floor.number)?.time!} />
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
  const { seconds, minutes, hours, days } = useTimer({ expiryTimestamp, onExpire: () => console.warn('Timer expired') });

  return (
    <div>
      <div className='timer'>
        {days > 0 && <span>{days}:</span>}
        {hours > 0 && <span>{hours.toString().padStart(2, '0')}:</span>}
        <span>{minutes.toString().padStart(2, '0')}:</span>
        <span>{seconds.toString().padStart(2, '0')}</span>
      </div>
    </div>
  );
};

export default FloorDisplay;
