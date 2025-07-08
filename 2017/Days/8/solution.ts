import loadInput from "@/utils";
import { register } from "module";

const PATH = "2017/Days/8/Input.txt"; // Relative to project root
const raw = loadInput(PATH);

// -----------------------------------------
// --- Day 8: I Heard You Like Registers ---
// -----------------------------------------

// --- Part 1 ---
type Operation = "inc" | "dec";

type Conditional = "==" | "!=" | "<" | "<=" | ">" | ">=";

type Condition = {
  comparator: string;     // e.g., "c"
  conditional: Conditional; // e.g., "=="
  value: number;      // e.g., 10
};

interface ProcessedInstruction {
  register: string;
  operation: Operation;
  amount: number;
  condition: Condition;
}

// class Processor {
//   instructions: ProcessedInstruction[];
//   registers: Map<string, number>;

//   constructor(rawInstructions: string) {
//     this.registers = new Map();
//     this.instructions = processInstructions(rawInstructions);
//   }
// }

export function Day8Part1(raw: string) {
  const registers = new Map<string, number>();
  const instructions = processInstructions(raw);
  let max = 0;

  for (let i = 0; i < instructions.length; i++) {
    let result = processSingleInstruction(registers, instructions[i], max);
    // console.count('Result')
    // console.group()
    // console.log("Registers:", registers)
    // console.log("New Max:", result)
    if (result > max) {
      max = result;
    }
    // console.groupEnd()
  }
  return { endMax: Math.max(...registers.values()), foreverMax: max };
}

function processSingleInstruction(map: Map<string, number>, instruction: ProcessedInstruction, max: number): number {
  let maxValue = max;
  console.log(instruction);
  if (!map.has(instruction.register)) {
    console.log("Map doesn't have the register... setting")
    map.set(instruction.register, 0) // check if map has the register -- create if not
  }
  if (!map.has(instruction.condition.comparator)) {
    console.log("Map doesn't have the conditional register... settting....")
    map.set(instruction.condition.comparator, 0) // check if map has conditional register -- create if not
  }

  // Get values of each register
  let register = map.get(instruction.register)
  let condRegister = map.get(instruction.condition.comparator)
  console.log("Reg & CondReg", register, condRegister)

  console.log(`${condRegister} ${instruction.condition.conditional} ${instruction.condition.value}`)
  let result = eval(`${condRegister} ${instruction.condition.conditional} ${instruction.condition.value}`)
  console.log("Result bool:", result)

  if (result == true && register !== undefined) {
    if (instruction.operation == "inc") {
      console.log("Operation is increase")
      register += instruction.amount
    } else {
      console.log("Operation is decrease")
      register -= instruction.amount
    }

    map.set(instruction.register, register);
  } else {
    console.error("[ERROR] Register:", register)
    console.error("[ERROR] Result:", result)
  }

  if (register && register > maxValue) maxValue = register;
  if (condRegister && condRegister > maxValue) maxValue = condRegister;

  return maxValue;

  // // Check the condition
  // let conditional = instruction.condition.conditional;
  // let evaluation = null;
  // // "==" | "!=" | "<" | "<=" | ">" | ">="
  // if (register !== undefined && condRegister !== undefined) {
  //   switch (conditional) {
  //     case "==":
  //       evaluation = (condRegister == instruction.condition.value)
  //       break;
  //     case "!=":
  //       evaluation = condRegister != instruction.condition.value
  //       break;
  //     case "<":
  //       evaluation = condRegister < instruction.condition.value
  //       break;
  //     case "<=":
  //       evaluation = condRegister <= instruction.condition.value
  //       break;
  //     case ">":
  //       evaluation = condRegister > instruction.condition.value
  //       break;
  //     case ">=":
  //       evaluation = condRegister >= instruction.condition.value
  //       break;
  //     default:
  //       console.error("Condition not handles by switch statement");
  //       break;
  //   }
  // }

  // if (evaluation && register !== undefined) {
  //   if (instruction.operation == "inc") {
  //     register += instruction.amount
  //   } else {
  //     register -= instruction.amount
  //   }

  //   if (register > maxValue) {
  //     maxValue = register
  //   }
    
  //   map.set(instruction.register, register);

  //   if (condRegister && condRegister > maxValue) {
  //     maxValue = condRegister
  //   }
  // } else {
  //   return max;
  // }
}

function processInstructions(raw: string): ProcessedInstruction[] {
  const rawInstructionsArr = raw.split("\n");
  const processedInstructions = rawInstructionsArr.map((line, i) => {
    const [operation, condition] = line.split(" if ")  
    const [register, action, value] = operation.split(" ")
    const [condRegister, condOperator, condValue] = condition.split(" ");

    return {
      register,
      operation: action as Operation,
      amount: Number(value),
      condition: {
        comparator: condRegister,
        conditional: condOperator as Conditional,
        value: Number(condValue)
      }
    } as ProcessedInstruction
  })

  return processedInstructions;
}


const input = `b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10`
console.log(Day8Part1(raw));