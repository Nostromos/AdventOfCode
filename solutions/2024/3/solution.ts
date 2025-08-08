import { loadInput, parseNumbers } from "@/utils";

const PATH = "solutions/2024/3/Input.txt"; // Relative to project root
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

  let sum = 0;
  const intcapturegroup = /mul\((\d{1,3}),(\d{1,3})\)/g
  let nums = input.match(intcapturegroup)
  if (!nums) throw Error("Nums is null or undefined.")
  for (let g of nums) {
    let ints = parseNumbers(g)
    sum += (ints[0] * ints[1])
  }
  return sum;
}

export function Day3Part2(raw: string) {
  const input = processInput(raw);

  let sum = 0;
  const intcapturegroup = /(mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\))/g
  let nums = input.match(intcapturegroup)
  console.log(nums)
  if (!nums) throw Error("Nums is null or undefined.")
  let mulEnabled = true;
  for (let g of nums) {
    if (g == "do()") {
      mulEnabled = true;
    } else if (g == "don't()") {
      mulEnabled = false;
    } 

    if (mulEnabled === true && g !== "do()" && g !== "don't()") {
      let ints = parseNumbers(g)
      // console.log(ints)
      sum += (ints[0] * ints[1])
    } 
  }
  return sum;
}

const start = performance.now()
console.log(Day3Part1(raw))
const end = performance.now()
console.log(`Time taken:`, end - start, "ms")

const start2 = performance.now()
console.log(Day3Part2(raw))
const end2 = performance.now()
console.log(`Time taken (Part 2):`, end - start, "ms")