import { describe, expect, it } from '@jest/globals';
import { Day5Part1, Day5Part2 } from './solution';

describe('Day 5 - Part 1 - Example Tests', () => {
  it('Example 1 should be 143', () => {
    const input = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`
    const result = Day5Part1(input);

    expect(result).toEqual(143);
  });
});

xdescribe('Day 5 - Part 2 - Example Tests', () => {
  it('Example 1 should be 143', () => {
    const input = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`
    const result = Day5Part2(input);

    expect(result).toEqual(143);
  });
});