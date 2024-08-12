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
  this.elevators = this.createElevators(numElevators, numFloors);
  this.elevatorController = new ElevatorController(this.elevators);
  this.floors = this.createFloors(numFloors, this.elevatorController);
}

private createElevators(numElevators: number, numFloors: number): Elevator[] {
  return Array.from({ length: numElevators }, (_, i) => new Elevator(i, numFloors));
}

private createFloors(numFloors: number, elevatorController: ElevatorController): Floor[] {
  return Array.from({ length: numFloors }, (_, i) => new Floor(i, elevatorController));
}

}
