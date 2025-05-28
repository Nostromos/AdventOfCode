import loadInput from "@/utils";

const PATH = "2017/Days/2/Input.txt";
const input = loadInput(PATH);

/**
 * For each row, find the difference between the largest and smallest elements then sum that difference for all the rows and return.
 */

function parseInput(input: string): number[][] {
  return input
    .trim()
    .split("\n")
    .map(line =>
      line
        .trim()
        .split(/\s+/)
        .map(Number)
    );
}

export function GetChecksum(input: string): number {
  let checksum = 0;

  const values = parseInput(input);

  for (let line of values) {
    let min = Infinity;
    let max = 0;
    console.log(line);
    console.log("[BEFORE] Max:", max, " / Min:", min, " / Sum:", checksum);
    line.forEach(number => {
      if (number > max) {
        max = number;
      }

      if (number < min) {
        min = number;
      }
    })
    checksum += (max - min);
    console.log("[AFTER] Max:", max, " / Min:", min, " / Sum:", checksum);
  }

  return checksum;
}

console.log(GetChecksum(input));