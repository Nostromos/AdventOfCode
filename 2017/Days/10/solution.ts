import loadInput from "@/utils";

const PATH = "2017/Days/10/Input.txt"; // Relative to project root
const raw = loadInput(PATH);
const byteString = raw.trim().split('').map(char => char.charCodeAt(0)).concat([17, 31, 73, 47, 23])

// -----------------------------------------
// --- Day 10: Knot Hash ---
// -----------------------------------------

export function Day10Part1(input: string, list?: number) {
  let lengths = input.split(",")
  let skip = 0;
  let cur = 0
  let rope;
  if (!list) {
    rope = Array.from({ length: 256 }, (_, i) => i);
  } else {
    rope = Array.from({ length: list }, (_, i) => i);
  }

  for (let i = 0; i < lengths.length; i++) {
    // reverse the order
    let length = Number(lengths[i])
    let swaps = Number(lengths[i])
    let start = cur
    let end = (start + length - 1) % rope.length;
    while (swaps > 1) {
      [rope[start], rope[end]] = [rope[end], rope[start]]
      swaps -= 2
      start = (start + 1) % rope.length
      end = (end - 1 + rope.length) % rope.length
    }
    // move current forward by length + skip
    cur = (cur + length + skip) % rope.length;
    // increment skip
    skip++;
  }

  return rope[0] * rope[1];
}

export function Day10Part2(lengths: number[], rounds: number = 64, list?: number) {
  let cur = 0;
  let skip = 0;
  let rope;
  if (!list) {
    rope = Array.from({ length: 256 }, (_, i) => i);
  } else {
    rope = Array.from({ length: list }, (_, i) => i);
  }

  while (rounds > 0) {
    for (let i = 0; i < lengths.length; i++) {
      // reverse the order
      let length = Number(lengths[i])
      let swaps = Number(lengths[i])
      let start = cur
      let end = (start + length - 1) % rope.length;
      while (swaps > 1) {
        [rope[start], rope[end]] = [rope[end], rope[start]]
        swaps -= 2
        start = (start + 1) % rope.length
        end = (end - 1 + rope.length) % rope.length
      }
      // move current forward by length + skip
      cur = (cur + length + skip) % rope.length;
      // increment skip
      skip++;
    }
    rounds--;
  }

  let denseHash = bitwiseXorReduce(rope);
  console.log("Dense Hash:", denseHash);
  let hexHash = denseHash.map((val) => {
    return val.toString(16).padStart(2, '0')
  }).join("")
  console.log(hexHash);
  return hexHash;
}

function bitwiseXorReduce(rope: number[]) {
  const chunks = Array.from({ length: 16 }, (_, i) => rope.slice(i * 16, (i + 1) * 16));
  const hash = []

  for (let chunk of chunks) {
    hash.push(chunk.reduce((acc, num) => acc ^ num, 0));
  }
  return hash;
}

console.log(Day10Part2(byteString))