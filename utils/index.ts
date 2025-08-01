import { readFileSync as fsReadFileSync } from 'node:fs';
import process from 'node:process';

export default function loadInput(path: string = ""): string {
  let inputPath;
  if (path.length == 0) {
    // get cwd, find input.txt and use that
    const cwd = process.cwd();
    inputPath = `${cwd}/Input.txt`;
  } else {
    inputPath = path;
  }

  const text = fsReadFileSync(inputPath, 'utf8')

  return text;
}

// Export all utilities
export * from './parsing';
export * from './grid';
export * from './algorithms';
export * from './math';
export * from './structures';
export * from './debug';