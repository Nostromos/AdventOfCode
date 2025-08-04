import { loadInput } from "@/utils";

const PATH = "2017/Days/1/Input.txt";
const input = loadInput(PATH);

/**
 * Find the sum of all digits that match the next digit in the list
 */
export function InverseCaptcha2Pointer(input: string): number {
  if (input.length <= 1) return 0;

  let sum = 0; // running sum

  let p1 = 0;
  let p2 = 1;

  while (p1 < input.length) {
    if (input[p1] == input[p2]) {
      sum += Number(input[p1]);
    }

    if (p2 == input.length - 1) {
      p2 = 0;
      p1++;
    } else {
      p1++, p2++;
    }
  }

  return sum;
}

export function InverseCaptchaPart2(input: string): number {
  let sum = 0;

  let p1 = 0;
  let p2 = (input.length / 2);

  while (p1 < input.length) {
    console.count();
    console.group("Looping")
    console.log("p1:", p1, " / p2:", p2)
    console.log("inp[p1]:", input[p1], " / input[p2]:", input[p2]);
    console.log("Sum:", sum);
    if (input[p1] == input[p2]) {
      sum += Number(input[p1]);
    }

    if (p2 == input.length - 1) {
      p2 = 0;
      p1++;
    } else {
      p1++, p2++;
    }
    console.groupEnd();
  }

  return sum;
}

console.log(InverseCaptchaPart2(input));