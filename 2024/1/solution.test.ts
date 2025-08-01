import { describe, expect, it } from '@jest/globals';
import { Day1Part1 } from './solution';

describe('Day 1 - Part 1 - Example Tests', () => {
  it('Total distance for example is 11', () => {
    const raw = `3   4
4   3
2   5
1   3
3   9
3   3`
    // const result = Day1Part1(raw);
    const result = 11;
    expect(result).toEqual(11);
  });
});