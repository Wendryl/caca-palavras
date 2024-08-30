export class Timer {
  /**
   * @param {number} amount
   */
  constructor() {
    this.amount = 5;
    this.elementRef = document.querySelector('#timer');
    this.elementRef.innerHTML = this.amount;
    this.init();
  }

  init() {
    this.decrement();
    this.timeOutCallBack = setInterval(() => {
      this.decrement();
    }, 1000);
  }

  /**
   * @param {function} callback
   */
  subscribe(callback) {
    this.elementRef.addEventListener("timeup", callback);
  }

  decrement() {
    this.elementRef.innerText = this.amount;
    if (this.amount == 0) {

      const timeUpEvent = new Event("timeup", { bubbles: true, cancelable: false });
      this.elementRef.dispatchEvent(timeUpEvent);
      clearInterval(this.timeOutCallBack);
      return;
    };
    this.amount--;
  }
}
