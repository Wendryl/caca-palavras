export class Timer {
  /**
   * @param {number} amount
   */
  constructor(amount) {
    this.amount = amount;
    this.x = 30;
    this.y = 30;
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  render(ctx) {
    ctx.fillText(this.amount.toString(), this.x, this.y);
  }
}
