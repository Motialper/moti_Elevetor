import React, { Component } from 'react';
import '../building/BuildingDisplay.css';
import { Elevator } from './Elevetor';
import { ElevatorController } from './ElevatorController';

interface Props {
  elevators: Elevator[];
  elevatorController: ElevatorController;
}

class ElevatorDisplay extends Component<Props> {
  constructor(props: Props) {
    super(props);
    props.elevatorController.setStateChangeCallback(() => {
      this.forceUpdate();
    });
  }

  render() {
    const { elevators } = this.props;
    return (
      <div className="elevator-container">
        {elevators.map((elevator, index) => (
          <div key={index}>
            <img
              id={`elevator-${index}`}
              className="elevator-img"
              src={require('../assets/elv.png')}
              alt={`Elevator ${index}`}
              style={{ transform: `translateY(${elevator.currentFloor * -110}px)` }}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default ElevatorDisplay;
