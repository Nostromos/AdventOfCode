import { describe, expect, it } from '@jest/globals';
import { Day8 } from './solution';

describe('Day 8 - Part 1 - Example Tests', () => {
  it('The largest value in the instructions is 1', () => {
    const input = `b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10`
    const result = Day8(input);

    expect(result.endMax).toEqual(1);
  });
});

describe('Day 8 - Part 2 - Example Tests', () => {
  it('The largest value ever seen is 10', () => {
    const input = `b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10`
    const result = Day8(input);

    expect(result.foreverMax).toEqual(10);
  });
});