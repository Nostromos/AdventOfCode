import { loadInput } from "@/utils";
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

export function Day8(raw: string) {
  const registers = new Map<string, number>();
  const instructions = processInstructions(raw);
  let max = 0;

  for (let i = 0; i < instructions.length; i++) {
    let result = processSingleInstruction(registers, instructions[i], max);
    if (result > max) {
      max = result;
    }
  }
  return { endMax: Math.max(...registers.values()), foreverMax: max };
}

function processSingleInstruction(map: Map<string, number>, instruction: ProcessedInstruction, max: number): number {
  let maxValue = max;
  if (!map.has(instruction.register)) map.set(instruction.register, 0) // check if map has the register -- create if not
  if (!map.has(instruction.condition.comparator)) map.set(instruction.condition.comparator, 0) // check if map has conditional register -- create if not

  let register = map.get(instruction.register)
  let condRegister = map.get(instruction.condition.comparator)
  let result = eval(`${condRegister} ${instruction.condition.conditional} ${instruction.condition.value}`)

  if (result == true && register !== undefined) {
    if (instruction.operation == "inc") {
      console.log("Operation is increase")
      register += instruction.amount
    } else {
      console.log("Operation is decrease")
      register -= instruction.amount
    }

    map.set(instruction.register, register);
  } 

  if (register && register > maxValue) maxValue = register;
  if (condRegister && condRegister > maxValue) maxValue = condRegister;

  return maxValue;
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

console.log(Day8(raw));