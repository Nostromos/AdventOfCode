import { describe, expect, it } from '@jest/globals';
import { Day2Part1, Day2Part2 } from './solution';

describe('Day 2 - Part 1 - Example Tests', () => {
  it('2 reports are safe', () => {
    const input = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`
    const result = Day2Part1(input);

    expect(result).toEqual(2);
  });
});