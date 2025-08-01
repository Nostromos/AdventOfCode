import loadInput from "@/utils";

const PATH = "2023/Days/23/Input.txt"; // Relative to project root
const raw = loadInput(PATH);

// Define ANSI escape codes for colors and reset
const red = '\x1b[31m';
const green = '\x1b[32m';
const yellow = '\x1b[33m';
const blue = '\x1b[34m';
const reset = '\x1b[0m'; // Resets text formatting

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
  parents: Node[];
  leadsToEnd: boolean;

  constructor(coords: Coordinates) {
    this.coordinates = coords;
    this.neighbors = new Map();
    this.paths = [];
    this.parents = [];
    this.leadsToEnd = false;
  }

  getStrCoordinates() {
    const coords = `${this.coordinates.x},${this.coordinates.y}`;
    return coords;
  }

  addNeighbor(node: Node) {
    this.neighbors.set(node.getStrCoordinates(), node)
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
  addParent(parentNode: Node) {
    this.parents.push(parentNode);
  }
}

class HikingMap {
  hikingMap: string[][]
  start: Node;
  end: Node;
  nodes: Map<string, Node>; // Track all nodes by coordinates

  constructor(rawInput: string) {
    this.hikingMap = rawInput.trim().split("\n").map(line => line.split(""));
    this.nodes = new Map();

    let nodes = this.findStartAndEnd(this.hikingMap);
    this.start = new Node(nodes.start);
    this.end = new Node(nodes.end);

    // Add start and end to map
    this.nodes.set(this.start.getStrCoordinates(), this.start);
    this.nodes.set(this.end.getStrCoordinates(), this.end);
  }

  findStartAndEnd(map: string[][]) {
    let start, end;

    // start
    start = { x: map[0].findIndex((spot, i) => spot === "."), y: 0 }

    // end
    let lastRow = map[map.length - 1];
    let endX = lastRow.findIndex((spot) => spot === ".");
    end = { x: endX, y: map.length - 1 }

    return { start, end };
  }

  isValidMove(next: Coordinates, lastSpot: Coordinates) {
    // make sure its not the last spot we were at
    if (next.x === lastSpot.x && next.y === lastSpot.y) {
      return false;
    }

    // make sure its within bounds
    if (next.x < 0 || next.x >= this.hikingMap[0].length ||
      next.y < 0 || next.y >= this.hikingMap.length) {
      return false;
    }

    return this.hikingMap[next.y][next.x] !== "#"; // check if its a wall
  }

  getNeighbors(coordinates: Coordinates, lastSpot: Coordinates): Coordinates[] {
    let x = coordinates.x;
    let y = coordinates.y;
    let neighbors = [];

    let current = this.hikingMap[y][x]

    const DIRECTIONS = {
      up: { x: 0, y: -1 },
      down: { x: 0, y: 1 },
      left: { x: -1, y: 0 },
      right: { x: 1, y: 0 }
    }

    // check up down left right
    if (current === ">") {
      const next = { x: x + DIRECTIONS.right.x, y: y + DIRECTIONS.right.y };
      if (this.isValidMove(next, lastSpot)) {
        neighbors.push(next);
      }
      return neighbors;
    }

    if (current === "<") {
      const next = { x: x + DIRECTIONS.left.x, y: y + DIRECTIONS.left.y };
      if (this.isValidMove(next, lastSpot)) {
        neighbors.push(next);
      }
      return neighbors;
    }

    if (current === "^") {
      const next = { x: x + DIRECTIONS.up.x, y: y + DIRECTIONS.up.y };
      if (this.isValidMove(next, lastSpot)) {
        neighbors.push(next);
      }
      return neighbors;
    }

    if (current === "v") {
      const next = { x: x + DIRECTIONS.down.x, y: y + DIRECTIONS.down.y };
      if (this.isValidMove(next, lastSpot)) {
        neighbors.push(next);
      }
      return neighbors;
    }

    for (let d of Object.values(DIRECTIONS)) {
      const ptn = { x: x + d.x, y: y + d.y }
      if (this.isValidMove(ptn, lastSpot)) {
        neighbors.push(ptn);
      }
    }

    return neighbors;
  }

  isRouteToEnd(node: Node) {
    if (node.leadsToEnd === false) {
      node.leadsToEnd = true;
    }

    if (node.parents.length > 0) {
      for (let parent of node.parents) {
        this.isRouteToEnd(parent);
      }
    } else {
      return;
    }
  }

