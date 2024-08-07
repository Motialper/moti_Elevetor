import { Elevator } from './Elevetor';

export class ElevatorController {
  private elevators: Elevator[];
  private requestQueue: number[] = [];
  private stateChangeCallback: (() => void) | null = null;

  constructor(elevators: Elevator[]) {
    this.elevators = elevators;
    this.elevators.forEach(elevator => elevator.setController(this));
  }

  callElevator(floorNumber: number): void {
    if (this.elevators.some(elevator => elevator.destinationFloors.includes(floorNumber))) {
      console.log(`Elevator is already moving to floor ${floorNumber}`);
      return;
    }
    
    const availableElevator = this.findNearestAvailableElevator(floorNumber);
    if (availableElevator) {
      console.log(`Dispatching elevator ${availableElevator.number} to floor ${floorNumber}`);
      availableElevator.requestStop(floorNumber);
    } else {
      console.log(`No available elevator for floor ${floorNumber}. Adding to queue.`);
      this.requestQueue.push(floorNumber);
    }
  }

  public findNearestAvailableElevator(floorNumber: number): Elevator | null {
    let nearestElevator: Elevator | null = null;
    let minTime = Infinity;

    for (const elevator of this.elevators) {
      if (!elevator.isBusy || elevator.destinationFloors.includes(floorNumber)) {
        const timeToFloor = elevator.calculateTimeToFloor(floorNumber);
        if (timeToFloor < minTime) {
          minTime = timeToFloor;
          nearestElevator = elevator;
        }
      }
    }

    return nearestElevator;
  }

  notifyElevatorStateChange(): void {
    if (this.stateChangeCallback) {
      console.log("State change callback invoked");
      this.stateChangeCallback();
    }
  }

  handleNextRequest(): void {
    if (this.requestQueue.length > 0) {
      const nextRequest = this.requestQueue.shift();
      if (nextRequest !== undefined) {
        console.log(`Handling next request for floor ${nextRequest}`);
        const nearestElevator = this.findNearestAvailableElevator(nextRequest);
        if (nearestElevator) {
          nearestElevator.requestStop(nextRequest);
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
