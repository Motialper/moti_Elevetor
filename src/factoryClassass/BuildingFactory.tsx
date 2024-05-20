import { Building } from "../building/Building";

 class BuildingFactory {
    static createBuilding(numFloors: number, numElevators: number): Building {
        return new Building(numFloors, numElevators);
    }
}

export default BuildingFactory;
