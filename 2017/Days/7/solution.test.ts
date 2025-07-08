import { describe, expect, it } from '@jest/globals';
import { Day7Part1, Day7Part2 } from './solution';

describe('Day 7 - Part 1 - Example Tests', () => {
  it('tknk should be bottom program', () => {
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

describe('Day 7 - Part 2 - Example Tests', () => {
  it('the weight needed to balance should be 60', () => {
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
    const root = Day7Part1(input);
    const result = Day7Part2(root);

    expect(result).toEqual(60);
  });
});