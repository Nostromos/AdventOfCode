import { describe, expect, it } from '@jest/globals';
import { Day22 } from './solution';

describe('Day 22 - Part 1 - Example Tests', () => {
  it('1 should be at index 4', () => {
    const raw = `deal with increment 7
deal into new stack
deal into new stack
cut 6
deal with increment 7
deal into new stack
deal with increment 7
deal with increment 9
cut -2
deal into new stack
cut -2
deal with increment 7
cut 8
cut -4
deal with increment 7
cut 3
deal with increment 9
deal with increment 3
cut -1`
    const result = Day22(raw, 10, 1);

    expect(result).toEqual(4);
  });
});