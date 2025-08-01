import loadInput from "@/utils";

const PATH = "2017/Days/X/Input.txt"; // Relative to project root
const raw = loadInput(PATH);

// -----------------------------------------
// --- Day X: Name ---
// -----------------------------------------

export function DayXPart1(rawInput: string) {

}

export function DayXPart2(rawInput: string) {

}

const start = performance.now()
console.log(DayXPart1(raw))
const end = performance.now()
console.log(`Time taken:`, end - start, "ms")

const start2 = performance.now()
console.log(DayXPart2(raw))
const end2 = performance.now()
console.log(`Time taken (Part 2):`, end - start, "ms")