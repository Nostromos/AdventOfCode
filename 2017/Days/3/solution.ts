import loadInput from "@/utils";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PATH = __dirname + "/Input.txt"; // TODO: Move this to loadInput in @/utils
const input = Number(loadInput(PATH));

export function day3Part1(input: number): number {
  console.log("Load Input...");
  console.log(input)

  console.log("Figure out grid size & qualities....")
  const grid = getGridQualities(input);
  console.log("Grid:", grid);

  /**
   * Get Coordinates
   */

  let current = grid.startNum; // This is the starting number of the last layer
  let sX = grid.entryX; // This is the x value for where the last layer begins
  let sY = grid.entryY; // This is the y value for where the last layer beings

  let corners = getCorners(sX, sY, grid.length, current); // This gets the corners
  console.log("\x1b[31mCorners Info:\x1b[0m", corners);

  // Find closest corner, find axis, find amplitude, then manipulate closest corner coordinates to get the point, which gives us the number of steps
  let nearCorner = corners[corners.findIndex((element) => element.value > input) - 1] // Search the corners till we find one that is over, then we go to the one before it

  // Find the diff of the corner value and our value
  console.log("Input:", input)
  console.log("Nearest corner val:", nearCorner.value)
  console.log("Nearest corner loc:", nearCorner.location)
  console.log("Nearest corner Direction:", nearCorner.direction)

  let diff = input - nearCorner.value;
  console.log(diff);

  let currentCoords = {
    x: nearCorner.x,
    y: nearCorner.y,
    direction: nearCorner.direction
  }

  while (diff > 0) {
    let nextCoords = next(currentCoords.x, currentCoords.y, currentCoords.direction)
    currentCoords.x = nextCoords[0]
    currentCoords.y = nextCoords[1]
    diff--;
  }
  console.log(currentCoords);
  return Math.abs(currentCoords.x) + Math.abs(currentCoords.y);
}

type Coordinate = [x: number, y: number];
type DirectionalTransform = [dx: number, dy: number];

function next(x: number, y: number, direction: string) {
  const directions: Record<string, DirectionalTransform> = {
    right: [1, 0],
    left: [-1, 0],
    down: [0, -1],
    up: [0, 1]
  }

  const [dx, dy] = directions[direction];
  return [x + dx, y + dy];
}

function getCorners(x: number, y: number, length: number, startNum: number) {
  console.log("Start:", `[${x}, ${y}]`);
  console.log("Length:", length);
  console.log("Start Value:", startNum);

  const topRight = {
    x: x,
    y: y + length - 1,
    value: startNum + (length - 2),
    direction: "left",
    location: "Top Right"
  }

  const topLeft = {
    x: x - (length - 1),
    y: y,
    value: topRight.value + (length - 1),
    direction: "down",
    location: "Top Left"
  }

  const bottomLeft = {
    x: x - length - 1,
    y: y - length - 1,
    value: topLeft.value + length - 1,
    direction: "right",
    location: "Bottom Left"
  }

  const bottomRight = {
    x: x,
    y: y - 1,
    value: bottomLeft.value + length - 1,
    direction: "up",
    location: "Bottom Right"
  }

  return [
    topRight,
    topLeft,
    bottomLeft,
    bottomRight
  ]
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
    grid.entryX = grid.numLayers;
    grid.entryY = -grid.numLayers + 1
  }

  return grid;
}

console.log(day3Part1(347991))