  explorePath(node: Node, path: Coordinates) {
    let current = path;
    let last = node.coordinates;
    let steps = 1;


    while (true) {
      // check if its the end
      if (current.x === this.end.coordinates.x && current.y === this.end.coordinates.y) {
        node.addPath(this.end, steps);
        // Don't add reverse path from end
        this.isRouteToEnd(node);
        return;
      }

      let neighbors = this.getNeighbors(current, last);

      // check dead end
      if (neighbors.length === 0) {
        return;
      }

      // check each neighbor
      if (neighbors.length > 1) {
        if (neighbors.length > 2) {
          console.log(red + "Multiple neighbors:", reset, neighbors);
        }
        let coordKey = `${current.x},${current.y}`;
        let junctionNode = this.nodes.get(coordKey);

        let isNewJunction = false;
        if (!junctionNode) {
          // Create new junction node only if it doesn't exist
          junctionNode = new Node(current);
          this.nodes.set(coordKey, junctionNode);
          isNewJunction = true;
        }

        // Always add path from current to junction
        node.addPath(junctionNode, steps);

        // Only explore from new junctions
        if (isNewJunction) {
          for (let neighbor of neighbors) {
            this.explorePath(junctionNode, neighbor)
          }
        }
        return;
      }

      steps++;
      last = current;
      current = neighbors[0];
    }
    // let next = [...this.getNeighbors(current, last)];

    // while (next.length >= 1) {
    //   steps++;
    //   last = current;
    //   current = next.pop() as Coordinates;
    //   let neighbors = this.getNeighbors(current, last)


    //   if (neighbors.length > 1) {
    //     let newNode = new Node(current);
    //     node.addNeighbor(newNode).addPath(newNode, steps);
    //     for (let neighbor of neighbors) {
    //       this.explorePath(newNode, neighbor)
    //     }
    //   } else if (neighbors.length === 0) {
    //     return;
    //   } else {
    //     next.push(neighbors[0])
    //   }
    // }

  }

  processMap() {
    let startNeighbors = this.getNeighbors(this.start.coordinates, this.start.coordinates) // we use start as last for this one

    for (let neighbor of startNeighbors) {
      this.explorePath(this.start, neighbor);
    }

    console.log("Graph built:");
    console.log("Total nodes:", this.nodes.size);
    console.log("Start node paths:", this.start.paths.length);
  }

  findLongestRoute() {
    console.log("\nFinding longest route...");
    console.log("Start node:", this.start.getStrCoordinates());
    console.log("End node:", this.end.getStrCoordinates());
    let visited = new Set<Node>()
    let result = this.dfs(this.start, this.end, visited, 0)
    console.log("Longest route found:", result);
    return result;
  }

  dfs(current: Node, target: Node, visited: Set<Node>, distance: number): number {
    if (current === target) {
      return distance;
    }

    visited.add(current);
    let maxDistance = 0;

    for (let path of current.paths) {
      if (!visited.has(path.target)) {
        let pathDistance = this.dfs(path.target, target, visited, distance + path.length);
        maxDistance = Math.max(maxDistance, pathDistance);
      }
    }

    visited.delete(current); // go back
    return maxDistance;
  }
}

class DryHikingMap {
  hikingMap: string[][]
  start: Node;
  end: Node;
  nodes: Map<string, Node>; // Track all nodes by coordinates

  constructor(rawInput: string) {
    this.hikingMap = rawInput.trim().split("\n").map(line => line.split(""));
    this.nodes = new Map();

    let nodes = this.findStartAndEnd(this.hikingMap);
    this.start = new Node(nodes.start);
    this.end = new Node(nodes.end);

    // Add start and end to map
    this.nodes.set(this.start.getStrCoordinates(), this.start);
    this.nodes.set(this.end.getStrCoordinates(), this.end);
  }

  findStartAndEnd(map: string[][]) {
    let start, end;

    // start
    start = { x: map[0].findIndex((spot, i) => spot === "."), y: 0 }

    // end
    let lastRow = map[map.length - 1];
    let endX = lastRow.findIndex((spot) => spot === ".");
    end = { x: endX, y: map.length - 1 }

    return { start, end };
  }

  isValidMove(next: Coordinates, lastSpot: Coordinates) {
    // make sure its not the last spot we were at
    if (next.x === lastSpot.x && next.y === lastSpot.y) {
      return false;
    }

    // make sure its within bounds
    if (next.x < 0 || next.x >= this.hikingMap[0].length ||
      next.y < 0 || next.y >= this.hikingMap.length) {
      return false;
    }

    return this.hikingMap[next.y][next.x] !== "#"; // check if its a wall
  }

