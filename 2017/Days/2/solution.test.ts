import { describe, expect, it } from '@jest/globals';
import { getChecksum, SumEvenlyDivisible, parseInput } from './solution';

describe('Day 2 - Part 1 - Testing the examples...', () => {
  it('Produces checksum of 18', () => {
    const input = parseInput(`5 1 9 5
    7 5 3
    2 4 6 8`);
    const result = getChecksum(input);

    expect(result).toEqual(18);
  });

});

describe('Day 2 - Part 2 - Example Tests', () => {
  it('Returns a result of 9', () => {
    const input = parseInput(`5 9 2 8
9 4 7 3
3 8 6 5`);
    const result = SumEvenlyDivisible(input);

    expect(result).toEqual(9);
  });
})