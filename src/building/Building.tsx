
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

    // תחילה ניצור את המעליות ללא ElevatorController
    this.elevators = Array.from({ length: numElevators }, (_, i) => new Elevator(i, numFloors, null));

    // ניצור את ElevatorController עם המעליות שיצרנו
    this.elevatorController = new ElevatorController(this, this.elevators);

    // נעדכן את המעליות עם ElevatorController הנכון
    this.elevators.forEach(elevator => elevator.setController(this.elevatorController));

    // ניצור את הקומות עם ElevatorController הנכון
    this.floors = Array.from({ length: numFloors }, (_, i) => new Floor(i, this.elevatorController));
  }
}
