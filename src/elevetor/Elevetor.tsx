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

  // Assigns a controller to the elevator
  assignController(elevatorController: ElevatorController): void {
    this.elevatorController = elevatorController;
  }

//  Adds a stop request to the elevator's list of destinations
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

  // Processes the next destination in the queue.
  public async processNextDestination(): Promise<void> {
    // Ensure that the elevator starts moving immediately if there are destinations
    if (this.destinationFloors.length > 0 && !this.isBusy) {
      // Set the elevator as busy
      this.isBusy = true;
  
      const nextFloor = this.destinationFloors[0];
      
      if (this.destinationFloors.length > 0) {
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
      // Move the elevator to the next floor
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Update the current floor
      this.currentFloor = nextFloor;
      this.destinationFloors.shift(); 
      
      
      // Reset busy status
      this.isBusy = false;
      
      // Notify the controller of the state change
      this.elevatorController?.notifyElevatorStateChange();
      
      this.elevatorController?.handleNextRequest();
      
      // Process the next destination if there are still destinations
      this.processNextDestination();
    }
  }
  
 // Calculates the time required to reach a specific floor
 calculateTimeToFloor(floor: number): number {
  const timePerFloor = 1000; 
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
}