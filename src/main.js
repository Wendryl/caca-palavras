import { createBubbles, isInside, fetchRandomWord, fetchRandomWords } from './utils.js';
import { Bubble } from './Bubble.js';
import { Timer } from './Timer.js';

const canvas = document.querySelector('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;
const ctx = canvas.getContext('2d');
let words = [];
let bubbles = [];
let prefix = window.location.search.split('?')[1];

window.onload = async () => {
  words = await fetchRandomWords(prefix);
  bubbles = createBubbles(words);
  main();
}

function main() {

  /**
   *  @type {PointerEvent}
   */
  let pointerEv;

  canvas.addEventListener('pointerup', ev => {
    pointerEv = ev;
  });

  window.requestAnimationFrame(() => {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    bubbles.forEach(async (bubble, i, arr) => {
      const highLight = isInside(pointerEv, bubble);
      bubble?.render(ctx, highLight);

      if (highLight) {
        const randomWord = await fetchRandomWord();
        arr[i] = new Bubble(randomWord);
      }
    });

    main();
  });
}
