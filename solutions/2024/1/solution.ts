import { loadInput } from "@/utils";

const PATH = "2024/Days/1/Input.txt"; // Relative to project root
const raw = loadInput(PATH);

// -----------------------------------------
// --- Day 1: Historian Hysteria ---
// -----------------------------------------

function processInput(raw: string) {
  const lines = raw.split("\n").map(line => line.split("   "))
  const list1 = [];
  const list2 = [];

  for (let i = 0; i < lines.length; i++) {
    list1.push(lines[i][0])
    list2.push(lines[i][1])
  }

  return [list1, list2]
}

export function Day1Part1(raw: string): number {
  let [list1, list2] = processInput(raw);

  list1 = list1.sort((a, b) => +a - +b);
  list2 = list2.sort((a, b) => +a - +b);

  let total = 0;

  for (let i = 0; i < list1.length; i++) {
    total += Math.abs(+list1[i] - +list2[i])
  }

  return total;
}

export function Day1Part2(raw: string) {
  let [list1, list2] = processInput(raw);

  list1 = list1.sort((a, b) => +a - +b);
  list2 = list2.sort((a, b) => +a - +b);

  let score = 0; 

  for (let i = 0, j = 0; i < list1.length; i++) {
    let count = 0;

    while (list2[j] < list1[i]) {
      j++;
    }

    while (list2[j] === list1[i]) {
      count++;
      j++
    }

    score += (+list1[i] * count)
  }

  return score;
}

const start = performance.now()
console.log("Part 1:", Day1Part1(raw))
const end = performance.now()
console.log(`Time taken:`, end - start, "ms")

const start2 = performance.now()
console.log("Part 2:", Day1Part2(raw))
const end2 = performance.now()
console.log(`Time taken (Part 2):`, end2 - start2, "ms")