import loadInput from "@/utils";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PATH = __dirname + "/Input.txt"; // TODO: Move this to loadInput in @/utils
const input = Number(loadInput(PATH));

export function day3Part1(input: number): number {
  console.log("Input:", input);

  const grid = getGridQualities(input);
  console.log("Grid:", grid);

  /**
   * Get Coordinates
   */

  // First find the squares
  let current = grid.startNum;
  let sX = grid.entryX;
  let sY = grid.entryY;

  let layerInfo = getCorners(sX, sY, grid.length, current);
  console.log(layerInfo);

  let cornerValues = Object.values(layerInfo).map(p => p.value);
  cornerValues.unshift(0)
  // Find closest corner, find axis, find amplitude, then manipulate closest corner coordinates to get the point, which gives us the number of steps

  let i = 1;
  while (cornerValues[i] < input) {
    i++;
  }

  current = cornerValues[i]


  return i;
}

type Coordinate = [x: number, y: number];
type DirectionalTransform = [dx: number, dy: number];

function next(x: number, y: number, direction: string) {
  const directions: Record<string, DirectionalTransform> = {
    right: [1, 0],
    left: [-1, 0],
    down: [0, 1],
    up: [0, -1]
  }

  const [dx, dy] = directions[direction];
  return [x + dx, y + dy];
}

function getCorners(x: number, y: number, length: number, startNum: number) {
  console.log("Start:", `[${x}, ${y}]`)
  console.log("Length:", length)
  console.log("Start Value:", startNum)

  return {
    p1: { x: x, y: y + length - 1, value: startNum + (length - 2) },
    p2: { x: x - length - 1, y: y, value: startNum + (length - 2) + (length - 1) },
    p3: { x: x - length - 1, y: y - length - 1, value: startNum + (length - 2) + length - 1 + length - 1 },
    p4: { x: x, y: y - 1, value: startNum + (length - 2) + length - 1 + length - 1 + length - 1 },
  }
}

// Find Grid Dimensions based on the input number
// Grid always expands in lower right.
// Dimensions are relative to 1, which is 0,0

type Grid = {
  numLayers: number,
  layerPoints: number,
  totalPoints: number,
  length: number,
  startNum: number,
  endNum: number,
  entryX: number,
  entryY: number,
}
``
function getGridQualities(num: number): Grid {
  let grid: Grid = {
    numLayers: 1,
    layerPoints: 1,
    totalPoints: 1,
    length: 1,
    startNum: 1,
    endNum: 1,
    entryX: 0,
    entryY: 0
  }

  while (grid.totalPoints <= num) {
    grid.length += 2;
    grid.layerPoints = (grid.length ** 2) - grid.totalPoints;
    grid.totalPoints = grid.length ** 2;
    grid.numLayers = (grid.length + 1) / 2;
    grid.startNum = grid.endNum + 1;
    grid.endNum = grid.startNum + grid.layerPoints;
    grid.entryX = grid.numLayers - 1;
    grid.entryY = -(grid.entryX - 1)
  }

  return grid;
}

console.log(day3Part1(347991))