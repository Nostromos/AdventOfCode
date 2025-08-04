import { loadInput, parseLines } from "@/utils";

const PATH = "2024/Days/24/Input.txt";
const raw = loadInput(PATH);

class Wire {
  type: string;
  name: string;
  state: boolean | null;
  operations: boolean[];
  number: number;
  parents: Gate[];

  constructor(type: string, name: string, state: boolean | null) {
    this.type = type;
    this.name = name;
    this.state = state;
    this.operations = [];
    this.number = +`${name[1]}${name[2]}`;
    this.parents = [];
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

  gate.output.parents.push(gate);
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

  let wire1 = outputWires[0].parents;
  let str = "";
  for (let p of wire1) {
    str += `${p.operation}, `
  }
  console.log(str);

  let output = outputBin.split("").reverse().join('')
  return parseInt(output, 2)
}


function processInitialState(rawState: string): Map<string, Wire> {
  const wires = new Map();

  for (let wire of rawState.split("\n")) {
    const [name, state] = wire.split(": ")
    const newWire = new Wire(name[0], name, Number(state) == 1 ? true : false)
    wires.set(newWire.name, newWire)
  }

  return wires;
}

function processGates(rawGates: string) {
  const gates = rawGates.split("\n").map(line => {
    let [rawInputs, output] = line.split(" -> ")
    let [ri1, op, ri2] = rawInputs.split(" ")

    return {
      input1: ri1,
      input2: ri2,
      operation: op,
      output: output
    }
  })

  return gates;
}

function wiresToGates(gates: any[]) {
  const wireToGate = new Map();

  for (const gate of gates) {
    wireToGate.set(gate.output, {
      operation: gate.operation,
      input1: gate.input1,
      input2: gate.input2,
      output: gate.output
    })
  }

  return wireToGate;
}

type TraceNode = string | {
  wire: string;
  op: string;
  left: TraceNode;
  right: TraceNode;
}

function traverseParents(
  wire: string,
  wireToGate: Map<string, { operation: string, input1: string, input2: string, output: string }>,
  visited = new Set<string>()
): TraceNode {
  if (visited.has(wire)) {
    return wire;
  }
  visited.add(wire);

  const gate = wireToGate.get(wire);
  if (!gate) {
    return wire;
  }

  return {
    wire,
    op: gate.operation,
    left: traverseParents(gate.input1, wireToGate, visited),
    right: traverseParents(gate.input2, wireToGate, visited)
  };
}

export function Day24Part2(rawInput: string) {
  let [rawInitialState, rawGates] = rawInput.split("\n\n");

  const wires = processInitialState(rawInitialState);
  const gates = processGates(rawGates);
  const wireToGate = wiresToGates(gates);
  
  const findGate = (predicate: (g: any) => boolean) => gates.find(predicate);
  const findGates = (predicate: (g: any) => boolean) => gates.filter(predicate);

  const swappedWires = new Set<string>();
  
  const maxBit = Math.max(...Array.from(wires.keys())
    .filter(w => w.startsWith('x'))
    .map(w => parseInt(w.slice(1))));
  
  const wrongZOutputs: string[] = [];
  const suspiciousGates: any[] = [];
  
  const z00Gate = wireToGate.get('z00');
  if (z00Gate) {
    if (z00Gate.operation !== 'XOR' || 
        !((z00Gate.input1 === 'x00' && z00Gate.input2 === 'y00') ||
          (z00Gate.input1 === 'y00' && z00Gate.input2 === 'x00'))) {
      wrongZOutputs.push('z00');
    }
  }

  for (let i = 1; i <= maxBit; i++) {
    const zWire = `z${i.toString().padStart(2, '0')}`;
    const gate = wireToGate.get(zWire);
    if (gate && gate.operation !== 'XOR') {
      wrongZOutputs.push(zWire);
      console.log(`${zWire} has wrong gate type: ${gate.operation}`);
    }
  }
  
  for (const gate of gates) {
    const { input1, input2, operation, output } = gate;
    
    if (operation === 'XOR') {
      const isDirectXY = (
        (input1.startsWith('x') && input2.startsWith('y')) ||
        (input1.startsWith('y') && input2.startsWith('x'))
      ) && input1.slice(1) === input2.slice(1);
      
      if (isDirectXY && input1.slice(1) !== '00') {
        if (output.startsWith('z')) {
          suspiciousGates.push(gate);
          console.log(`XOR of ${input1}/${input2} outputs directly to ${output} (should be intermediate)`);
        }
      } else if (!isDirectXY && !output.startsWith('z')) {
        suspiciousGates.push(gate);
        console.log(`XOR gate outputs to ${output} instead of z`);
      }
    }
    
    if (operation === 'AND') {
      if (output.startsWith('z')) {
        suspiciousGates.push(gate);
        console.log(`AND gate outputs to ${output} (should never output to z)`);
      }
      
      const isXY = (
        (input1.startsWith('x') && input2.startsWith('y')) ||
        (input1.startsWith('y') && input2.startsWith('x'))
      ) && input1.slice(1) === input2.slice(1);
      
      if (isXY && input1.slice(1) !== '00') {
        const usedInOR = gates.some(g => 
          (g.input1 === output || g.input2 === output) && g.operation === 'OR'
        );
        
        if (!usedInOR) {
          suspiciousGates.push(gate);
          console.log(`AND of ${input1}/${input2} output ${output} doesn't feed into OR`);
        }
      }
    }
    
    if (operation === 'OR') {
      if (output.startsWith('z') && output !== `z${(maxBit + 1).toString().padStart(2, '0')}`) {
        suspiciousGates.push(gate);
        console.log(`OR gate outputs to ${output} (should not output to z)`);
      }
    }
  }
  
  console.log('\nWrong z outputs:', wrongZOutputs);
  console.log('Suspicious gates:', suspiciousGates.length);
  
  for (const zWire of wrongZOutputs) {
    swappedWires.add(zWire);
    const wrongGate = wireToGate.get(zWire);
    
    if (wrongGate) {
      const bitNum = parseInt(zWire.slice(1));
      
      const correctXOR = gates.find(g => {
        if (g.operation !== 'XOR' || g.output.startsWith('z')) return false;
        
        const input1Gate = wireToGate.get(g.input1);
        const input2Gate = wireToGate.get(g.input2);
        
        const xWire = `x${bitNum.toString().padStart(2, '0')}`;
        const yWire = `y${bitNum.toString().padStart(2, '0')}`;
        
        if (input1Gate && input1Gate.operation === 'XOR') {
          if ((input1Gate.input1 === xWire && input1Gate.input2 === yWire) ||
              (input1Gate.input1 === yWire && input1Gate.input2 === xWire)) {
            return true;
          }
        }
        if (input2Gate && input2Gate.operation === 'XOR') {
          if ((input2Gate.input1 === xWire && input2Gate.input2 === yWire) ||
              (input2Gate.input1 === yWire && input2Gate.input2 === xWire)) {
            return true;
          }
        }
        return false;
      });
      
      if (correctXOR) {
        console.log(`${zWire} should get output from ${correctXOR.output}`);
        swappedWires.add(correctXOR.output);
      }
    }
  }
  
  for (const gate of suspiciousGates) {
    if (gate.operation === 'XOR') {
      const isDirectXY = (
        (gate.input1.startsWith('x') && gate.input2.startsWith('y')) ||
        (gate.input1.startsWith('y') && gate.input2.startsWith('x'))
      ) && gate.input1.slice(1) === gate.input2.slice(1);
      
      if (isDirectXY && gate.output.startsWith('z') && gate.input1.slice(1) !== '00') {
        swappedWires.add(gate.output);
        const bitNum = parseInt(gate.output.slice(1));
      } else if (!isDirectXY && !gate.output.startsWith('z')) {
        swappedWires.add(gate.output);
      }
    }
  }
  
  for (const gate of gates) {
    if ((gate.operation === 'AND' || gate.operation === 'OR') && 
        gate.output.startsWith('z') && 
        gate.output !== `z${(maxBit + 1).toString().padStart(2, '0')}`) {
      swappedWires.add(gate.output);
    }
  }
  
  console.log('\\nSpecial analysis for fgt and nmq:');
  const fgtGate = gates.find(g => g.output === 'fgt');
  if (fgtGate) {
    console.log('fgt gate:', fgtGate);
    const fgtUsedIn = gates.filter(g => g.input1 === 'fgt' || g.input2 === 'fgt');
    console.log('fgt is used in:', fgtUsedIn);
  }
  
  const nmqGate = gates.find(g => g.output === 'nmq');
  if (nmqGate) {
    console.log('nmq gate:', nmqGate);
    
    const x17y17XOR = gates.find(g => {
      if (g.operation !== 'XOR') return false;
      return ((g.input1 === 'x17' && g.input2 === 'y17') ||
              (g.input1 === 'y17' && g.input2 === 'x17'));
    });
    
    if (x17y17XOR) {
      console.log('Found x17 XOR y17:', x17y17XOR.output);
      
      const xorUsedIn = gates.filter(g => 
        g.input1 === x17y17XOR.output || g.input2 === x17y17XOR.output
      );
      console.log('x17 XOR y17 is used in:', xorUsedIn);
      
      if (xorUsedIn.length > 0 && xorUsedIn[0].operation === 'OR') {
        console.log(`SWAP FOUND: fgt and ${x17y17XOR.output} are swapped!`);
        swappedWires.add('fgt');
        swappedWires.add(x17y17XOR.output);
      }
    }
  }
  
  console.log('\\nAnalyzing AND gates that should feed into OR:');
  for (const gate of gates) {
    if (gate.operation === 'AND') {
      const isXY = (
        (gate.input1.startsWith('x') && gate.input2.startsWith('y')) ||
        (gate.input1.startsWith('y') && gate.input2.startsWith('x'))
      ) && gate.input1.slice(1) === gate.input2.slice(1);
      
      if (isXY && gate.input1.slice(1) !== '00') {
        const usedIn = gates.filter(g => 
          g.input1 === gate.output || g.input2 === gate.output
        );
        
        if (usedIn.length > 0) {
          const consumer = usedIn[0];
          if (consumer.operation === 'XOR') {
            console.log(`AND ${gate.input1}/${gate.input2} output ${gate.output} feeds into XOR at ${consumer.output}`);
            swappedWires.add(gate.output);
            
            const bitNum = parseInt(gate.input1.slice(1));
            
            console.log(`Looking for carry OR for bit ${bitNum-1}...`);
            
            const carryOR = gates.find(g => {
              if (g.operation !== 'OR' || g.output.startsWith('z')) return false;
              
              const input1Gate = wireToGate.get(g.input1);
              const input2Gate = wireToGate.get(g.input2);
              
              const prevBit = (bitNum - 1).toString().padStart(2, '0');
              const xPrev = `x${prevBit}`;
              const yPrev = `y${prevBit}`;
              
              let hasPrevAND = false;
              if (input1Gate && input1Gate.operation === 'AND') {
                if ((input1Gate.input1 === xPrev && input1Gate.input2 === yPrev) ||
                    (input1Gate.input1 === yPrev && input1Gate.input2 === xPrev)) {
                  hasPrevAND = true;
                }
              }
              if (!hasPrevAND && input2Gate && input2Gate.operation === 'AND') {
                if ((input2Gate.input1 === xPrev && input2Gate.input2 === yPrev) ||
                    (input2Gate.input1 === yPrev && input2Gate.input2 === xPrev)) {
                  hasPrevAND = true;
                }
              }
              
              return hasPrevAND;
            });
            
            if (carryOR) {
              console.log(`Found carry OR: ${carryOR.output} (should be swapped with ${gate.output})`);
              swappedWires.add(carryOR.output);
            }
          }
        }
      }
    }
  }
  
  console.log('\nIdentified swapped wires:', Array.from(swappedWires).sort());
  
  if (swappedWires.size !== 8) {
    console.log(`Found ${swappedWires.size} wires, need exactly 8`);
    
    for (const gate of gates) {
      if (gate.operation === 'XOR' && !gate.output.startsWith('z')) {
        const isDirectXY = (
          (gate.input1.startsWith('x') && gate.input2.startsWith('y')) ||
          (gate.input1.startsWith('y') && gate.input2.startsWith('x'))
        ) && gate.input1.slice(1) === gate.input2.slice(1);
        
        if (!isDirectXY) {
          if (swappedWires.size < 8) {
            swappedWires.add(gate.output);
            console.log(`Adding second-stage XOR output: ${gate.output}`);
          }
        }
      }
    }
  }
  
  return Array.from(swappedWires).sort().slice(0, 8).join(',');
}

const start = performance.now()
console.log(Day24Part1(raw))
const end = performance.now()
console.log(`Time taken:`, end - start, "ms")

const start2 = performance.now()
console.log("Part 2:", Day24Part2(raw))
const end2 = performance.now()
console.log(`Time taken (Part 2):`, end2 - start2, "ms")