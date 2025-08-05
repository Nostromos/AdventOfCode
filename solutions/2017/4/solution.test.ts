import { describe, expect, it } from '@jest/globals';
import { day4Part1, day4Part2 } from './solution';

describe('Day 4 - Part 1 - Example Tests', () => {
  it('aa bb cc dd ee is a valid passphrase', () => {
    const input = "aa bb cc dd ee";
    const result = day4Part1(input);

    expect(result).toEqual(1);
  });

  it('aa bb cc dd aa is not valid', () => {
    const input = "aa bb cc dd aa";
    const result = day4Part1(input);

    expect(result).toEqual(0);
  });

  it('aa bb cc dd aaa is a valid passphrase', () => {
    const input = "aa bb cc dd aaa";
    const result = day4Part1(input);

    expect(result).toEqual(1);
  });
});

describe('Day 4 - Part 2 - Example Tests', () => {
  it('abcde fghij is a valid passphrase', () => {
    const input = "abcde fghij";
    const result = day4Part2(input);

    expect(result).toEqual(1);
  });

  it('abcde xyz ecdab is not valid', () => {
    const input = "abcde xyz ecdab";
    const result = day4Part2(input);

    expect(result).toEqual(0);
  });

  it('a ab abc abd abf abj is a valid passphrase', () => {
    const input = "a ab abc abd abf abj";
    const result = day4Part2(input);

    expect(result).toEqual(1);
  });

  it('iiii oiii ooii oooi oooo is valid', () => {
    const input = "iiii oiii ooii oooi oooo";
    const result = day4Part2(input);

    expect(result).toEqual(1);
  })

  it('oiii ioii iioi iiio is not valid', () => {
    const input = "oiii ioii iioi iiio";
    const result = day4Part2(input);

    expect(result).toEqual(0);
  })
});