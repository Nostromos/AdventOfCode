import { loadInput } from "@/utils";

const PATH = "solutions/2024/5/Input.txt"; // Relative to project root
const raw = loadInput(PATH);

// -----------------------------------------
// --- Day 5: Print Queue ---
// -----------------------------------------

function parseInput(raw: string) {
  const [rawRules, rawUpdates] = raw.split("\n\n");
  const rules = rawRules.split("\n")
    .map(line =>
      line.split("|").map(Number));
  const updates = rawUpdates.split("\n")
    .map(line =>
      line.split(",")
        .map(Number))

  // console.log(rules)
  // console.log(updates)
  return [rules, updates]
}

function sumUpdates(updates: number[][]): number {
  return updates.reduce((a, b) => {
    let mid = Math.floor(b.length / 2)
    return a + b[mid];
  }, 0)
}

function processRules(rules: number[][]): Map<number, number[]> {
  const map = new Map();
  for (let rule of rules) {
    const [pre, post] = rule;
    const succ = map.get(pre);
    if (succ === undefined) {
      map.set(pre, [post])
    } else {
      succ.push(post);
      map.set(pre, succ);
    }
  }
  return map;
}

function processUpdates(rules: Map<number, number[]>, updates: number[][]): number[][] {
  let corrects = [];

  for (let update of updates) {
    let correct = true;
    update.forEach((page, i) => {
      let pageRule = rules.get(page);
      if (pageRule) {
        for (let check of pageRule) {
          if (update.includes(check)) {
            let ind = update.indexOf(check)
            if (ind < i) {
              correct = false;
              break;
            }
          }
        }
      }
    })
    if (correct) corrects.push(update);
  }
  return corrects;
}

function procesAllUpdates(rules: Map<number, number[]>, updates: number[][]): number[][] {
  let correctedUpdates = [];

  for (let update of updates) {
    let correct = true;
    update.forEach((page, i) => {
      let pageRule = rules.get(page);
      if (pageRule) {
        for (let check of pageRule) {
          if (update.includes(check)) {
            let ind = update.indexOf(check)
            if (ind < i) {
              correct = false;
              break;
            }
          }
        }
      }
    })
    if (!correct) {
      correctedUpdates.push(correctUpdate(rules, update));
    }
  }
  return correctedUpdates;
}

function correctUpdate(rules: Map<number, number[]>, update: number[]): number[] {
  const correctedUpdate = new Array(update);

  for (let num of update) {
    let 
  }
  return correctedUpdate;
}

export function Day5Part1(rawInput: string): number {
  let [rulesArr, updates] = parseInput(rawInput);
  const rules = processRules(rulesArr);
  const corrects: number[][] = processUpdates(rules, updates);
  return sumUpdates(corrects);
}

export function Day5Part2(rawInput: string) {
  let [rulesArr, updates] = parseInput(rawInput);
  const rules = processRules(rulesArr);
  const allUpdates: number[][] = procesAllUpdates(rules, updates);
  console.log(allUpdates)
  return sumUpdates(allUpdates);
}

const start = performance.now()
console.log(Day5Part1(raw))
const end = performance.now()
console.log(`Time taken:`, end - start, "ms")

const start2 = performance.now()
console.log(Day5Part2(raw))
const end2 = performance.now()
console.log(`Time taken (Part 2):`, end - start, "ms")