import { describe, expect, it } from '@jest/globals';
import { Day12Part1, Day12Part2 } from './solution';

describe('Day 12 - Part 1 - Example Tests', () => {
  it('Example group has 6', () => {
    const input = `0 <-> 2
1 <-> 1
2 <-> 0, 3, 4
3 <-> 2, 4
4 <-> 2, 3, 6
5 <-> 6
6 <-> 4, 5`
    const result = Day12Part1(input);
    expect(result.groupCount).toEqual(6);
  });
});

describe('Day 12 - Part 2 - Example Tests', () => {
  it('2 total groups', () => {
    const input = `0 <-> 2
1 <-> 1
2 <-> 0, 3, 4
3 <-> 2, 4
4 <-> 2, 3, 6
5 <-> 6
6 <-> 4, 5`
    const intermediate = Day12Part1(input)
    const result = Day12Part2(intermediate.map);
    expect(result).toEqual(2);
  });
});