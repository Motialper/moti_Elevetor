import { ElevatorController } from "./ElevatorController";

export class Elevator {
  public currentFloor: number;
  public destinationFloors: number[];
  public isBusy: boolean;
  private elevatorController: ElevatorController | null;

  constructor(
    public number: number,
    public numFloors: number,
    elevatorController: ElevatorController | null = null
  ) {
    this.currentFloor = 0;
    this.destinationFloors = [];
    this.isBusy = false;
    this.elevatorController = elevatorController;
  }

  assignController(elevatorController: ElevatorController) {
    this.elevatorController = elevatorController;
  }

  addStopRequest(floor: number): void {
    if (floor < 0 || floor >= this.numFloors) {
      console.error(`Invalid floor request: Floor ${floor} is outside the building range.`);
      return;
    }
    if (!this.destinationFloors.includes(floor)) {
      console.log(`Elevator ${this.number} received request to stop at floor ${floor}`);
      this.destinationFloors.push(floor);
      if (!this.isBusy) {
        this.processNextDestination();
      }
    }
  }

  private async processNextDestination(): Promise<void> {
    if (this.destinationFloors.length > 0 && !this.isBusy) {
      this.isBusy = true;
      const nextFloor = this.destinationFloors[0];
      const timeToMove = Math.abs(nextFloor - this.currentFloor) * 2000; 
      
      // Move the elevator to the next floor
      await new Promise(resolve => setTimeout(resolve, timeToMove));
      
      // Set the current floor to the next floor
      this.currentFloor = nextFloor;
      this.destinationFloors.shift();
      
      // Wait 3 seconds at the current floor if there are more floors to visit
      if (this.destinationFloors.length > 0) {
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
      
      this.isBusy = false;
      
      // Notify the controller of the state change and handle the next request
      this.elevatorController?.handleNextRequest();
      this.elevatorController?.notifyElevatorStateChange();
      
      // Process the next destination
      this.processNextDestination();
    }
  }
  

  calculateTimeToFloor(floor: number): number {
    const timePerFloor = 500; // Time to move per floor in milliseconds

    if (this.isBusy) {
      let time = 0;
      let currentFloor = this.currentFloor;

      for (const dest of this.destinationFloors) {
        time += Math.abs(dest - currentFloor) * timePerFloor;
        currentFloor = dest;
      }

      time += Math.abs(floor - currentFloor) * timePerFloor;
      return time;
    } else {
  
      return Math.abs(this.currentFloor - floor) * timePerFloor;
    }
  }
}
