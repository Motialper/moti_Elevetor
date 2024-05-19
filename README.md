Elevator Control System
Introduction
This document describes the design of a software system for controlling elevators in a building. The system manages elevator movements, handles floor requests, and provides a user interface for interacting with the elevators.

Classes
Elevator
Represents a single elevator in the building.

Properties:

number: The identifier number of the elevator.
currentFloor: The current floor where the elevator is located.
destinationFloors: An array of floor numbers representing the destinations of the elevator.
numFloors: The total number of floors in the building.
isBusy: Indicates whether the elevator is currently busy with a task.
Methods:

constructor: Initializes the elevator with default properties.
call: Adds a floor request to the elevator's destination floors if the elevator is available.
moveToFloor: Moves the elevator to a specified floor.
processDestinationQueue: Handles the movement of the elevator between destination floors.
getNextFloor: Returns the next floor in the destination queue.
Building
Represents the entire building structure and manages floors and elevators.

Properties:

numFloors: The total number of floors in the building.
numElevators: The total number of elevators in the building.
floors: An array of Floor objects representing the floors in the building.
elevators: An array of Elevator objects representing the elevators in the building.
Methods:

constructor: Initializes the building with a specified number of floors and elevators.
getNearestElevator: Finds the nearest available elevator to a specified floor.
requestElevator: Initiates the process of requesting an elevator from a specified floor.
Floor
Represents a single floor in the building.

Properties:

number: The floor number.
Methods:

constructor: Initializes the floor with a floor number.
playArrivalSound: Plays an arrival sound when an elevator arrives at the floor.
callElevator: Initiates the process of calling an elevator from the floor.
isElevatorOnFloor: Checks if an elevator is already present on the floor.
BuildingDisplay
A React component for displaying the building layout.

ElevatorDisplay
A React component for displaying elevators within the building.

FloorDisplay
A React component for displaying floors within the building and allowing users to call elevators.

System Functionality
Users can request elevators from different floors using the interface provided by the FloorDisplay component.
The Building class manages the elevator system and handles elevator requests efficiently.
Elevators move between floors to fulfill requests, and users are notified of elevator arrivals through visual and auditory cues.
