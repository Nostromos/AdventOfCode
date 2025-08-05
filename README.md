![Advent of Code Logo](https://repository-images.githubusercontent.com/112706767/160be980-3b1a-11eb-9dbe-439a40adfa99)
<h1 align="center"><i>Advent of Code</i></h1>

<p align="center">
  <a>
    <img alt="Typescript" src="https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=for-the-badge" />
  </a> 
  <a>
    <img alt="Node.js" src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white" />
  </a>
  <a>
    <img alt="tsx" src="https://img.shields.io/static/v1?style=for-the-badge&message=tsx&color=3178C6&logo=tsx&logoColor=FFFFFF&label=" />
  </a>
  <a>
    <img alt="Jest" src="https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white" />
  </a>
</p>

## Overview

These are my [Advent of Code](https://adventofcode.com/) solutions for years 2017 to 2024, written in TypeScript as part of the [Recurse Center](https://recurse.com/)'s Advent of Code group.

In most cases, I optimized for solving the problem quickly, so some of these solutions are... messy. **But they (mostly) work!** 🎄

I've added all problems I attempt, whether or not I completed them.

## Progress

| Year | Progress                                                                                     |
| ---- | -------------------------------------------------------------------------------------------- |
| 2017 | ![](https://geps.dev/progress/50?dangerColor=006600&warningColor=006600&successColor=006600) |
| 2019 | ![](https://geps.dev/progress/4?dangerColor=006600&warningColor=006600&successColor=006600)  |
| 2023 | ![](https://geps.dev/progress/4?dangerColor=006600&warningColor=006600&successColor=006600)  |
| 2024 | ![](https://geps.dev/progress/12?dangerColor=006600&warningColor=006600&successColor=006600) |

## Features

- **TypeScript solutions** with strong typing
- **Comprehensive utility library** for common AoC patterns (grids, graphs, pathfinding, etc.)
- **Jest test suite** with examples from problem descriptions
- **Solution runner** for easy execution
- **Template generator** for quickly starting new days

## Installation

```zsh
# Clone the repository
git clone https://github.com/Nostromos/AdventOfCode
cd AdventOfCode
```
```
# Install dependencies
npm install
```

## Usage

### Running Solutions

```zsh
# Run a specific day's solution
npm run solve -- <year> <day>
```
```
# Example: Run 2024 Day 1
npm run solve -- 2024 1
```

### Creating New Solutions

```zsh
# Generate files for a new day
npm run new-solution -- <year> <day>
```
```
# Example: Create template for 2024 Day 25
npm run new-solution -- 2024 25
```

This creates:
- `solutions/<year>/<day>/solution.ts` - Solution file with boilerplate
- `solutions/<year>/<day>/solution.test.ts` - Test file template
- `solutions/<year>/<day>/Input.txt` - Empty input file
- `solutions/<year>/<day>/Problem.md` - Problem description placeholder

### Running Tests

```zsh
# Run all tests
npm run jest
```
```
# Run tests for a specific day
npm run jest 2024/1
```
```
# Run tests with coverage
npm run jest -- --coverage
```

## Project Structure

```
solutions/                 # All solutions organized by year and day
├─ 2017/                  
│  ├─ 1/                  
│  │  ├─ Input.txt        # Puzzle input (gitignored)
│  │  ├─ Problem.md       # Problem description (gitignored)
│  │  ├─ solution.ts      # Solution implementation
│  │  └─ solution.test.ts # Test cases from examples
│  ├─ 2/
│  └─ .../
├─ 2019/
├─ 2023/
└─ 2024/

utils/                    # Reusable utilities for AoC problems
├─ index.ts               # Main exports and input loading
├─ parsing.ts             # Input parsing utilities
├─ grid.ts                # 2D grid operations
├─ algorithms.ts          # Graph algorithms (BFS, DFS, Dijkstra, etc.)
├─ math.ts                # Mathematical utilities
├─ structures.ts          # Data structures (PriorityQueue, UnionFind, etc.)
├─ debug.ts               # Debugging and performance tools
└─ Template/              # Templates for new solutions

docs/                     # Documentation and notes
```

## Utility Library

The `utils/` directory contains a comprehensive library of utilities commonly needed for AoC:

- **Parsing**: Line splitting, number extraction, grid parsing, grouped input
- **Grid Operations**: 2D array manipulation, neighbors, rotation, pathfinding
- **Algorithms**: BFS, DFS, Dijkstra, A*, topological sort, cycle detection
- **Math**: GCD/LCM, prime numbers, combinatorics, modular arithmetic
- **Data Structures**: Priority queue, union-find, trie, deque
- **Debugging**: Benchmarking, memoization, grid visualization

See [docs/UTILITIES.md](utils/UTILITIES.md) for detailed documentation.

## Input Files

Due to Advent of Code's policy, puzzle inputs and problem descriptions are not included in this repository. You'll need to:

1. Get your puzzle input from [adventofcode.com](https://adventofcode.com)
2. Paste it in the `Input.txt` file in the appropriate day's directory
3. Optionally, save the problem description in the `Problem.md` file under the same directory.

These files are `.gitignore`ed to respect the author's wishes and IP. The only way to have fun is solving these yourself with your own input!

## Development

### Requirements

- Node.js 18+ 
- npm or pnpm

### Configuration

- TypeScript configuration in `tsconfig.json`
- Jest configuration in `jest.config.ts`
- Path aliases configured for `@/` and `@/utils`

## Notes

- Solutions prioritize getting the right answer quickly over code elegance
- Some solutions may contain exploratory code or alternative approaches
- The utility library has evolved over time, so not all solutions use the latest utilities
- Performance timings are included in solution output

## Acknowledgements

Thanks to [Claire](https://github.com/clairefro), [Bret](https://github.com/BretHudson), and [Florian](https://github.com/rafl) for the meetings, patience, and good nature.

Big ups to [Eric Wastl](https://github.com/topaz) for creating these. 

## License

See the [LICENSE](./LICENSE) file for more information.