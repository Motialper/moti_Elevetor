import { ElevatorController } from "../elevetor/ElevatorController";
import { FloorButton } from "./FloorButton";

export class Floor {
  private floorButton: FloorButton;
  private elevatorController: ElevatorController;

  constructor(public number: number, elevatorController: ElevatorController) {
    this.floorButton = new FloorButton(number);
    this.elevatorController = elevatorController;
  }
  // Initiates a request for an elevator to come to this floor
  requestElevatorService(): void {
    try {
      if (!this.isElevatorOnFloor(this.number)) {
        this.elevatorController.callElevator(this.number);
      } else {
        console.log(`Elevator is already on floor ${this.number}`);
      }
    } catch (error) {
      console.error('Error calling elevator:', error);
    }
  }

  isElevatorOnFloor(floorNumber: number): boolean {
    try {
      for (const elevator of this.elevatorController.getElevators()) {
        if (elevator.currentFloor === floorNumber) {
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Error checking elevator status:', error);
      return false;
    }
  }
}
