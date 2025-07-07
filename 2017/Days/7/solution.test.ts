import { describe, expect, it } from '@jest/globals';
import { Day7Part1, Day7Part2 } from './solution';

describe('Day 7 - Part 1 - Example Tests', () => {
  it('0 3 0 1 -3 takes 5 steps', () => {
    const input = `pbga (66)
xhth (57)
ebii (61)
havc (66)
ktlj (57)
fwft (72) -> ktlj, cntj, xhth
qoyq (66)
padx (45) -> pbga, havc, qoyq
tknk (41) -> ugml, padx, fwft
jptl (61)
ugml (68) -> gyxo, ebii, jptl
gyxo (61)
cntj (57)`
    const result = Day7Part1(input);

    expect(result.name).toEqual('tknk');
  });
});

// xdescribe('Day 7 - Part 2 - Example Tests', () => {
//   xit('2 4 1 2 takes 4 steps', () => {
//     const input = [2, 4, 1, 2];
//     const result = Day7Part2(input);

//     expect(result).toEqual(4);
//   });
// });