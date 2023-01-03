class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
  }

  start() {
    this.intervalId = setInterval(() => {
      const today = Date.now();
      const countdown = this.targetDate.getTime() - today;
      const time = this.getTimeComponents(countdown);

      if (countdown < 0) {
        clearInterval(this.intervalId);
      }
      
       this.updateClockface(time);
    }, 1000)    
  }

  getTimeComponents(time) {    
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24))) ;
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    
    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }

  updateClockface({ days, hours, mins, secs }) {
     const clock = document.querySelector(this.selector);
    
    clock.querySelector('[data-value=days]').innerHTML = days;
    clock.querySelector('[data-value=hours]').innerHTML = hours;
    clock.querySelector('[data-value=mins]').innerHTML = mins;
    clock.querySelector('[data-value=secs]').innerHTML = secs;
  }
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('May 16, 2023'),
});

timer.start();