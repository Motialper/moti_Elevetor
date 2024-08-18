import { ElevatorController } from "../elevetor/ElevatorController";
import { Elevator } from "../elevetor/Elevetor";

export class Floor {
  public assignedElevator: Elevator | null = null;
  private elevatorController: ElevatorController;

  constructor(public number: number, elevatorController: ElevatorController) {
    this.elevatorController = elevatorController;
  }

  // Initiates a request for an elevator to come to this floor
  requestElevatorService(): void {
    try {
      if (!this.isElevatorOnFloor(this.number)) {
        const elevator = this.elevatorController.callElevator(this.number);
        if (elevator) {
          this.assignedElevator = elevator;
        }
      }
    } catch (error) {
      console.error('Error calling elevator:', error);
    }
  }

  // Checks if any elevator is currently on the specified floor
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
