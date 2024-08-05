import { ElevatorController } from "./ElevatorController";

export class Elevator {
  public currentFloor: number;
  public destinationFloors: number[];
  public isBusy: boolean;

  constructor(
    public number: number,
    public numFloors: number,
    private elevatorController: ElevatorController | null
  ) {
    this.currentFloor = 0;
    this.destinationFloors = [];
    this.isBusy = false;
  }

  setController(elevatorController: ElevatorController) {
    this.elevatorController = elevatorController;
  }


  requestStop(floor: number): void {
    if (floor < 0 || floor >= this.numFloors) {
      console.error(`Invalid floor request: Floor ${floor} is outside the building range.`);
      return;
    }
    if (!this.destinationFloors.includes(floor)) {
      this.destinationFloors.push(floor);
      if (!this.isBusy) {
        this.executeNextStep();
      }
    }
  }

  private async executeNextStep(): Promise<void> {
    if (this.destinationFloors.length > 0 && !this.isBusy) {
      this.isBusy = true;
      const nextFloor = this.destinationFloors[0];
      console.log(`Elevator ${this.number} is moving to floor ${nextFloor}`);
      await new Promise(resolve => setTimeout(resolve, 3000));
      this.currentFloor = nextFloor;
      console.log(`Elevator ${this.number} arrived at floor ${nextFloor}`);
      this.destinationFloors.shift();
      this.isBusy = false;
      this.elevatorController?.handleNextRequest();
      this.elevatorController?.notifyElevatorStateChange();
      this.executeNextStep();
    }
  }

  calculateTimeToFloor(floor: number): number {
    let totalTime = 0;
    let currentFloor = this.currentFloor;
  
    if (this.isBusy) {
      // Time to travel to all destination floors
      for (const dest of this.destinationFloors) {
        totalTime += Math.abs(dest - currentFloor) * 500; 
        currentFloor = dest; 
      }
    }

    return totalTime;
  }
  
}
