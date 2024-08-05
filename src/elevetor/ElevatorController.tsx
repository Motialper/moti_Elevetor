import { Building } from "../building/Building";
import { Elevator } from "./Elevetor";

interface ElevatorRequestService {
  requestStop(floorNumber: number): void;
}

export class ElevatorController implements ElevatorRequestService {
  private requestQueue: number[] = [];
  private stateChangeCallback: (() => void) | null = null;

  constructor(private building: Building, private elevators: Elevator[]) {}

  getElevators(): Elevator[] {
    return this.elevators;
  }

  requestStop(floorNumber: number) {
    const nearestElevator = this.getNearestElevator(floorNumber);
    if (nearestElevator) {
      nearestElevator.requestStop(floorNumber);
    } else {
      console.log('No available elevators at the moment. Adding to the queue.');
      this.requestQueue.push(floorNumber);
    }
  }

  getNearestElevator(callingFloor: number): Elevator | null {
    let minTime = Infinity;
    let nearestElevator: Elevator | null = null;
    for (const elevator of this.elevators) {
      if (!elevator.isBusy) {
        let time = Math.abs(elevator.currentFloor - callingFloor);
        if (time < minTime) {
          minTime = time;
          nearestElevator = elevator;
        }
      }
    }
    return nearestElevator;
  }

  handleNextRequest(): void {
    if (this.requestQueue.length > 0) {
      const nextRequest = this.requestQueue.shift();
      if (nextRequest !== undefined) {
        const nearestElevator = this.getNearestElevator(nextRequest);
        if (nearestElevator) {
          nearestElevator.requestStop(nextRequest);
        } else {
          this.requestQueue.push(nextRequest); 
        }
      }
    }
  }

  notifyElevatorStateChange() {
    if (this.stateChangeCallback) {
      this.stateChangeCallback();
    }
  }

  setStateChangeCallback(callback: () => void) {
    this.stateChangeCallback = callback;
  }
}
