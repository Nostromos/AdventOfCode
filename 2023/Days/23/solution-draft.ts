import { loadInput } from "@/utils";

const PATH = "2023/Days/23/Input.txt"; // Relative to project root
const raw = loadInput(PATH);

// -----------------------------------------
// ---        Day 23: A Long Walk        ---
// -----------------------------------------

type Coordinates = {
  x: number;
  y: number;
}

type Direction = "up" | "down" | "left" | "right";

type Path = {
  target: Node;
  length: number;
}

class Node {
  coordinates: Coordinates;
  neighbors: Map<string, Node>;// string of coords and a neighbor object
  paths: Path[];
  parent: Node | null;
  leadsToEnd: boolean;

  constructor(coords: Coordinates) {
    this.coordinates = coords;
    this.neighbors = new Map();
    this.paths = [];
    this.parent = null;
    this.leadsToEnd = false;
  }

  getStrCoordinates() {
    const coords = `${this.coordinates.x},${this.coordinates.y}`;
    return coords;
  }

  addNeighbor(node: Node) {
    this.neighbors.set(`${node.coordinates.x}, ${node.coordinates.y}`, node)
    return this;
  }

  addPath(node: Node, distance: number) {
    let newPath = {
      target: node,
      length: distance
    }

    this.paths.push(newPath);
    return this;
  }
}

class HikingMap {
  mapRoot: Node;
  hikingMap: string[][]
  start: Coordinates;
  end: Coordinates;

  constructor(rawInput: string) {
    this.hikingMap = rawInput.split("\n").map(line => line.split(""));
    this.start = { x: 1, y: 0 }; // hardcoded for my input
    this.end = { x: 139, y: 140 } // hardcoded for my input
    this.mapRoot = new Node(this.start);
  }

  processMap() {
    let lastNode = this.mapRoot;
    let curNode = lastNode;
    
    let toVisit = [this.mapRoot]
    
    while (toVisit.length > 0) {
      curNode = toVisit.pop() as Node;
    }

  }

  explorePath(node: Node): Node | void {
    let paths = this.getNeighbors(node.coordinates, node.coordinates) // check how many paths the current node has
    let toVisit = [...paths]; // if its a node, it *must* have multiple paths
    
    while (toVisit.length > 0) {
      let steps = 0; // init steps at -1 so we don't count the first check of the root node)
      let lastCoords = node.coordinates; // we want to ensure that we check paths, we don't turn around and go to the spot we were just at
      let curCoords = toVisit.pop() as Coordinates; // this is where we currently are
      steps++;
      let foundNode = false;

      while (foundNode === false) {
        let neighbors = this.getNeighbors(curCoords, lastCoords);


        if (neighbors.length > 1) {
          foundNode = true;
          const newNode = new Node(curCoords);
          node.addNeighbor(newNode).addPath(newNode, steps);
          console.log("Node:", node)
          console.log("New Node:", newNode)
          console.log("Steps:", steps)
          console.log("Neighbors:", neighbors)
        } else {
          toVisit.push(neighbors[0])
        }
      }

      
    }
  }

  getNeighbors(coordinates: Coordinates, lastSpot: Coordinates): Coordinates[] {
    let x = coordinates.x;
    let y = coordinates.y;

    let neighbors = [];

    const DT = [
      // up down left right
      { x: 0, y: -1 },
      { x: 0, y: 1 },
      { x: -1, y: 0 },
      { x: 1, y: 0 }
    ];

    for (let d of DT) {
      const ptn = { x: x + d.x, y: y + d.y }

      if (ptn.x === lastSpot.x && ptn.y === lastSpot.y) continue; // skip if its the spot we just came from

      if (ptn.x >= 0 && ptn.x < this.hikingMap[0].length &&
        ptn.y >= 0 && ptn.y < this.hikingMap.length &&
        this.hikingMap[ptn.y][ptn.x] !== "#") {
        neighbors.push(ptn);
      }
    }

    return neighbors;
  }
}

let test = new HikingMap(raw)
console.log(test.explorePath(test.mapRoot))
export function Day23Part1(raw: string) {
  return "Done"
}

const start = performance.now()
console.log(Day23Part1(raw))
const end = performance.now()
console.log(`Time taken:`, end - start, "ms")