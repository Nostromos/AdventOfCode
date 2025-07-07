import loadInput from "@/utils";

const PATH = "2017/Days/4/Input.txt"; // Relative to project root
const input = loadInput(PATH);

export function day4Part1(input: string) {
  let valid = 0;
  const cleaned = input.split('\n').map((line) => {
    const words = line.split(" ")
    const set = new Set(words);

    if (set.size === words.length) {
      valid++;
    }
  })

  return valid;
}

export function day4Part2(input: string) {
  let valid = 0;

  const cleaned = input.split("\n").map((line) => {
    const words = line.split(" ");
    const set = new Set();
    words.forEach((word) => {
      let sorted = word.split('').sort().join('');
      if (!set.has(sorted)) {
        set.add(sorted);
      }
    })

    if (set.size === words.length) valid++;
  })

  return valid;
}

console.log(day4Part2(input));