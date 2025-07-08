# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Running Solutions
```bash
npm run solve -- <year> <day>  # Example: npm run solve -- 2017 1
```

### Testing
```bash
npm run jest                   # Run all tests
npm run jest 2017/Days/1      # Run tests for a specific day
```

### Development
Before running any solution, ensure an `Input.txt` file exists in the day's directory (e.g., `2017/Days/1/Input.txt`). These files are gitignored.

## Architecture

This repository contains TypeScript solutions for Advent of Code challenges, organized by year and day:

```
2017/Days/
├── 1-11/           # Individual day solutions
│   ├── solution.ts
│   ├── solution.test.ts
│   ├── Input.txt (gitignored)
│   └── Problem.md (gitignored)
└── Template/       # Boilerplate for new days
```

### Key Components

1. **Solution Runner** (`utils/run-solution.ts`): Dynamically imports and executes solutions based on year/day arguments.

2. **Input Loader** (`utils/index.ts`): 
   - `loadInput()`: Loads Input.txt from current working directory
   - `loadInput(path)`: Loads from custom path relative to project root

3. **Path Aliases**: TypeScript is configured with `@/` mapping to the root directory and `@/utils` for utilities.

### Solution Pattern

Each day's solution typically follows this structure:
```typescript
import { loadInput } from '@/utils';

const input = loadInput();

export function partOne(data: string): number {
  // Solution logic
}

export function partTwo(data: string): number {
  // Solution logic
}

console.log("Part 1:", partOne(input));
console.log("Part 2:", partTwo(input));
```

### Testing Pattern

Tests use Jest and follow Advent of Code examples:
```typescript
import { partOne, partTwo } from './solution';

describe('Day X', () => {
  const exampleInput = `...`;
  
  test('Part 1 example', () => {
    expect(partOne(exampleInput)).toBe(expectedResult);
  });
});
```

## Working with New Days

1. Copy the Template directory to create a new day
2. Add Input.txt file (personal puzzle input)
3. Implement solution in solution.ts
4. Add tests based on examples in solution.test.ts
5. Run with `npm run solve -- <year> <day>`