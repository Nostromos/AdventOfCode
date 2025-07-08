import loadInput from "@/utils";

const PATH = "2017/Days/9/Input.txt"; // Relative to project root
const raw = loadInput(PATH);

// -----------------------------------------
// --- Day 9: Stream Processing ---
// -----------------------------------------

export function Day9(stream: string) {
  let score = 0;
  let garbage = false;
  let depth = 0;
  let garbageCount = 0;

  for (let i = 0; i < stream.length; i++) {
    let cur = stream[i];
    if (!garbage) {
      if (cur == '{') {
        depth++;
      } else if (cur == '}') {
        score += depth
        depth--;
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
    score: score,
    garbage: garbageCount
  };
}

console.log(Day9(raw))