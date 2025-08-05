import { describe, expect, it } from '@jest/globals';
import { InverseCaptcha2Pointer, InverseCaptchaPart2 } from './solution';

describe('Day 1 - Part 1 - Testing the examples...', () => {
  it('1122 produces sum of 3', () => {
    const input = "1122";
    const result = InverseCaptcha2Pointer(input);

    expect(result).toEqual(3);
  });

  it('1111 produces sum of 4', () => {
    const input = "1111";
    const result = InverseCaptcha2Pointer(input);

    expect(result).toEqual(4);
  });

  it('1234 produces sum of 0', () => {
    const input = "1234";
    const result = InverseCaptcha2Pointer(input);

    expect(result).toEqual(0);
  });

  it('91212129 produces sum of 9', () => {
    const input = "91212129";
    const result = InverseCaptcha2Pointer(input);

    expect(result).toEqual(9);
  });
});

describe("Day 1 - Part 2 - Testing the examples...", () => {
  test('1212 produces sum of 6', () => {
    const input = "1212";
    const result = InverseCaptchaPart2(input);

    expect(result).toEqual(6);
  });

  test('1221 produces sum of 0', () => {
    const input = "1221";
    const result = InverseCaptchaPart2(input);

    expect(result).toEqual(0);
  });

  test('123425 produces sum of 4', () => {
    const input = "123425";
    const result = InverseCaptchaPart2(input);

    expect(result).toEqual(4);
  });

  test('123123 produces sum of 12', () => {
    const input = "123123";
    const result = InverseCaptchaPart2(input);

    expect(result).toEqual(12);
  });

  test('12131415 produces sum of 4', () => {
    const input = "12131415";
    const result = InverseCaptchaPart2(input);

    expect(result).toEqual(4);
  });
})