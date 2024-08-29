import { Bubble, BUBBLE_RADIUS } from './Bubble.js';

/**
 * @returns {Array<Bubble>} bubbles;
 */
export function createBubbles(words) {
  const bubbles = [];

  words.forEach(word => {
    bubbles.push(new Bubble(word));
  });

  return bubbles;
}

/**
 * @param {PointerEvent?} pointer
 */
export function isInside(pointer, bubble) {
  return pointer?.x <= bubble.x + BUBBLE_RADIUS &&
    pointer?.x >= bubble.x - BUBBLE_RADIUS &&
    pointer?.y <= bubble.y + BUBBLE_RADIUS &&
    pointer?.y >= bubble.y - BUBBLE_RADIUS ;
}

/**
 * @returns {string} randomWord
 */
export async function fetchRandomWord() {
  /**
   * @type {Promise<{ sense: number, wid: number, word: string }>} result
   */
  const result = await fetch('https://api.dicionario-aberto.net/random').then(res => res.json());
  return result.word;
}

/**
 * @param {string?} prefix
 * @returns {Array<string>} randomWords
 */
export async function fetchRandomWords(prefix = 'apag') {
  /**
   * @type {Promise<Array<{ preview: string, word: string, sense: 1}>>} results
   */
  const results = await fetch(`https://api.dicionario-aberto.net/prefix/${prefix}`).then(res => res.json());
  return results.map(result => result.word);
}
