import loadInput from "@/utils";

const PATH = "2019/Days/22/Input.txt"; // Relative to project root
const raw = loadInput(PATH);

// -----------------------------------------
// --- Day 22: Slam Shuffle ---
// -----------------------------------------

export function Day22(raw: string, deckSize: number = 10007, card: number): number {
  const input = raw.trim().split("\n").map(line => line.split(" "));
  let pos = card;

  for (let line of input) {
    const operation = getOperation(line);
    const value = operation === "new stack" ? 0 : Number(line.at(-1));

    if (value === undefined) {
      throw new Error("value is undefined")
    } else if (operation === "cut") {
      pos = ((pos - value) % deckSize + deckSize) % deckSize;
    } else if (operation === "increment") {
      pos = (pos * value) % deckSize;
    } else if (operation === "new stack") {
      pos = deckSize - 1 - pos;
    }
  }

  return pos;
}

function getOperation(line: string[]) {
  if (line !== undefined) {
    if (line[0] === "cut") {
      return "cut";
    } else if (line[1] === "with") {
      return "increment"
    } else {
      return "new stack"
    }
  }
}

console.log(Day22(raw, 10007, 2019))