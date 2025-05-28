import { describe, expect, it } from '@jest/globals';
import InverseCaptcha2Pointer from './solution';

describe('Day 1 - Example Tests', () => {
  it('1122 produces sum of 3', () => {
    const input = "1122";
    const result = InverseCaptcha2Pointer(input);

    expect(result).toBe(3);
  });

  it('1111 produces sum of 4', () => {
    const input = "1111";
    const result = InverseCaptcha2Pointer(input);

    expect(result).toBe(4);
  });

  it('1234 produces sum of 0', () => {
    const input = "1234";
    const result = InverseCaptcha2Pointer(input);

    expect(result).toBe(0);
  });

  it('91212129 produces sum of 9', () => {
    const input = "91212129";
    const result = InverseCaptcha2Pointer(input);

    expect(result).toBe(9);
  });
})