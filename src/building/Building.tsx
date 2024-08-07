import { ElevatorController } from "../elevetor/ElevatorController";
import { Elevator } from "../elevetor/Elevetor";
import { Floor } from "../floor/Floor";

export class Building {
  numFloors: number;
  numElevators: number;
  floors: Floor[];
  elevators: Elevator[];
  elevatorController: ElevatorController;

  constructor(numFloors: number, numElevators: number) {
    this.numFloors = numFloors;
    this.numElevators = numElevators;

    // יצירת המעליות
    this.elevators = Array.from({ length: numElevators }, (_, i) => new Elevator(i, numFloors));

    // יצירת הבקר למעליות
    this.elevatorController = new ElevatorController( this.elevators);

    // עדכון כל מעלית עם הבקר
    this.elevators.forEach(elevator => elevator.setController(this.elevatorController));

    // יצירת הקומות
    this.floors = Array.from({ length: numFloors }, (_, i) => new Floor(i, this.elevatorController));
  }
}
