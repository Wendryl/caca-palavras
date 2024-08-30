export const BUBBLE_RADIUS = 30;

export class Bubble {
  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} x
   * @param {number} y
   * @param {string} word
   */
  constructor(word) {
    this.word = word;
    this.setRandomPosition();
  }

  setRandomPosition() {
    const randomX = Math.floor(Math.random() * innerWidth) + 30;
    const randomY = Math.floor(Math.random() * innerHeight) + 30;
    this.x = randomX;
    this.y = randomY;
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  render(ctx, highLight = false) {
    const radius = BUBBLE_RADIUS;
    ctx.beginPath();
    ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI);

    ctx.strokeStyle = highLight ? 'red': 'white';
    ctx.stroke();

    ctx.strokeText(this.word, this.x, this.y);
    ctx.textRendering = "optimizeLegibility";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
  }
}
