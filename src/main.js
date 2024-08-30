import { createBubbles, isInside, fetchRandomWord, fetchRandomWords } from './utils.js';
import { Bubble } from './Bubble.js';
import { Timer } from './Timer.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

let words = [];
let bubbles = [];
let prefix = window.location.search.split('?')[1];
let capturedWords = [];

window.onload = async () => {
  const timer = new Timer();
  timer.subscribe(_timeUp => {
    alert(`Acabou o tempo! Você capturou ${capturedWords.length} palavras`);
    canvas.remove();

    const wordListWrapper = document.querySelector("#word-list");
    const wordList = document.querySelector("#word-list ol");
    wordListWrapper.style.display = "block";

    capturedWords.map(w => {
      const word = document.createElement("li");
      word.innerText = w;
      wordList.appendChild(word);
    });
  });
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
        capturedWords.push(bubble?.word);
        const randomWord = await fetchRandomWord();
        arr[i] = new Bubble(randomWord);
      }
    });

    main();
  });
}
