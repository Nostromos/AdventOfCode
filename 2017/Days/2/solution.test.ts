import { describe, expect, it } from '@jest/globals';
import { GetChecksum } from './solution';

describe('Day 2 - Part 1 - Testing the examples...', () => {
  it('Produces checksum of 18', () => {
    const input = `5 1 9 5
    7 5 3
    2 4 6 8`;
    const result = GetChecksum(input);

    expect(result).toEqual(18);
  });

});