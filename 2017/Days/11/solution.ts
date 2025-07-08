import loadInput from "@/utils";

const PATH = "2017/Days/11/Input.txt"; // Relative to project root
const input = loadInput(PATH).split(",")

// -----------------------------------------
// --- Day 11: Hex Edge ---
// -----------------------------------------

const DIRECTIONS = {
  n: { dx: 0, dy: 1, dz: -1 },
  ne: { dx: 1, dy: 0, dz: -1 },
  se: { dx: 1, dy: -1, dz: 0 },
  s: { dx: 0, dy: -1, dz: 1 },
  sw: { dx: -1, dy: 0, dz: 1 },
  nw: { dx: -1, dy: 1, dz: 0 },
}

function transform(coords: number[], direction: string) {
  let [x, y, z] = coords;
  if (direction in DIRECTIONS) {
    return [
      x + DIRECTIONS[direction as keyof typeof DIRECTIONS].dx,
      y + DIRECTIONS[direction as keyof typeof DIRECTIONS].dy,
      z + DIRECTIONS[direction as keyof typeof DIRECTIONS].dz
    ]
  }
  return coords;
}

export function Day11Part1(directions: string[]) {
  let cur = [0, 0, 0];

  for (let step of directions) {
    cur = transform(cur, step)
  }

  const [x, y, z] = [Math.abs(cur[0]), Math.abs(cur[1]), Math.abs(cur[2])]
  return (x + y + z) / 2
}

export function Day11Part2(directions: string[]) {
  let cur = [0, 0, 0];
  let max = 0;

  for (let step of directions) {
    cur = transform(cur, step)
    const [x, y, z] = [Math.abs(cur[0]), Math.abs(cur[1]), Math.abs(cur[2])]
    let dist = (x + y + z) / 2;
    if (dist > max) max = dist;
  }

  return max;
}

console.log(Day11Part2(input));