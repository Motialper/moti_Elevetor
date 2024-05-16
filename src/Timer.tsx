class Timer {
    floor: number;
    remainingTime: number;
    timerElement: HTMLDivElement;

    constructor(floor: number, remainingTime: number) {
        this.floor = floor;
        this.remainingTime = remainingTime;
        this.timerElement = document.createElement('div');
        this.timerElement.id = `timer-${floor}`;
        this.timerElement.classList.add('timer');
        document.body.appendChild(this.timerElement);
    }

    startTimer(): void {
        const interval = setInterval(() => {
            if (this.remainingTime <= 0) {
                clearInterval(interval);
                this.timerElement.innerText = 'Elevator arrived';
            } else {
                this.timerElement.innerText = `Time remaining: ${this.remainingTime} seconds`;
                this.remainingTime--;
            }
        }, 1000);
    }
}


export {};