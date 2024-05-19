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

    call(floor: number): void {
        if (!this.destinationFloors.includes(floor) && !this.isBusy) {
            this.destinationFloors.push(floor);
            this.moveLock();
        }
    }

    moveToFloor(floor: number): void {
        const elevatorElement = document.getElementById(`elevator-${this.number}`);
        if (elevatorElement) {
            const floorHeight = 110; 
            const translateY = floorHeight * (this.numFloors - floor);
            elevatorElement.style.setProperty('--elevator-translate-y', `${translateY}px`); 
            this.currentFloor = floor; 
        }
    }

    async moveLock(): Promise<void> {
        if (this.destinationFloors.length > 0 && !this.isBusy) {
            const nextFloor = this.getNextFloor();
            if (nextFloor === this.currentFloor) {
                console.log("Elevator is already at the destination floor.");
                this.destinationFloors.shift();
                return this.moveLock();
            }

            this.isBusy = true; 
            this.moveToFloor(nextFloor);

            console.log(`Elevator ${this.number} arrived at floor ${nextFloor}`);

            await new Promise(resolve => setTimeout(resolve, 3000)); 
            this.destinationFloors.shift();
            this.isBusy = false; 
            this.moveLock();
        }
    }

    getNextFloor(): number {
        return this.destinationFloors[0];
    }
}
