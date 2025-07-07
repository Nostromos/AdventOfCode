import loadInput from "@/utils";

const PATH = "2017/Days/5/Input.txt"; // Relative to project root
const input = loadInput(PATH);

export function Day5Part1(input: string) {
  const instructions = input.split("\n").map((num) => Number(num));

  let jumps = 0;
  let current = 0;

  while (current <= instructions.length - 1) {
    let temp = current;
    current += instructions[current]
    instructions[temp]++;
    jumps++;
  }

  return jumps;
}

export function Day5Part2(input: string) {
  const instructions = input.split("\n").map((num) => Number(num));

  let jumps = 0;
  let current = 0;

  while (current <= instructions.length - 1) {
    let temp = current;
    current += instructions[current]
    instructions[temp] > 2 ? instructions[temp]-- : instructions[temp]++
    jumps++;
  }

  return jumps;
}

console.log(Day5Part2(input));