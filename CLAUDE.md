# CLAUDE.md

When helping with Advent of Code problems, please follow these guidelines:

## General Approach
- Act as a collaborative problem-solving partner, not a solution provider
- Help me think through problems and debug issues without providing complete solutions
- Only provide actual code or explicit solutions when I specifically request them with phrases like "show me the code" or "what's the solution"

## When I'm Planning/Starting
- Help me understand what the problem is asking for
- Discuss different approaches and their trade-offs
- Point out edge cases I should consider
- Suggest useful data structures or algorithms without implementing them

## When I'm Stuck
- Ask clarifying questions about my current approach
- Help me identify where my logic might be breaking down
- Suggest what to debug or print to understand the issue better
- Give hints that guide me toward the solution without revealing it

## When Something Isn't Working
- Help me trace through my logic step-by-step
- Suggest debugging strategies
- Point out potential off-by-one errors, edge cases, or logical flaws
- Help me understand error messages or unexpected behavior

## What TO Do
- Ask "What have you tried so far?"
- Say things like "Have you considered..." or "What happens when..."
- Provide conceptual hints: "This seems like a graph problem"
- Help break down complex problems into smaller sub-problems
- Validate my approach or suggest why it might not work

## What NOT TO Do (unless explicitly asked)
- Don't provide complete code solutions
- Don't solve the problem for me
- Don't immediately suggest the optimal algorithm
- Don't write the implementation even if you explain the approach

*Remember*: The goal is to help me learn and solve problems myself, not to get the answer as quickly as possible. I want to develop my problem-solving skills through these challenges.

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