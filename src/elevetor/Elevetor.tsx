
//  Represents an elevator within a building.

export class Elevator {
    number: number;
    currentFloor: number;
    destinationFloors: number[];
    numFloors: number;
    isBusy: boolean;

    constructor(number: number, numFloors: number) {
        this.number = number;
        this.currentFloor = 0;
        this.destinationFloors = [];
        this.numFloors = numFloors;
        this.isBusy = false;
    }

    // Calls the elevator to a specified floor.
    requestStop(floor: number): void {
        if (!this.destinationFloors.includes(floor) && !this.isBusy) {
            this.destinationFloors.push(floor);
            this.executeNextStep ();
        }
    }

    // Moves the elevator to a specified floor.
    moveToFloor(floor: number): void {
       this.currentFloor = floor; 
    }
    
    async executeNextStep (): Promise<void> {
        if (this.destinationFloors.length > 0 && !this.isBusy) {
            const nextFloor = this.getNextFloor();
            if (nextFloor === this.currentFloor) {
                console.log("Elevator is already at the destination floor.");
                this.destinationFloors.shift();
                return this.executeNextStep ();
            }
            this.isBusy = true; 
            this.moveToFloor(nextFloor);

            console.log(`Elevator ${this.number} arrived at floor ${nextFloor}`);
            
            await new Promise(resolve => setTimeout(resolve, 3000)); 
            this.destinationFloors.shift();
            this.isBusy = false; 
            this.executeNextStep ();
        }
    }

// Gets the next destination floor in the queue
    getNextFloor(): number {
        return this.destinationFloors[0];
    }
}
