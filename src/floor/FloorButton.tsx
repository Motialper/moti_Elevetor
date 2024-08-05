export class FloorButton {
    constructor(private floorNumber: number) {}
  
    playArrivalSound() {
      try {
        const audio = new Audio(require('../assets/ding.mp3'));
        audio.play();
        audio.onended = () => console.log('Arrival sound played for floor', this.floorNumber);
      } catch (error) {
        console.error('Error playing arrival sound:', error);
        // Handle error here (e.g., display message to user, provide fallback sound)
      }
    }
  }
  