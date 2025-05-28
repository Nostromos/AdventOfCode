import loadInput from "@/utils";

const PATH = "2017/Days/2/Input.txt";
const input = parseInput(loadInput(PATH));

export function parseInput(input: string): number[][] {
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

export function GetChecksum(values: number[][]): number {
  let checksum = 0;

  for (let line of values) {
    let min = Infinity;
    let max = 0;

    line.forEach(number => {
      if (number > max) {
        max = number;
      }

      if (number < min) {
        min = number;
      }
    })
    checksum += (max - min);
  }

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