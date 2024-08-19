import React, { useCallback } from 'react';
import '../building/BuildingDisplay.css';
import { Building } from '../building/Building';
import FloorDisplay from '../floor/FloorDisplay';
import ElevatorDisplay from '../elevetor/ElevatorDisplay';

interface Props {
  building: Building;
}

const BuildingDisplay: React.FC<Props> = ({ building }) => {
  // Handles the call to request an elevator to a specific floor
  const handleElevatorCall = useCallback((floorNumber: number) => {
    const floor = building.floors.find(f => f.number === floorNumber);
    if (floor) {
      floor.requestElevatorService();
    }
  }, [building]);

  return (
    <div className="building-container">
      <FloorDisplay
        floors={building.floors}
        callElevator={handleElevatorCall}
        elevators={building.elevators}
        elevatorController={building.elevatorController}
      />
      <ElevatorDisplay
        elevators={building.elevators}
        elevatorController={building.elevatorController}
      />
    </div>
  );
};

export default BuildingDisplay;
