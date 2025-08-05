import { loadInput } from "@/utils";

const PATH = "2024/Days/3/Input.txt"; // Relative to project root
const raw = loadInput(PATH);

// -----------------------------------------
// --- Day 3: Mull It Over ---
// -----------------------------------------

function processInput(raw: string) {
  return raw.replace("\n", "") // doesn't really do anything that effects the solution
}

function checkSequence(input: string, index: number) {
  let find = ["m", "u", "l", "(", ",", ")"]
}

export function Day3Part1(raw: string) {
  const input = processInput(raw);

  let nums: number[][] = [];
  

  for (let i = 0, j = 0; i < input.length; i++) {
    if (input[i] === find[j]) {
      j++;
    }

  }
}

export function Day3Part2(raw: string) {
  const input = processInput(raw);

}

const start = performance.now()
console.log(Day3Part1(raw))
const end = performance.now()
console.log(`Time taken:`, end - start, "ms")

const start2 = performance.now()
console.log(Day3Part2(raw))
const end2 = performance.now()
console.log(`Time taken (Part 2):`, end - start, "ms")