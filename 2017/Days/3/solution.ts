import loadInput from "@/utils";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PATH = __dirname + "/Input.txt"; // TODO: Move this to loadInput in @/utils
const input = Number(loadInput(PATH));

export function day3Part1(input: number): number {
  if (input === 1) return 0;

  let layers = Math.ceil((Math.sqrt(input) - 1) / 2);
  let sideLength = 2 * layers;
  let maxVal = (2 * layers + 1) ** 2;

  let midpoints = [];
  for (let i = 0; i < 4; i++) {
    midpoints.push(maxVal - layers - i * sideLength)
  }

  let minimumOffset = Math.min(...midpoints.map(mid => Math.abs(input - mid)))

  return layers + minimumOffset;
}

export function day3Part2(input: number): void {
  let coords = [0, 0];

  let dt = {
    up: {
      x: 0,
      y: 1,
    },
    down: {
      x: 0,
      y: -1,
    },
    left: {
      x: -1,
      y: 0,
    },
    right: {
      x: 1,
      y: 0,
    }
  }
}

export class MatrixWalker {
  layer: number;
  steps: number; 
  
  constructor() {
    this.layer = 0;
    this.steps = 1;
  }
}

export function getSquareValue(squareNumber: number): number {
  
  return 0;
}

console.log(day3Part1(347991))