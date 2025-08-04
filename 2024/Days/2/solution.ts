import { loadInput } from "@/utils";

const PATH = "2024/Days/2/Input.txt"; // Relative to project root
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
      // let unsafeCount = 0;
      // let unsafeIndices = [];
      // let current = 0;

      // while (current < diffs.length) {
      //   if (!isSafe(current, diffs)) {
      //     unsafeCount++;
      //     unsafeIndices.push(current);
      //   }
      //   current++;
      // }

      /**
       * TODO: 
       * 
       * There are several issues with your current logic:

  1. Line 124: You're trying to add u1 + u2 but these are indices, not the diff values. You want diffs[u1] + diffs[u2].
  2. Double counting: You increment safeNum on line 118 for edge cases, then potentially again on line 129 for the same report.
  3. Not handling all removal cases: When you have one unsafe diff in the middle, removing it isn't the only option. You could also remove one of the adjacent elements in the original report.
  4. Missing cases with 2+ unsafe diffs: Two adjacent unsafe diffs can often be fixed by removing the element between them.

  Here's the key: An unsafe diff at index i can be fixed by:
  - Removing element i from original (removes diff i-1, modifies diff i)
  - Removing element i+1 from original (removes diff i, modifies diff i+1)

  Example: [1, 5, 3, 4] → diffs [4, -2, 1]
  - Diff 0 (4) is unsafe
  - Remove element 1 (5): new report [1, 3, 4] → diffs [2, 1] ✓ safe!

  You need to try removing each element and check if any removal works, not just try to fix the bad diffs directly.
       */

//       if (unsafeCount <= 1) {
//         // if there's one unsafe, you can remove it to make it safe
//         // 1. check if theres 1 and if its first or last
//         // if (unsafeIndices.length == 1 && (unsafeIndices[0] === 0 || unsafeIndices[0] === diffs.length - 1)) {
//         //   safeNum++
//         // }

//         // 2. if its in the middle, we remove it and add the diffs on either side then check again
//         let cur = unsafeIndices[0]
//         let test1 = report.toSpliced(cur, 1);
//         let test2 = report.toSpliced(cur + 1, 1);
//         let testDiff1 = getDiff(test1);
//         let testDiff2 = getDiff(test2);

//         // 4. increment safenum
//         if (isSafeDiff(testDiff1) || isSafeDiff(testDiff2)) {
//           safeNum++;
//         }
//       }
//     }
//   }

//   return safeNum;
// }

// 1 2 4 7 11
//  1 2 3 4

const start = performance.now()
console.log(Day2Part1(raw))
const end = performance.now()
console.log(`Time taken:`, end - start, "ms")

const start2 = performance.now()
console.log(Day2Part2(raw))
const end2 = performance.now()
console.log(`Time taken (Part 2):`, end2 - start2, "ms")
