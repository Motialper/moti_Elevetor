import { Floor } from '../floor/Floor';
import { Elevator } from './Elevetor';

export class ElevatorController {
  private elevators: Elevator[];
  private requestQueue: number[] = [];
  private stateChangeCallback: (() => void) | null = null;
  private floors: Floor[];

  constructor(elevators: Elevator[], floors: Floor[]) {
    this.elevators = elevators;
    this.floors = floors;
    this.elevators.forEach(elevator => elevator.assignController(this));
  }

// Calls an elevator to a specific floor.
callElevator(floorNumber: number): Elevator | void {
  if (this.elevators.some(elevator => elevator.destinationFloors.includes(floorNumber))) {
    return;
  }

  const availableElevator = this.findNearestAvailableElevator(floorNumber);
  if (availableElevator) {
    availableElevator.addStopRequest(floorNumber);
    
    if (!availableElevator.isBusy) {
      availableElevator.processNextDestination();
    }
    
    return availableElevator; 
  }

  this.requestQueue.push(floorNumber);
}


getFloorByNumber(floorNumber: number): Floor {
  return this.floors.find(floor => floor.number === floorNumber)!;
}


  // Finds the nearest available elevator to a specific floor
  public findNearestAvailableElevator(floorNumber: number): Elevator | null {
    let nearestElevator: Elevator | null = null;
    let minTime = Infinity;

    for (const elevator of this.elevators) {
      // Calculate the time to the current destination if busy
      const timeToCurrentDestination = elevator.isBusy ? elevator.calculateTimeToFloor(elevator.destinationFloors[0]) : 0;
     
      const timeToFloor = elevator.calculateTimeToFloor(floorNumber);
      const totalTime = timeToCurrentDestination + timeToFloor;

      if (totalTime < minTime) {
        minTime = totalTime;
        nearestElevator = elevator;
      }
    }

    return nearestElevator;
  }

//  Notifies the system when an elevator's state change
  notifyElevatorStateChange(): void {
    if (this.stateChangeCallback) {
      this.stateChangeCallback();
    }
  }

  // Handles the next elevator request in the queue.
  handleNextRequest(): void {
    if (this.requestQueue.length > 0) {
      const nextRequest = this.requestQueue.shift();
      if (nextRequest !== undefined) {
        console.log(`Handling next request for floor ${nextRequest}`);
        const nearestElevator = this.findNearestAvailableElevator(nextRequest);
        if (nearestElevator) {
          nearestElevator.addStopRequest(nextRequest);
        } else {
          // Re-add request to the queue if no elevator is available
          this.requestQueue.push(nextRequest);
        }
      }
    }
  }

  // Sets a callback function to be called when the state changes
  setStateChangeCallback(callback: () => void): void {
    this.stateChangeCallback = callback;
  }

  // /Gets the list of elevators managed by this controller
  getElevators(): Elevator[] {
    return this.elevators;
  }
}
