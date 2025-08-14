import { loadInput } from "@/utils";

const PATH = "solutions/2017/12/Input.txt"; // Relative to project root
const raw = loadInput(PATH);

// -----------------------------------------
// --- Day 12: Digital Plumber ---
// -----------------------------------------

export function Day12Part1(rawInput: string) {
  const input = rawInput.split("\n");
  const map = new Map()

  for (let line of input) {
    const [program, pipes] = line.split(" <-> ")
    const neighbors = pipes.split(", ").map((n => Number(n)))
    const node = {
      visited: false,
      neighbors
    }
    map.set(Number(program), node)
  }

  let groupCount = 0;
  let queue = [0];
  while (queue.length > 0) {
    let p = queue.pop()!
    let cur = map.get(p);
    map.delete(p)
    if (cur) {
      groupCount++;
      cur.neighbors.forEach((n: number) => {
        let neighbor = map.get(n);
        if (neighbor !== undefined) queue.push(n)
      })
    }
  }

  return {
    groupCount,
    map
  };
}

export function Day12Part2(map: any) {
  let totalGroups = 1;

  while (map.size > 0) {
    totalGroups++;

    let keys = map.keys()
    let start = keys.next().value
    let queue = [start]

    while (queue.length > 0) {
      let p = queue.pop();
      let c = map.get(p!);
      if (c) {
        map.delete(p!)
        c!.neighbors.forEach((n: number) => {
          let neighbor = map.get(n)
          if (neighbor !== undefined) queue.push(n)
        })
      }
    }
  }
  return totalGroups;
}