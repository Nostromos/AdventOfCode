import { describe, expect, it } from '@jest/globals';
import { day3Part1 } from './solution';

// Data from square 1 is carried 0 steps, since it's at the access port.
// Data from square 12 is carried 3 steps, such as: down, left, left.
// Data from square 23 is carried only 2 steps: up twice.
// Data from square 1024 must be carried 31 steps.

describe('Day 3 - Part 1 - Testing the examples...', () => {
  it('Data from square 1 is carried 0 steps', () => {
    const input = 1;
    const result = day3Part1(input);

    expect(result).toEqual(0);
  });

  it('Data from square 12 is carried 3 steps', () => {
    const input = 12;
    const result = day3Part1(input);

    expect(result).toEqual(3);
  });

  it('Data from square 23 is carried only 2 steps', () => {
    const input = 23;
    const result = day3Part1(input);

    expect(result).toEqual(2);
  });

  it('Data from square 1024 is carried 31 steps', () => {
    const input = 1024;
    const result = day3Part1(input);

    expect(result).toEqual(31);
  })

});

xdescribe('Day 3 - Part 2 - Example Tests', () => {
  it('', () => {
    const input = 0;
    let result;

    expect(result).toEqual(0);
  });
})