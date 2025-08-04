import loadInput from "@/utils";

const PATH = "2024/Days/24/Input.txt"; // Relative to project root
const raw = loadInput(PATH);

// -----------------------------------------
// --- Day 24: Crossed Wire ---
// -----------------------------------------

class Wire {
  type: string;
  name: string;
  state: boolean | null;
  operations: boolean[];
  number: number;

  constructor(type: string, name: string, state: boolean | null) {
    this.type = type;
    this.name = name;
    this.state = state;
    this.operations = [];
    this.number = +`${name[1]}${name[2]}`;
  }
}

class Gate {
  inputs: Wire[];
  output: Wire;
  operation: string;

  constructor(inputs: Wire[], output: Wire, operation: string) {
    this.inputs = inputs;
    this.output = output;
    this.operation = operation;
  }
}

function processGate(gate: Gate) {
  let [input1, input2] = gate.inputs;

  if (gate.operation === "AND") {
    if (input1.state === true && input2.state === true) {
      gate.output.state = true;
    } else {
      gate.output.state = false;
    }
  }

  if (gate.operation === "OR") {
    if (input1.state === true || input2.state === true) {
      gate.output.state = true;
    } else {
      gate.output.state = false;
    }
  }

  if (gate.operation === "XOR") {
    if (input1.state !== input2.state) {
      gate.output.state = true;
    } else {
      gate.output.state = false;
    }
  }
}

export function Day24Part1(rawInput: string) {
  const wires = new Map();
  const gates: Gate[] = [];

  const [rawInitialState, rawGates] = rawInput.split("\n\n")

  rawInitialState.split("\n").forEach(line => {
    const [wire, stateStr] = line.split(": ")
    const state = Number(stateStr) === 1 ? true : false;
    wires.set(wire, new Wire(wire[0], wire, state))
  })

  rawGates.split("\n").forEach(line => {
    let [input, output] = line.split(" -> ");
    let [i, op, j] = input.split(" ")

    let Input1, Input2, Output
    if (!wires.has(i)) {
      Input1 = new Wire(i[0], i, null)
      wires.set(Input1.name, Input1)
    } else {
      Input1 = wires.get(i);
    }

    if (!wires.has(j)) {
      Input2 = new Wire(j[0], j, null)
      wires.set(Input2.name, Input2)
    } else {
      Input2 = wires.get(j);
    }

    if (!wires.has(output)) {
      Output = new Wire(output[0], output, null)
      wires.set(Output.name, Output)
    } else {
      Output = wires.get(output);
    }

    let gate = new Gate([Input1, Input2], Output, op)
    if (Input1.state !== null && Input2.state !== null) {
      processGate(gate);
    } else {
      gates.push(gate);
    }
  })

  for (let i = 0; i < gates.length;) {
    // console.log("Processing:", gates[i])
    let cur = gates[i]

    let [input1, input2] = cur.inputs;
    let output = cur.output;

    if (input1.state !== null && input2.state !== null) {
      processGate(cur)
      gates.splice(i, 1);
      i = 0;
    } else {
      i++;
    }
  }

  let outputWires: Wire[] = [];
  wires.forEach(wire => {
    if (wire.type === "z") {
      outputWires.push(wire);
    }
  })
  outputWires.sort((a, b) => a.number - b.number)
  
  let outputBin = "";
  outputWires.forEach(wire => {
    if (wire.state === true) {
      outputBin += 1
    } else {
      outputBin += 0
    }
  })

  let output = outputBin.split("").reverse().join('')
  return parseInt(output, 2)
}

export function Day24Part2(rawInput: string) {
  /**
   * 1. Process Input
   */

  const [rawInitialState, rawGates] = rawInput.split("\n\n")
}

const start = performance.now()
console.log(Day24Part1(raw))
const end = performance.now()
console.log(`Time taken:`, end - start, "ms")

// const start2 = performance.now()
// console.log(Day24Part2(raw))
// const end2 = performance.now()
// console.log(`Time taken (Part 2):`, end - start, "ms")