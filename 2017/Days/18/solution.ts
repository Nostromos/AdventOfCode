import loadInput from "@/utils";

const PATH = "2017/Days/18/Input.txt"; // Relative to project root
const raw = loadInput(PATH);

export function processInput(raw: string) {
  return raw.split("\n").map(line => line.split(" "))
}

type Input = string[][];
const INPUT: Input = processInput(raw);

// -----------------------------------------
// --- Day 18: Duet ---
// -----------------------------------------

/**
 * Commands:
 * - snd x: plays sound with frequency equal to value of x
 * - set x y: sets x to y
 * - add x y: sets x to value of x + y
 * - mul x y: sets x to value of x * y
 * - mod x y: sets x to remainder of x % y
 * - rcv x: if x is not zero, last sound played is recovered. if x is zero, does nothing.
 * - jgz x y: jumps with offset of y IF x > 0
 */

class DuetAssembler {
  instructions: string[][];
  registers: Map<string, number>;
  index: number;
  lastFreq: number;
  rcvCount: number;

  constructor(input: string[][]) {
    this.instructions = input;
    this.registers = new Map();
    this.index = 0;
    this.lastFreq = 0;
    this.rcvCount = 0;
  }

  possibleInt = (s: string) => {
    return /^-?\d+$/.test(s) ? Number(s) : s;
  }

  processInstructions = () => {
    for (this.index; this.index >= 0 && this.index < this.instructions.length; this.index++) {
      let operation = this.instructions[this.index][0];
      let x = this.possibleInt(this.instructions[this.index][1]);
      let y = this.possibleInt(this.instructions[this.index][2]);

      if (typeof x == 'string' && typeof this.registers.get(x) == 'undefined') this.registers.set(x, 0);
      if (typeof y == 'string' && typeof this.registers.get(y) == 'undefined') this.registers.set(y, 0);

      switch (operation) {
        case 'snd':
          console.log("SND -", operation, x, y)
          this.snd(x as string);
          break;
        case 'set':
          console.log("SET -", operation, x, y)
          this.set(x as string, y);
          break;
        case 'add':
          console.log("ADD -", operation, x, y)
          this.add(x as string, y);
          break;
        case 'mul':
          console.log("MUL -", operation, x, y)
          this.mul(x as string, y);
          break;
        case 'mod':
          console.log("MOD -", operation, x, y)
          this.mod(x as string, y);
          break;
        case 'rcv':
          console.log("RCV -", operation, x)
          this.rcv(x as string);
          break;
        case 'jgz':
          console.log("JGZ -", operation, x, y)
          this.jgz(x, y);
          break;
        default:
          throw new Error('Unrecognized instruction')
      }

      console.log(this.registers)
      if (this.rcvCount > 0) return this.lastFreq;
    }
  }

  snd = (x: string) => {
    let reg = this.registers.get(x)
    // console.log(typeof reg, reg)
    if (reg) {
      this.lastFreq = reg;
    }
  }

  set = (x: string, y: string | number) => {
    let yreg;
    if (typeof y == 'string') {
      yreg = this.registers.get(y);
      if (yreg) this.registers.set(x, yreg);
    } else {
      this.registers.set(x, y)
    }
  }

  add = (x: string, y: string | number) => {
    let xreg = this.registers.get(x)
    let yreg;

    if (typeof y == 'string') {
      yreg = this.registers.get(y)
      if (yreg !== undefined && xreg !== undefined) this.registers.set(x, xreg + yreg)
    } else if (xreg !== undefined) {
      this.registers.set(x, xreg + y)
    }
  }

  mul = (x: string, y: string | number) => {
    let xreg = this.registers.get(x)
    let yreg;

    console.log("MUL: Does x exist?", xreg)

    if (typeof y == 'string') {
      yreg = this.registers.get(y)
      if (yreg && xreg) this.registers.set(x, xreg * yreg)
    } else if (xreg) {
      this.registers.set(x, xreg * y)
    } 
  }

  mod = (x: string, y: string | number) => {
    let xreg = this.registers.get(x)
    let yreg;

    if (typeof y == 'string') {
      yreg = this.registers.get(y)
      if (yreg && xreg) this.registers.set(x, xreg % yreg)
    } else if (xreg) {
      this.registers.set(x, xreg % y)
    }
  }

  rcv = (x: string) => {
    let xreg = this.registers.get(x)
    if (xreg && xreg !== 0) {
      this.rcvCount++;
      return this.lastFreq;
    } else {
      return false;
    }
  }

  jgz = (x: string | number, y: string | number) => {
    let xreg;
    let yreg;
    if (typeof x == 'string') {
      console.log("X is a string")
      xreg = this.registers.get(x);
      console.log("XReg:", xreg)
    } else {
      console.log("X is not a string")
      xreg = x;
    }

    if (typeof y == 'string') {
      console.log("Y is a string")
      yreg = this.registers.get(y);
      console.log("YReg:", xreg)
    } else {
      console.log("Y is not a string")
      yreg = y;
    }

    if (yreg !== undefined && xreg !== undefined) {
      if (xreg > 0) {
        this.index += yreg - 1;
      } else {
        console.log("jgz: did nothing. x is 0.")
      }
    }
  }
}


export function Day18(input: Input): number {
  let assembler = new DuetAssembler(input);
  const recovered = assembler.processInstructions();

  if (typeof recovered === 'number') {
    return recovered;
  } else {
    throw new Error('dafuq')
  }
}

export function Day18Part2(input: Input) {
  
}