  getNeighbors(coordinates: Coordinates, lastSpot: Coordinates): Coordinates[] {
    let x = coordinates.x;
    let y = coordinates.y;
    let neighbors = [];

    let current = this.hikingMap[y][x]

    const DIRECTIONS = {
      up: { x: 0, y: -1 },
      down: { x: 0, y: 1 },
      left: { x: -1, y: 0 },
      right: { x: 1, y: 0 }
    }

    // check up down left right
    if (current === ">") {
      const next = { x: x + DIRECTIONS.right.x, y: y + DIRECTIONS.right.y };
      if (this.isValidMove(next, lastSpot)) {
        neighbors.push(next);
      }
      return neighbors;
    }

    if (current === "<") {
      const next = { x: x + DIRECTIONS.left.x, y: y + DIRECTIONS.left.y };
      if (this.isValidMove(next, lastSpot)) {
        neighbors.push(next);
      }
      return neighbors;
    }

    if (current === "^") {
      const next = { x: x + DIRECTIONS.up.x, y: y + DIRECTIONS.up.y };
      if (this.isValidMove(next, lastSpot)) {
        neighbors.push(next);
      }
      return neighbors;
    }

    if (current === "v") {
      const next = { x: x + DIRECTIONS.down.x, y: y + DIRECTIONS.down.y };
      if (this.isValidMove(next, lastSpot)) {
        neighbors.push(next);
      }
      return neighbors;
    }

    for (let d of Object.values(DIRECTIONS)) {
      const ptn = { x: x + d.x, y: y + d.y }
      if (this.isValidMove(ptn, lastSpot)) {
        neighbors.push(ptn);
      }
    }

    return neighbors;
  }

  isRouteToEnd(node: Node) {
    if (node.leadsToEnd === false) {
      node.leadsToEnd = true;
    }

    if (node.parents.length > 0) {
      for (let parent of node.parents) {
        this.isRouteToEnd(parent);
      }
    } else {
      return;
    }
  }

  explorePath(node: Node, path: Coordinates) {
    let current = path;
    let last = node.coordinates;
    let steps = 1;


    while (true) {
      // check if its the end
      if (current.x === this.end.coordinates.x && current.y === this.end.coordinates.y) {
        node.addPath(this.end, steps);
        // Don't add reverse path from end
        this.isRouteToEnd(node);
        return;
      }

      let neighbors = this.getNeighbors(current, last);

      // check dead end
      if (neighbors.length === 0) {
        return;
      }

      // check each neighbor
      if (neighbors.length > 1) {
        if (neighbors.length > 2) {
          console.log(red + "Multiple neighbors:", reset, neighbors);
        }
        let coordKey = `${current.x},${current.y}`;
        let junctionNode = this.nodes.get(coordKey);

        let isNewJunction = false;
        if (!junctionNode) {
          // Create new junction node only if it doesn't exist
          junctionNode = new Node(current);
          this.nodes.set(coordKey, junctionNode);
          isNewJunction = true;
        }

        // Always add path from current to junction
        node.addPath(junctionNode, steps);

        // Only explore from new junctions
        if (isNewJunction) {
          for (let neighbor of neighbors) {
            this.explorePath(junctionNode, neighbor)
          }
        }
        return;
      }

      steps++;
      last = current;
      current = neighbors[0];
    }
  }

  processMap() {
    let startNeighbors = this.getNeighbors(this.start.coordinates, this.start.coordinates) // we use start as last for this one

    for (let neighbor of startNeighbors) {
      this.explorePath(this.start, neighbor);
    }

    console.log("Graph built:");
    console.log("Total nodes:", this.nodes.size);
    console.log("Start node paths:", this.start.paths.length);
  }

  findLongestRoute() {
    console.log("\nFinding longest route...");
    console.log("Start node:", this.start.getStrCoordinates());
    console.log("End node:", this.end.getStrCoordinates());
    let visited = new Set<Node>()
    let result = this.dfs(this.start, this.end, visited, 0)
    console.log("Longest route found:", result);
    return result;
  }

  dfs(current: Node, target: Node, visited: Set<Node>, distance: number): number {
    if (current === target) {
      return distance;
    }

    visited.add(current);
    let maxDistance = 0;

    for (let path of current.paths) {
      if (!visited.has(path.target)) {
        let pathDistance = this.dfs(path.target, target, visited, distance + path.length);
        maxDistance = Math.max(maxDistance, pathDistance);
      }
    }

    visited.delete(current); // go back
    return maxDistance;
  }
}

export function Day23Part1(raw: string) {
  let s = new HikingMap(raw);
  s.processMap();
  return s.findLongestRoute();
}

export function Day23Part2(raw: string) {
  let s = new DryHikingMap(raw);
  s.processMap();
  return s.findLongestRoute();
}

const start = performance.now()
console.log(Day23Part1(raw))
const end = performance.now()
console.log(`Time taken:`, end - start, "ms")

const start2 = performance.now()
console.log(Day23Part2(raw))
const end2 = performance.now()
console.log(`Time taken (Part 2):`, end - start, "ms")