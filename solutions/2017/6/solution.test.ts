import { describe, expect, it } from '@jest/globals';
import { Day6Part1, Day6Part2 } from './solution';

describe('Day 6 - Part 1 - Example Tests', () => {
  it('0 2 7 0 takes 5 steps', () => {
    const input = [0, 2, 7, 0];
    const result = Day6Part1(input);

    expect(result.cycleCount).toEqual(5);
  });
});

describe('Day 6 - Part 2 - Example Tests', () => {
  it('2 4 1 2 takes 4 steps', () => {
    const input = [2, 4, 1, 2];
    const result = Day6Part2(input);

    expect(result.cycleCount).toEqual(4);
  });
});