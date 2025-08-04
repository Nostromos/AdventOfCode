import loadInput from "@/utils";

const PATH = "2024/Days/24/Input.txt"; // Relative to project root
const raw = loadInput(PATH);

// -----------------------------------------
// --- Day 24: Crossed Wire ---
// -----------------------------------------

// type Gate = {
//   name: string;
//   state: number;
// }

enum Logic {
  AND = "AND",
  OR = "OR",
  XOR = "XOR"
}

class Gate {
  type: string;
  name: string;
  state: Number | null;
  inputs: Gate[];
  output: Gate | null;

  constructor(type: string, name: string, initialState: Number | null) {
    this.type = type;
    this.name = name;
    this.state = initialState;
    this.inputs = [];
    this.output = null;
  }

  addInput(gate: Gate) {
    if (this.inputs.some(input => input.name === gate.name)) {
      console.log(`[ERROR] ${this.name} already has ${gate.name} as an input.`)
      return;
    } else {
      this.inputs.push(gate);
      return this;
    }
  }

  addOutput(gate: Gate) {
    if (this.output === null) {
      this.output = gate;
      return this;
    } else {
      console.log(`[ERROR] Cannot add ${gate.name} as a parent. ${this.name} already has a parent (${this.output})`)
      return;
    }
  }

  updateState(num: Number) {
    // if (this.state === null) {
    //   throw Error(`[ERROR] Gate ${this.name} has null state`)
    // }
    this.state = num;
    // this.state === 1 ? this.state = 0 : this.state = 1;
    return this;
  }
}

class Circuit {
  type: Logic;
  inputs: Gate[];
  output: Gate;
  result: Number | null;

  constructor(type: Logic, inputs: Gate[], output: Gate) {
    this.type = type;
    this.inputs = inputs;
    this.output = output;
    this.result = null;
  }

  runLogic() {
    switch (this.type) {
      case Logic.AND:
        this.and();
        break;
      case Logic.OR:
        this.or();
        break;
      case Logic.XOR:
        this.xor();
        break;
      default:
        throw new Error("[ERROR] Logical operation not AND OR XOR")
    }
    // console.log(`[CIRCUIT] Inputs: ${this.inputs} -> ${this.type} => ${this.output}`)
    this.sendOutput();
  }

  and() {
    let [gate1, gate2] = this.inputs;

    if (gate1.state === 1 && gate2.state === 1) {
      this.result = 1;
    }

    this.result = 0;
  }

  or() {
    let [gate1, gate2] = this.inputs;

    if (gate1.state === 1 || gate2.state === 1) {
      this.result = 1;
    }

    this.result = 0;
  }

  xor() {
    let [gate1, gate2] = this.inputs;

    if (gate1.state !== gate2.state) {
      this.result = 1;
    }

    this.result = 0;
  }

  sendOutput() {
    this.output.updateState(this.result as Number)
  }
}

function processInput(rawInput: string) {
  const stateMap = new Map<Gate["name"], Gate>()
  const circuitList = new Array();

  const [rawInitialState, rawLogicGates] = rawInput.split("\n\n")

  console.log("Raw State:", rawInitialState);
  console.log("Raw Circuits:", rawLogicGates);

  // process initial state for initial gates
  const cleanInitialState = rawInitialState.split("\n").map(gate => {
    const type = gate[0]
    const [name, stateStr] = gate.split(": ");
    const state = Number(stateStr);
    const newGate = new Gate(type, name, state)
    stateMap.set(name, newGate)
  })

  for (let circuit of rawLogicGates.split("\n")) {
    const [inputs, output] = circuit.split(" -> ");
    const [input1, operation, input2] = inputs.split(" ");
    
    console.log("Circuit:", circuit);
    // Check if the gates exist: Create if not else retrieve
    let Input1, Input2, Output;
    if (!stateMap.has(input1)) {
      Input1 = new Gate(input1[0], input1, null)
      stateMap.set(Input1.type, Input1)
    } else {
      Input1 = stateMap.get(input1);
    }

    if (!stateMap.has(input2)) {
      console.log("Input2:", input2)
      Input2 = new Gate(input2[0], input2, null)
      stateMap.set(Input2.type, Input2)
    } else {
      Input2 = stateMap.get(input2);
    }

    if (!stateMap.has(output)) {
      Output = new Gate(output[0], output, null)
      stateMap.set(Output.name, Output)
    } else {
      Output = stateMap.get(output);
    }

    // Create the circuit
    let newCircuit;
    if (Input1 !== undefined && Input2 !== undefined && Output !== undefined) {
      newCircuit = new Circuit(operation as Logic, [Input1, Input2], Output)
      circuitList.push(newCircuit)
    } else {
      throw new Error("Error Creating Circuit - undefined inputs or outputs")
    }
  }

  return { state: stateMap, circuits: circuitList };
}


export function Day24Part1(rawInput: string) {
  let { state, circuits } = processInput(rawInput);

  for (let i = 0; i < circuits.length; i++) {
    let cur = circuits[i];
    console.log(circuits)
    cur.runLogic();
  }

  let outputgates: Gate[] = [];
  let outputs = state.forEach(gate => {
    console.log(gate)
    if (gate.type === "z") {
      outputgates.push(gate);
    }
  })

  console.log(outputgates);
}

export function Day24Part2(rawInput: string) {

}

const start = performance.now()
Day24Part1(raw)
const end = performance.now()
console.log(`Time taken:`, end - start, "ms")

// const start2 = performance.now()
// console.log(Day24Part2(raw))
// const end2 = performance.now()
// console.log(`Time taken (Part 2):`, end - start, "ms")