import loadInput from "@/utils";

const PATH = "2017/Days/1/Input.txt";
const input = loadInput(PATH);

/**
 * Find the sum of all digits that match the next digit in the list
 */

export default function InverseCaptcha2Pointer(input: string): number {
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



console.log(InverseCaptcha2Pointer(input));``