import { describe, expect, it } from '@jest/globals';
import { Day13 } from './solution';

describe('Day 13 - Part 1 - Example Tests', () => {
  it('Trip severity of 24', () => {
    const input = `0: 3
1: 2
4: 4
6: 4`
    const result = Day13(input);

    expect(result).toEqual(24);
  });
});