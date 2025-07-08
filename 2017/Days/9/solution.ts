import loadInput from "@/utils";

const PATH = "2017/Days/9/Input.txt"; // Relative to project root
const raw = loadInput(PATH);

// -----------------------------------------
// --- Day 9: Stream Processing ---
// -----------------------------------------

function hasChars(c: string) {
  const ALLCHARS = ['{', '}', '<', '>', '!'];

  return ALLCHARS.includes(c);
}

const CHARS = {
  groupOpen: '{',
  groupClose: '}',
  garbageOpen: '<',
  garbageClose: '>',
  cancel: '!'
}

export function Day9(raw: string) {
  const stream = raw.split("");
  const scores: number[] = [];
  const stack: string[] = [];
  let garbage = false;
  let peek = null;
  let depth = 0;
  let garbageCount = 0;

  for (let i = 0; i < stream.length; i++) {
    let cur = stream[i];
    if (garbage == false) {
      if (cur == '{') {
        depth++;
        stack.push(cur);
        peek = cur;
      } else if (cur == '}' && peek == '{') {
        scores.push(depth);
        depth--;
        stack.pop();
      } else if (cur == '<') {
        garbage = true;
      }
    } else {
      if (cur == '!') {
        i++;
      } else if (cur == '>') {
        garbage = false;
      } else {
        garbageCount++;
      }
    }
  }

  return {
    score: scores.reduce((a, b) => a + b, 0),
    garbage: garbageCount
  };
}

console.log(Day9(raw))