export class Elevator {
    number: number;
    currentFloor: number;
    destinationFloors: number[];
    numFloors: number;
    isBusy: boolean; // מאפיין חדש שמציין אם המעלית עסוקה

    constructor(number: number, numFloors: number) {
        this.number = number;
        this.currentFloor = 1;
        this.destinationFloors = [];
        this.numFloors = numFloors;
        this.isBusy = false; // מאתחל את המאפיין כלא עסוק
    }

    call(floor: number): void {
        if (!this.destinationFloors.includes(floor)) {
            this.destinationFloors.push(floor);
            this.moveLock();
        }
    }

    moveToFloor(floor: number): void {
        const elevatorElement = document.getElementById(`elevator-${this.number}`);
        if (elevatorElement) {
            const floorHeight = 47;
            const topPosition = floorHeight * (this.numFloors - floor);
            elevatorElement.style.transition = `top 1s ease`;
            elevatorElement.style.top = `${topPosition}px`;
            this.currentFloor = floor; // נוסיף עדכון לקומה הנוכחית
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

            this.isBusy = true; // מסמן שהמעלית עסוקה
            this.currentFloor = nextFloor;
            this.moveToFloor(this.currentFloor);

            console.log(`Elevator ${this.number} arrived at floor ${this.currentFloor}`);

            await new Promise(resolve => setTimeout(resolve, 3000)); // ממתין 3 שניות

            this.destinationFloors.shift();
            this.isBusy = false; // מסמן שהמעלית שוב זמינה
            this.moveLock();
        }
    }

    getNextFloor(): number {
        return this.destinationFloors[0];
    }
}
