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
  totalWeight?: number;

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

export function Day7Part2(root: Node): number {
  // First, calculate all total weights
  calculateTotalWeight(root);
  
  // Find the unbalanced node
  const result = findUnbalancedNode(root);
  if (!result) {
    console.log("No unbalanced node found");
    return 0;
  }
  
  const {node, targetWeight} = result;
  const currentTotal = node.totalWeight || 0;
  const difference = targetWeight - currentTotal;
  
  // The node's weight should be adjusted by the difference
  const correctWeight = (node.weight || 0) + difference;
  
  console.log(`Node ${node.name} should have weight ${correctWeight}`);
  return correctWeight;
}


// Calculate total weight for a node and all its children
function calculateTotalWeight(node: Node): number {
  if (!node.discs || node.discs.length === 0) {
    // Leaf node - just return its own weight
    node.totalWeight = node.weight || 0;
    return node.totalWeight;
  }
  
  // Calculate sum of all children's total weights
  let childrenSum = 0;
  for (let disc of node.discs) {
    if (typeof disc !== "string") {
      childrenSum += calculateTotalWeight(disc);
    }
  }
  
  // This node's total = its weight + all children
  node.totalWeight = (node.weight || 0) + childrenSum;
  return node.totalWeight;
}

// Find the node that needs its weight adjusted
function findUnbalancedNode(node: Node): {node: Node, targetWeight: number} | null {
  if (!node.discs || node.discs.length === 0) {
    return null; // Leaf nodes can't have unbalanced children
  }
  
  // Group children by their total weight
  const weightGroups = new Map<number, Node[]>();
  for (let disc of node.discs) {
    if (typeof disc !== "string") {
      const weight = disc.totalWeight || 0;
      if (!weightGroups.has(weight)) {
        weightGroups.set(weight, []);
      }
      weightGroups.get(weight)!.push(disc);
    }
  }
  
  // If all children have same total weight, check deeper
  if (weightGroups.size === 1) {
    // All balanced here, check each child
    for (let disc of node.discs) {
      if (typeof disc !== "string") {
        const result = findUnbalancedNode(disc);
        if (result) return result;
      }
    }
    return null;
  }
  
  // Find the odd one out
  let oddNode: Node | null = null;
  let targetWeight = 0;
  
  for (const [weight, nodes] of weightGroups) {
    if (nodes.length === 1) {
      oddNode = nodes[0];
    } else {
      targetWeight = weight; // The weight the odd one should have
    }
  }
  
  if (!oddNode) return null;
  
  // Check if the problem is deeper in the odd subtree
  const deeperProblem = findUnbalancedNode(oddNode);
  if (deeperProblem) return deeperProblem;
  
  // The odd node itself is the problem
  return {node: oddNode, targetWeight};
}


let root = Day7Part1(raw);
console.log(Day7Part2(root));