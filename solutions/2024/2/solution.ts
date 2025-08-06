import { loadInput } from "@/utils";

const PATH = "2024/2/Input.txt"; // Relative to project root
const raw = loadInput(PATH);

// -----------------------------------------
// --- Day 2: Red-Nosed Reports ---
// -----------------------------------------

export function Day2Part1(rawInput: string) {
  const rawData = rawInput.split("\n");
  const data = rawData.map(report => {
    return report.split(" ").map(Number)
  })

  let safeNum = 0;

  for (let report of data) {
    let diff = report[0] - report[1];
    let direction = Math.sign(diff);
    let safe = false;
    if (Math.abs(diff) >= 1 && Math.abs(diff) <= 3 && diff !== 0) {
      safe = true;
      for (let i = 1, j = 2; j < report.length; i++, j++) {
        let newDiff = report[i] - report[j];
        let newDir = Math.sign(newDiff);

        if (newDir !== direction || Math.abs(newDiff) < 1 || Math.abs(newDiff) > 3) {
          safe = false;
        } else {
          diff = newDiff;
        }
      }
    }
    if (safe === true) safeNum++;
  }

  return safeNum;
}

function checkIfSafe(report: string[]) {
  let diff = +report[0] - +report[1];
  let direction = Math.sign(diff);
  let safe = false;
  if (Math.abs(diff) >= 1 && Math.abs(diff) <= 3 && diff !== 0) {
    safe = true;
    for (let i = 1, j = 2; j < report.length; i++, j++) {
      let newDiff = +report[i] - +report[j];
      let newDir = Math.sign(newDiff);

      if (newDir !== direction || Math.abs(newDiff) < 1 || Math.abs(newDiff) > 3) {
        safe = false;
      } else {
        diff = newDiff;
      }
    }
  }
  return safe;
}

function getDiff(report: number[]): number[] {
  let diffs: number[] = [];
  report.forEach((num, i) => {
    if (i !== report.length - 1) {
      diffs.push(num - report[i + 1])
    }
  })

  return diffs;
}

function isSafe(index: number, diff: number[]) {
  let num = diff[index];

  if (Math.abs(num) < 1 || Math.abs(num) > 3 || Math.sign(num) !== Math.sign(diff[0])) {
    return false
  }
  return true;
}

function isSafeDiff(diff: number[]): boolean {
  return diff.every(num =>
    Math.sign(num) === Math.sign(diff[0]) &&
    Math.abs(num) >= 1 &&
    Math.abs(num) <= 3
  );
}

export function Day2Part2(rawInput: string) {
  const rawData = rawInput.split("\n");
  const data = rawData.map(report => {
    return report.split(" ").map(Number)
  })

  let safeNum = 0;

  for (let report of data) {
    let diffs = getDiff(report);

    // check they're all the same sign
    const diffIsSafe = diffs.every(num =>
      Math.sign(num) === Math.sign(diffs[0]) &&
      Math.abs(num) >= 1 &&
      Math.abs(num) <= 3
    );

    if (diffIsSafe === true) {
      safeNum++
    } else {
      // try removing every element first
      for (let i = 0; i < report.length; i++) {
        let testReport = report.toSpliced(i, 1);
        let testDiff = getDiff(testReport);

        if (isSafeDiff(testDiff)) {
          safeNum++;
          break;
        }
      }
    }
  }

  return safeNum;
}

const start = performance.now()
console.log(Day2Part1(raw))
const end = performance.now()
console.log(`Time taken:`, end - start, "ms")

const start2 = performance.now()
console.log(Day2Part2(raw))
const end2 = performance.now()
console.log(`Time taken (Part 2):`, end2 - start2, "ms")
