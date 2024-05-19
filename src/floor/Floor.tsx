import { Building } from "../building/Building";

export class Floor {
    number: number;

    constructor(number: number) {
        this.number = number;
    }

    playArrivalSound() {
        try {
            const audio = new Audio('./assets/ding.mp3');
            audio.play();
            console.log('ping', audio)
        } catch (error) {
            console.error('Error playing arrival sound:', error);
        }
    }

    callElevator(floorNumber: number, building: Building) {
        try {
            const nearestElevator = building.getNearestElevator(floorNumber); 
            if (nearestElevator === null) {
                console.log('No available elevators at the moment.');
            } else if (this.isElevatorOnFloor(floorNumber, building)) {
                console.log(`An elevator is already present on floor ${floorNumber}.`);
            } else {
                nearestElevator.call(floorNumber);
                console.log(`Elevator ${nearestElevator.number} called to floor ${floorNumber}`);
            }
        } catch (error) {
            console.error('Error calling elevator:', error);
        }
        console.log("aannaa")
    }

    isElevatorOnFloor(floorNumber: number, building: Building): boolean {
        try {
            for (const elevator of building.elevators) {
                if (elevator.currentFloor === floorNumber) {
                    return true;
                }
            }
            return false;
        } catch (error){
            console.error('Error checking elevator status:', error);
            return false;
        }
    }
}
