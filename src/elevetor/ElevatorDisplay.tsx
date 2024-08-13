import React, { Component } from 'react';
import '../building/BuildingDisplay.css';
import { Elevator } from './Elevetor';
import { ElevatorController } from './ElevatorController';

// Import static image
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

 
  //  * Sets up the state change callback when the component mounts.
  componentDidMount() {
    this.props.elevatorController.setStateChangeCallback(this.handleStateChange);
  }

  // Cleans up the state change callback when the component unmounts
  componentWillUnmount() {
    this.props.elevatorController.setStateChangeCallback(() => {});
  }

//  Handles state changes from the elevator controller
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
