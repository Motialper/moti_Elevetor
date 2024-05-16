import { Elevator } from "../elevetor/Elevetor";
import { Floor } from "../floor/Floor";

export class Building {
  numFloors: number;
  numElevators: number;
  floors: Floor[];
  elevators: Elevator[];

  constructor(numFloors: number, numElevators: number) {
    this.numFloors = numFloors;
    this.numElevators = numElevators;
    this.floors = Array.from({ length: numFloors }, (_, i) => new Floor(i));
    this.elevators = Array.from({ length: numElevators }, (_, i) => new Elevator(i, numFloors));
  }

  getNearestElevator(callingFloor: number): Elevator | null {
    let minTime = Infinity;
    let nearestElevator: Elevator | null = null;
    for (const elevator of this.elevators) {
      if (!elevator.isBusy) { // רק מעליות שאינן עסוקות נלקחות בחשבון
        let time = Math.abs(elevator.currentFloor - callingFloor);
        if (time < minTime) {
          minTime = time;
          nearestElevator = elevator;
        }
      }
    }
    return nearestElevator;
  }

  async requestElevator(floorNumber: number): Promise<void> {
    const nearestElevator = this.getNearestElevator(floorNumber);
    if (nearestElevator) {
      try {
        await nearestElevator.call(floorNumber);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log('No available elevators at the moment.');
    }
  }
}
