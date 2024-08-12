import React, { Component } from 'react';
import '../building/BuildingDisplay.css';
import { Elevator } from './Elevetor';
import { ElevatorController } from './ElevatorController';

// יבוא התמונה בצורה סטטית
import elevatorImage from '../assets/elv.png';

interface Props {
  elevators: Elevator[];
  elevatorController: ElevatorController;
}

interface State {
  elevators: Elevator[];
}

class ElevatorDisplay extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  
    this.state = {
      elevators: props.elevators
    };
  }

  componentDidMount() {
    this.props.elevatorController.setStateChangeCallback(this.handleStateChange);
  }

  componentWillUnmount() {
    this.props.elevatorController.setStateChangeCallback(() => {});
  }

  handleStateChange = () => {
    this.setState({ elevators: this.props.elevatorController.getElevators() });
  };

  render() {
    const { elevators } = this.state;

    return (
      <div className="elevator-container">
        {elevators.map((elevator, index) => (
          <div key={index} className="elevator-wrapper">
            <img
              id={`elevator-${index}`}
              className="elevator-img"
              src={elevatorImage}
              alt={`Elevator ${index}`}
              style={{ transform: `translateY(${elevator.currentFloor * -47}px)` }}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default ElevatorDisplay;
