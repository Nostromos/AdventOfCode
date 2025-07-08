import { describe, expect, it } from '@jest/globals';
import { Day9 } from './solution';

describe('Day 9 - Part 1 - Example Tests', () => {
  it('Score of 1', () => {
    const input = `{}`.split("")
    const result = Day9(input);

    expect(result.score).toEqual(1);
  });

  it('Score of 6', () => {
    const input = `{{{}}}`.split("")
    const result = Day9(input);

    expect(result.score).toEqual(6);
  });

  it('Score of 5', () => {
    const input = `{{},{}}`.split("")
    const result = Day9(input);

    expect(result.score).toEqual(5);
  });

  it('Score of 16', () => {
    const input = `{{{},{},{{}}}}`.split("")
    const result = Day9(input);

    expect(result.score).toEqual(16);
  });

  it('Score of 1', () => {
    const input = `{<a>,<a>,<a>,<a>}`.split("")
    const result = Day9(input);

    expect(result.score).toEqual(1);
  });

  it('Score of 9', () => {
    const input = `{{<ab>},{<ab>},{<ab>},{<ab>}}`.split("")
    const result = Day9(input);

    expect(result.score).toEqual(9);
  });

  it('Score of 9', () => {
    const input = `{{<!!>},{<!!>},{<!!>},{<!!>}}`.split("")
    const result = Day9(input);

    expect(result.score).toEqual(9);
  });

  it('Score of 3', () => {
    const input = `{{<a!>},{<a!>},{<a!>},{<ab>}}`.split("")
    const result = Day9(input);

    expect(result.score).toEqual(3);
  });
});

describe('Day 9 - Part 2 - Example Tests', () => {
  it('0 chars', () => {
    const input = `<>`.split("")
    const result = Day9(input);

    expect(result.garbage).toEqual(0);
  });

  it('17 chars', () => {
    const input = `<random characters>`.split("")
    const result = Day9(input);

    expect(result.garbage).toEqual(17);
  });

  it('3 chars', () => {
    const input = `<<<<>`.split("")
    const result = Day9(input);

    expect(result.garbage).toEqual(3);
  });

  it('2 chars', () => {
    const input = `<{!>}>`.split("")
    const result = Day9(input);

    expect(result.garbage).toEqual(2);
  });

  it('0 chars', () => {
    const input = `<!!>`.split("")
    const result = Day9(input);

    expect(result.garbage).toEqual(0);
  });

  it('0 chars', () => {
    const input = `<!!!>>`.split("")
    const result = Day9(input);

    expect(result.garbage).toEqual(0);
  });

  it('10 chars', () => {
    const input = `<{o"i!a,<{i<a>`.split("")
    const result = Day9(input);

    expect(result.garbage).toEqual(10);
  });
});