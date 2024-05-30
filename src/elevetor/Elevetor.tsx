import { ElevatorController } from "./ElevatorController";

export class Elevator {
  constructor(public number: number, public numFloors: number, private elevatorController: ElevatorController | null) {
    this.currentFloor = 0;
    this.destinationFloors = [];
    this.isBusy = false;
  }

  currentFloor: number;
  destinationFloors: number[];
  isBusy: boolean;

  setController(elevatorController: ElevatorController) {
    this.elevatorController = elevatorController;
  }

  requestStop(floor: number): void {
    if (floor < 0 || floor >= this.numFloors) {
      console.error(`Invalid floor request: Floor ${floor} is outside the building range.`);
      return;
    }
    if (!this.destinationFloors.includes(floor)) {
      this.destinationFloors.push(floor);
      if (!this.isBusy) {
        this.executeNextStep();
      }
    }
  }

  private moveToFloor(floor: number): void {
    this.currentFloor = floor;
  }

  private async executeNextStep(): Promise<void> {
    if (this.destinationFloors.length > 0 && !this.isBusy) {
      this.isBusy = true;
      const nextFloor = this.destinationFloors[0];
      const travelTime = Math.abs(nextFloor - this.currentFloor)  ;  // Calculate travel time based on floors
      console.log(`Elevator ${this.number} is moving to floor ${nextFloor}`);
      await new Promise(resolve => setTimeout(resolve, 3000));  // Simulate the time it takes to move to the next floor
      this.moveToFloor(nextFloor);
      console.log(`Elevator ${this.number} arrived at floor ${nextFloor}`);
      this.destinationFloors.shift();
      this.isBusy = false;
      this.elevatorController?.handleNextRequest();  // Notify the controller that the elevator is free
      this.elevatorController?.notifyElevatorStateChange();  // Notify state change for rendering update
      this.executeNextStep();
    }
  }

  calculateTimeToFloor(floor: number): number {
    if (this.isBusy) {
      let time = 0;
      let currentFloor = this.currentFloor ;
      for (const dest of this.destinationFloors) {
        time += Math.abs(dest - currentFloor) * 770; // Assuming each floor takes 2000ms to travel
        currentFloor = dest;
      }
      time += Math.abs(floor - currentFloor)* 770; ;
      return time;
    } else {
      return Math.abs(this.currentFloor - floor) * 770; // Assuming each floor takes 2000ms to travel
    }
  }
}
