import loadInput from "@/utils";

const PATH = "2017/Days/3/Input.txt"; // TODO: Move this to loadInput in @/utils
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



/**
 * 
 * PART 2
 * 
 */

export function day3Part2(input: number): number {
  let matrix = new MatrixWalker(input);

  matrix.walkTheMap();

  return matrix.solution !== null ? matrix.solution : 0;
}

type Coordinates = [number, number];
type Position = {
  x: number,
  y: number,
  val: number,
}

const DIRECTIONS = {
  up: [0, 1], // up
  down: [0, -1], // down
  left: [-1, 0], // left
  right: [1, 0], // right
} as const;

type Direction = keyof typeof DIRECTIONS;

export class MatrixWalker {
  layer: number;
  steps: number; 
  input: number;
  map: Map<string, number>;
  solution: null | number;

  constructor(input: number) {
    this.layer = 0;
    this.steps = 1;
    this.input = input;
    this.map = new Map();
    this.solution = null;
  }

  walkTheMap() {
    let current = {
      x: 0,
      y: 0,
      val: 1,
    }
    
    // Set initial value
    this.map.set(`0,0`, 1);
    
    while (this.solution === null) {
      // start new layer
      current.x++;
      current.val = this.getSquareValue(current.x, current.y);
      this.map.set(`${current.x},${current.y}`, current.val);
      
      if (current.val > this.input) {
        this.solution = current.val;
        return;
      }
      
      this.layer++;
      this.steps += 2;

      // right side, moving up
      let sideSteps = this.steps - 2;
      while (sideSteps > 0) {
        current = this.step(current, "up");
        this.map.set(`${current.x},${current.y}`, current.val);

        if (current.val > this.input) {
          this.solution = current.val;
          return;
        }

        sideSteps--;
      }

      // top side, moving left
      sideSteps = this.steps - 1;
      while (sideSteps > 0) {
        current = this.step(current, "left");
        this.map.set(`${current.x},${current.y}`, current.val);

        if (current.val > this.input) {
          this.solution = current.val;
          return;
        }

        sideSteps--;
      }

      // left side, moving down
      sideSteps = this.steps - 1;
      while (sideSteps > 0) {
        current = this.step(current, "down");
        this.map.set(`${current.x},${current.y}`, current.val);

        if (current.val > this.input) {
          this.solution = current.val;
          return;
        }

        sideSteps--;
      }

      // bottom side, moving right
      sideSteps = this.steps - 1;
      while (sideSteps > 0) {
        current = this.step(current, "right");
        this.map.set(`${current.x},${current.y}`, current.val);

        if (current.val > this.input) {
          this.solution = current.val;
          return;
        }

        sideSteps--;
      }
    }
  }

  step(position: Position, direction: Direction): Position {
    let dirT = DIRECTIONS[direction]

    let x = position.x + dirT[0]
    let y = position.y + dirT[1];
    let val = this.getSquareValue(x, y);

    return {
      x,
      y,
      val
    }
  }

  getSquareValue(x: number, y: number): number {
    // Special case: origin is always 1
    if (x === 0 && y === 0) return 1;
    
    const neighbors: Coordinates[] = [
      [x, y + 1], // up
      [x, y - 1], // down
      [x - 1, y], // left
      [x + 1, y], // right
      [x + 1, y + 1], // upper right
      [x - 1, y + 1], // upper left
      [x + 1, y - 1], // lower right
      [x - 1, y - 1], // lower left
    ]

    let sum = 0;

    for (let neighbor of neighbors) {
      const key = `${neighbor[0]},${neighbor[1]}`;
      if (this.map.has(key)) {
        sum += this.map.get(key) || 0
      }
    }

    return sum;
  }

}

console.log(day3Part2(input))