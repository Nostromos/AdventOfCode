import loadInput from "@/utils";

const PATH = "2017/Days/7/Input.txt"; // Relative to project root
const raw = loadInput(PATH);

class Node {
  name: string;
  weight: number | null;
  parent: Node | null;
  discs: Node[] | string[] | [];
  balanced: boolean | null;
  inspected: boolean;

  constructor(name: string, weight: number | null = null, parent: Node | null = null, discs: Node[] | string[] | [] = []) {
    this.name = name;
    this.weight = weight;
    this.parent = parent;
    this.discs = discs;
    this.balanced = null;
    this.inspected = false;
  }
}

export function Day7Part1(input: string) {
  let raw = input.split("\n")
  let NodeList = new Map<string, Node>();

  // Process all the lines
  for (let line of raw) {
    const [left, right] = line.split(" -> ")
    const [name, weightStr] = left.split(" (")
    const weight = Number(weightStr.slice(0, -1))
    const discs = right ? right.split(", ") : []
    
    let newNode = new Node(name, weight, null, discs)
    NodeList.set(newNode.name, newNode);
  }

  // Build the tree
  NodeList.forEach((node) => {
    if (node.discs && node.discs.length > 0) {
      const newDiscs: Node[] = [];

      for (const disc of node.discs as string[]) {
        const childNode = NodeList.get(disc);
        if (childNode) {
          childNode.parent = node;
          newDiscs.push(childNode);
        }
      }

      node.discs = newDiscs;
    }
  })

  const random = Array.from(NodeList.values())[0];
  let current = random;
  while (current.parent !== null) {
    current = current.parent;
  }

  return current;
}

export function Day7Part2(root: Node) {
  const towerList = root.discs;
  console.log(towerList);
}

let root = Day7Part1(raw);
console.log(Day7Part2(root));