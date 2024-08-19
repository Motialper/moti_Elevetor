import { ElevatorController } from "./ElevatorController";

export class Elevator {
  public currentFloor: number;
  public destinationFloors: number[];
  public isBusy: boolean;
  private elevatorController: ElevatorController | null;
  private totalTimeOperated: number; // משתנה לתיעוד הזמן הכולל

  constructor(
    public number: number,
    public numFloors: number,
    elevatorController: ElevatorController | null = null
  ) {
    this.currentFloor = 0;
    this.destinationFloors = [];
    this.isBusy = false;
    this.elevatorController = elevatorController;
    this.totalTimeOperated = 0; // אתחול הזמן הכולל
  }
  // Assigns a controller to the elevator
  assignController(elevatorController: ElevatorController): void {
    this.elevatorController = elevatorController;
  }
  // Adds a stop request to the elevator's list of destinations
  addStopRequest(floor: number): void {
    if (floor < 0 || floor >= this.numFloors) {
      console.error(`Invalid floor request: Floor ${floor} is outside the building range.`);
      return;
    }
    if (!this.destinationFloors.includes(floor)) {
      this.destinationFloors.push(floor);
      if (!this.isBusy) {
        this.processNextDestination();
      }
    }
  }

  // Processes the next destination in the queue
  public async processNextDestination(): Promise<void> {
    if (this.destinationFloors.length > 0 && !this.isBusy) {
      this.isBusy = true;

      const nextFloor = this.destinationFloors[0];
      const timeBeforeMovement = Date.now(); // הזמן לפני תחילת התנועה

      if (this.destinationFloors.length > 0) {
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
      await new Promise(resolve => setTimeout(resolve, 3000));

      this.currentFloor = nextFloor;
      this.destinationFloors.shift();

      const timeAfterMovement = Date.now(); 
      this.totalTimeOperated += timeAfterMovement - timeBeforeMovement; 
      this.isBusy = false;

      this.elevatorController?.notifyElevatorStateChange();
      this.elevatorController?.handleNextRequest();
      this.processNextDestination();
    }
  }

  // Calculates the time required to reach a specific floor
  calculateTimeToFloor(floor: number): number {
    const floorHeightPx = 47; 
    const elevatorSpeedPxPerSecond = 47 / 1; 
    const timePerFloor = (floorHeightPx / elevatorSpeedPxPerSecond) * 1000;
    const stopTimePerFloor = 2000;
    let totalTime = 0;

    if (this.isBusy) {
      let currentFloor = this.currentFloor;

      for (const dest of this.destinationFloors) {
        totalTime += Math.abs(dest - currentFloor) * timePerFloor;
        currentFloor = dest;
        totalTime += stopTimePerFloor;
      }
      totalTime += Math.abs(floor - currentFloor) * timePerFloor;

      return totalTime;
    } else {
      return Math.abs(this.currentFloor - floor) * timePerFloor;
    }
  }

  getTotalTimeOperated(): number {
    return this.totalTimeOperated;
  }
}
