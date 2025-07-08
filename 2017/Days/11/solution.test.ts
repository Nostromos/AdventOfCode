import { describe, expect, it } from '@jest/globals';
import { Day11Part1 } from './solution';

describe('Day 11 - Part 1 - Example Tests', () => {
  it('3 steps', () => {
    const input = `ne,ne,ne`.split(",")
    const result = Day11Part1(input);

    expect(result).toEqual(3);
  });

  it('0 steps', () => {
    const input = `ne,ne,sw,sw`.split(",")
    const result = Day11Part1(input);

    expect(result).toEqual(0);
  });

  it('2 steps', () => {
    const input = `ne,ne,s,s`.split(",")
    const result = Day11Part1(input);

    expect(result).toEqual(2);
  });

  it('3 steps', () => {
    const input = `se,sw,se,sw,sw`.split(",")
    const result = Day11Part1(input);

    expect(result).toEqual(3);
  });
});