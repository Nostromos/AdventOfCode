import { describe, expect, it } from '@jest/globals';
import { Day10Part1, Day10Part2 } from './solution';

describe('Day 10 - Part 1 - Example Tests', () => {
  it('First two numbers should produce 12', () => {
    const list = 5
    const input = '3,4,1,5'
    const result = Day10Part1(input, list);

    expect(result).toEqual(12);
  });
});

describe('Day 10 - Part 2 - Example Tests', () => {
  it('Empty String', () => {
    const input = ''.trim().split('').map(char => char.charCodeAt(0)).concat([17, 31, 73, 47, 23])
    const result = Day10Part2(input);

    expect(result).toEqual('a2582a3a0e66e6e86e3812dcb672a272');
  });

  it('AoC 2017', () => {
    const input = 'AoC 2017'.trim().split('').map(char => char.charCodeAt(0)).concat([17, 31, 73, 47, 23])
    const result = Day10Part2(input);

    expect(result).toEqual('33efeb34ea91902bb2f59c9920caa6cd');
  });

  it('123', () => {
    const input = '1,2,3'.trim().split('').map(char => char.charCodeAt(0)).concat([17, 31, 73, 47, 23])
    const result = Day10Part2(input);

    expect(result).toEqual('3efbe78a8d82f29979031a4aa0b16a9d');
  });

  it('124', () => {
    const input = '1,2,4'.trim().split('').map(char => char.charCodeAt(0)).concat([17, 31, 73, 47, 23])
    const result = Day10Part2(input);

    expect(result).toEqual('63960835bcdc130f0b66d7ff4f6a5a8e');
  });
});