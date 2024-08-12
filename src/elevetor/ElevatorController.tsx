import { Elevator } from './Elevetor';

export class ElevatorController {
  private elevators: Elevator[];
  private requestQueue: number[] = [];
  private stateChangeCallback: (() => void) | null = null;

  constructor(elevators: Elevator[]) {
    this.elevators = elevators;
    this.elevators.forEach(elevator => elevator.assignController(this));
  }

  callElevator(floorNumber: number): void {
    if (this.elevators.some(elevator => elevator.destinationFloors.includes(floorNumber))) {
      console.log(`Elevator is already moving to floor ${floorNumber}`);
      return;
    }
    
    const availableElevator = this.findNearestAvailableElevator(floorNumber);
    if (availableElevator) {
      console.log(`Dispatching elevator ${availableElevator.number} to floor ${floorNumber}`);
      availableElevator.addStopRequest(floorNumber);
    } else {
      console.log(`No available elevator for floor ${floorNumber}. Adding to queue.`);
      this.requestQueue.push(floorNumber);
    }
  }

  public findNearestAvailableElevator(floorNumber: number): Elevator | null {
    let nearestElevator: Elevator | null = null;
    let minTime = Infinity;

    for (const elevator of this.elevators) {
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
// Notifies the system when an elevator's state changes
  notifyElevatorStateChange(): void {
    if (this.stateChangeCallback) {
      console.log("State change callback invoked");
      this.stateChangeCallback();
    }
  }

  //  Handles the next elevator request in the queue
  handleNextRequest(): void {
    if (this.requestQueue.length > 0) {
      const nextRequest = this.requestQueue.shift();
      if (nextRequest !== undefined) {
        console.log(`Handling next request for floor ${nextRequest}`);
        const nearestElevator = this.findNearestAvailableElevator(nextRequest);
        if (nearestElevator) {
          nearestElevator.addStopRequest(nextRequest);
        } else {
          this.requestQueue.push(nextRequest);
        }
      }
    }
  }

  setStateChangeCallback(callback: () => void): void {
    this.stateChangeCallback = callback;
  }

  getElevators(): Elevator[] {
    return this.elevators;
  }
}
