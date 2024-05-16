import React, { Component, ReactNode } from 'react';
import '../building/BuildingDisplay.css';
import { Floor } from './Floor';

interface FloorProps {
  floor: Floor;
}

interface Props {
  floors: Floor[];
  callElevator: (floorNumber: number) => void;
}

class FloorDisplay extends Component<Props> {
  // playArrivalSound() {
   
  //     const audio = new Audio('../assets/ding.mp3');
  //     audio.play();
  //     console.log('ping', audio)
  // }

  render(): ReactNode {
    const { floors, callElevator } = this.props;

    if (floors.length === 0) {
      return <div>No floors available</div>;
    }

    return (
      <div className="metal">
        {floors.map((floor, index) => (
          <div key={index} className="floor">
            <button className="floor-number" onClick={() => {
              // this.playArrivalSound(); 
              callElevator(floor.number);
            }}>
              {floor.number}
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
