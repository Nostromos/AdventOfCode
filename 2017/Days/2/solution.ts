import loadInput from "@/utils";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PATH = __dirname + "/Input.txt"; // TODO: Move this to loadInput in @/utils
const input = parseInput(loadInput(PATH));

export function parseInput(input: string): number[][] {
  return input
    .trim()
    .split("\n")
    .map(row =>
      row
        .trim()
        .split(/\s+/)
        .map(Number)
    );
}

export function getChecksum(values: number[][]): number {
  let checksum = 0;

  values.forEach((row) => {
    const diff = Math.max(...row) - Math.min(...row);
    checksum += diff;
  });

  return checksum;
}

export function SumEvenlyDivisible(values: number[][]): number {
  let sum = 0;

  for (let line of values) {
    line.sort((a, b) => a - b);
  }

  for (let line of values) {
    let modulus = null;

    let p1 = 0, p2 = line.length - 1;
    while (modulus == null) {
      if (line[p2] % line[p1] == 0) {
        modulus = line[p2] / line[p1]
      } else {
        if (p1 == p2 - 1) {
          p1 = 0;
          p2--;
        } else {
          p1++;
        }
      }
    }
    sum += modulus;
  }

  return sum;
}

/**
 * 
 * 1640	590	93	958	73	1263	1405	1363	737	712	1501	390	68	1554	959	79
 * 
 */

// function enumerateDivisors() {

// }

// function findDivisiblePair(nums: number[]) {
//   const rowSet = new Set(nums);

//   rowSet.forEach((num) => {
//     // enumerateDivisors
//   })
// }

// export function sumEvenlyDivisible(values: number[][]) {

// }