import { Building } from "../building/Building";

// Represents a floor within a building
export class Floor {
    number: number;

    constructor(number: number) {
        this.number = number;
    }

    // Plays the arrival sound when an elevator arrives at the floor.
    playArrivalSound() {
        try {
            const audio = new Audio(require('../assets/ding.mp3'));
            setTimeout(() => {
                audio.play();
                console.log('ping', audio);
            }, 2000); 
        } catch (error) {
            console.error('Error playing arrival sound:', error);
        }
    }

    callElevator(floorNumber: number, building: Building) {
        try {
            const nearestElevator = building.getNearestElevator(floorNumber); // Call the method using the instance
            if (nearestElevator === null) {
                console.log('No available elevators at the moment.');
            } else if (this.isElevatorOnFloor(floorNumber, building)) {
                console.log(`An elevator is already present on floor ${floorNumber}.`);
            } else {
                nearestElevator.requestStop(floorNumber);
                console.log(`Elevator ${nearestElevator.number} called to floor ${floorNumber}`);
                this.playArrivalSound(); 
            }
        } catch (error) {
            console.error('Error calling elevator:', error);
        }
    }
    // Checks if an elevator is currently present on the specified floor
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
