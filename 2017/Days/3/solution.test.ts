import { describe, expect, it } from '@jest/globals';
import { day3Part1, day3Part2 } from './solution';

describe('Day 3 - Part 1 - Example Tests', () => {
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

// describe('Day 3 - Part 2 - Example Tests', () => {
//   it('square 1 returns 1', () => {
//     const input = 1;
//     let result = day3Part2(input);

//     expect(result).toEqual(1);
//   });

//   it('square 2 returns 1', () => {
//     const input = 2;
//     let result = day3Part2(input);

//     expect(result).toEqual(1);
//   });

//   it('square 3 returns 2', () => {
//     const input = 3;
//     let result = day3Part2(input);

//     expect(result).toEqual(2);
//   });

//   it('square 4 returns 4', () => {
//     const input = 4;
//     let result = day3Part2(input);

//     expect(result).toEqual(4);
//   });

//   it('square 5 returns 5', () => {
//     const input = 5;
//     let result = day3Part2(input);

//     expect(result).toEqual(5);
//   });

//   it('square 8 returns 23', () => {
//     const input = 8;
//     let result = day3Part2(input);

//     expect(result).toEqual(23);
//   });

//   it('square 12 returns 57', () => {
//     const input = 12;
//     let result = day3Part2(input);

//     expect(result).toEqual(57);
//   });

//   it('square 13 returns 59', () => {
//     const input = 13;
//     let result = day3Part2(input);

//     expect(result).toEqual(59);
//   });
// })