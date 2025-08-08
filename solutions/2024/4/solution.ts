import { type Grid, DIRECTIONS_8, createGridFrom, loadInput } from "@/utils";

const PATH = "solutions/2024/4/Input.txt"; // Relative to project root
const raw = loadInput(PATH);

// -----------------------------------------
// --- Day 4: Ceres Search ---
// -----------------------------------------

export function Day4Part1(rawInput: string) {
  let grid: Grid<string> = createGridFrom(rawInput, '\n', '')
  let total = 0;
  let toSearch = findAllTargetCoords(grid, "X"); // list of coords for every single x
  for (let c of toSearch) {
    total += searchDirections(grid, c, "XMAS");
  }
  return total;
}

function findAllTargetCoords(grid: Grid<string>, target: string): [number, number][] {
  let coords: [number, number][] = []

  grid.forEach((line, i) => {
    line.forEach((char, j) => {
      if (char === target) {
        coords.push([j, i]);
      }
    })
  })
  return coords;
}

function searchDirections(grid: Grid<string>, coords: [number, number], target: string): number {
  let DIRECTIONS = DIRECTIONS_8;
  let matches = 0;
  const length = target.length

  for (let d of DIRECTIONS) {
    const word = Array.from({ length: length }, (_, i) => {
      const [nx, ny] = [coords[0] + d[0] * i, coords[1] + d[1] * i];
      return grid[ny]?.[nx] ?? '';
    }).join('');

    if (word === target) matches++;
  }
  return matches;
}

export function Day4Part2(rawInput: string) {
  let grid: Grid<string> = createGridFrom(rawInput, '\n', '')
  let total = 0;
  let toSearch = findAllTargetCoords(grid, "A"); // list of coords for every single x

  for (let i = 0; i < toSearch.length;) {
    if (searchSquare(grid, toSearch[i]) == false) {
      toSearch.splice(i, 1);
    } else {
      total++
      i++;
    }
  }
  return total;
}

function searchSquare(grid: Grid<string>, coords: [number, number]): boolean {
  const DIAGONAL_1 = [
    [1, 1],
    [0, 0],
    [-1, -1]
  ]

  const DIAGONAL_2 = [
    [-1, 1],
    [0, 0],
    [1, -1]
  ]

  const word1 = DIAGONAL_1.map(([dx, dy]) => {
    const [nx, ny] = [coords[0] + dx, coords[1] + dy];
    return grid[ny]?.[nx] ?? '';
  }).join('');

  const word2 = DIAGONAL_2.map(([dx, dy]) => {
    const [nx, ny] = [coords[0] + dx, coords[1] + dy];
    return grid[ny]?.[nx] ?? '';
  }).join('');

  if ((word1 === "MAS" || word1 === "SAM") && (word2 === "MAS" || word2 === "SAM")) {
    return true;
  }

  return false;
}

const start = performance.now()
console.log(Day4Part1(raw))
const end = performance.now()
console.log(`Time taken:`, end - start, "ms")

const start2 = performance.now()
console.log(Day4Part2(raw))
const end2 = performance.now()
console.log(`Time taken (Part 2):`, end - start, "ms")