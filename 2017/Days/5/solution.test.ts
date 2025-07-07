import { describe, expect, it } from '@jest/globals';
import { Day5Part1, Day5Part2 } from './solution';

describe('Day 5 - Part 1 - Example Tests', () => {
  it('0 3 0 1 -3 takes 5 steps', () => {
    const input = "0\n3\n0\n1\n-3";
    const result = Day5Part1(input);

    expect(result).toEqual(5);
  });
});

describe('Day 5 - Part 2 - Example Tests', () => {
  it('0 3 0 1 -3 takes 10 steps', () => {
    const input = "0\n3\n0\n1\n-3";
    const result = Day5Part2(input);

    expect(result).toEqual(10);
  });
});