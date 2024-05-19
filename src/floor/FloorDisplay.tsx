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
