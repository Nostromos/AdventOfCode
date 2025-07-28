import loadInput from "@/utils";

const PATH = "2023/Days/23/Input.txt"; // Relative to project root
const raw = loadInput(PATH);

// -----------------------------------------
// --- Day 23: A Long Walk ---
// -----------------------------------------

type Coordinates = {
  x: number;
  y: number;
}

type Neighbor = {
  coordinates: Coordinates;
  distance: number;
  node: Node;
}

class Node {
  coordinates: Coordinates;
  neighbors: Map<string, Neighbor>; // string of coords and a neighbor object

  constructor() {
    this.coordinates = { x: 0, y: 0 };
    this.neighbors = new Map();
  }

  getCoordinates = () => {
    const coords = `${this.coordinates.x},${this.coordinates.y}`;
    return coords;
  }
}

class HikingMap {
  map: string[][];
  start: Coordinates;
  end: Coordinates;

  constructor(rawInput: string) {
    this.map = this.processInput(rawInput);
    this.start = { x: 1, y: 0 };
    this.end = { x: 139, y: 140 }
  }

  hasNeighbors(coordinates: Coordinates, lastSpot: Coordinates) {
    let x = coordinates.x;
    let y = coordinates.y;

    let neighbors = false;

    const DT = [
      // up down left right
      { x: 0, y: -1 },
      { x: 0, y: 1 },
      { x: -1, y: 0 },
      { x: 1, y: 0 }
    ];

    for (let d of DT) {
      const ptn = { x: x + d.x, y: y + d.y }

      if (this.map[ptn.y][ptn.x] !== "#") {
        // the issue is that I also need some sort of directional marker to filter out the spot i was just in
      }
    }

  }

  processInput(raw: string) {
    const map = raw.split("\n").map(line => line.split(""))
    let [x, y] = [0, 0];

    map.forEach((line, cy) =>
      line.forEach((spot, cx) => {
        const coordinates = { x, y }
        if (spot !== "#") {

        }
      }
      ))

    return map;
  }

}

export function Day23Part1(raw: string) {

}

const start = performance.now()
console.log(Day23Part1(raw))
const end = performance.now()
console.log(`Time taken:`, end - start, "ms")