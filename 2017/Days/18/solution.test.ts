import { describe, expect, it } from '@jest/globals';
import { processInput, Day18, Day18Part2 } from './solution';

describe('Day 18 - Part 1 - Example Tests', () => {
  it('4 is last played sound', () => {
    const raw = `set a 1
add a 2
mul a a
mod a 5
snd a
set a 0
rcv a
jgz a -1
set a 1
jgz a -2`;
    const input = processInput(raw);
    const result = Day18(input);

    expect(result).toEqual(4);
  });
});

describe('Day 18 - Part 2 - Example Tests', () => {
  it('sends 3 times', () => {
    const raw = `snd 1
snd 2
snd p
rcv a
rcv b
rcv c
rcv d`;
    const input = processInput(raw);
    const result = Day18Part2(input);

    expect(result).toEqual(3);
  });
});