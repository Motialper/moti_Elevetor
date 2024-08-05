import { ElevatorController } from "../elevetor/ElevatorController";
import { FloorButton } from "./FloorButton";

export class Floor {
  private floorButton: FloorButton;
  private elevatorController: ElevatorController;

  constructor(public number: number, elevatorController: ElevatorController) {
    this.floorButton = new FloorButton(number);
    this.elevatorController = elevatorController;
  }

  callElevator(floorNumber: number) {
    try {
      this.elevatorController.requestStop(floorNumber);
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
