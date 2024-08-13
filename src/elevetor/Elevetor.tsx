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
    if (this.destinationFloors.length > 0) {
      // Set the elevator as busy
      this.isBusy = true;
  
      // Get the next floor
      const nextFloor = this.destinationFloors[0];
      const timeToMove = Math.abs(nextFloor - this.currentFloor) * 2000; 
      
      // Move the elevator to the next floor
      await new Promise(resolve => setTimeout(resolve, timeToMove));
      
      // Update the current floor
      this.currentFloor = nextFloor;
      this.destinationFloors.shift(); // Remove the current destination from the list
      
      // Wait at the floor if there are more floors in the destination list
      if (this.destinationFloors.length > 0) {
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
      
      // Reset busy status
      this.isBusy = false;
      
      // Notify the controller of the state change
      this.elevatorController?.notifyElevatorStateChange();
      
      // Handle the next request in the queue
      this.elevatorController?.handleNextRequest();
      
      // Process the next destination if there are still destinations
      this.processNextDestination();
    }
  }
  
 // Calculates the time required to reach a specific floor
calculateTimeToFloor(floor: number): number {
  const timePerFloor = 2000; // Time to move per floor in milliseconds

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
