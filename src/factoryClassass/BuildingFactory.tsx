import { Building } from "../building/Building";

// Creates a new Building instance with the specified number of floors and elevators.
 class BuildingFactory {
    static createBuilding(numFloors: number, numElevators: number): Building {
        return new Building(numFloors, numElevators);
    }
}

export default BuildingFactory;
