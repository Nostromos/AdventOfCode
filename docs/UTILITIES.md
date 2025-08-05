# Advent of Code Utilities

This directory contains utility functions and data structures commonly needed for solving Advent of Code problems. Each module is designed to be reusable across different years and days.

## Modules Overview

### 📄 `parsing.ts` - Input Parsing Utilities
Common functions for parsing AoC input formats:
- **parseLines()** - Split input into lines, with optional empty line handling
- **parseGrid()** - Convert text into 2D character arrays
- **parseNumbers()** - Extract all numbers from strings
- **parseIntLines()** - Parse lines as integers
- **parseCSV()** - Parse comma-separated values
- **parseGroups()** - Split input by blank lines (passports, grouped data)
- **parseKeyValue()** - Parse key:value formatted data
- **parseNumberGrid()** - Parse numeric grids
- **parseInstructions()** - Parse command/instruction formats
- **parseCoordinates()** - Parse coordinate pairs in various formats

**Common Use Cases:**
- Day 1-style number lists: `parseIntLines()`
- Grid/maze problems: `parseGrid()`
- Grouped input (passports, rules): `parseGroups()`
- Assembly-like instructions: `parseInstructions()`

### 🎯 `grid.ts` - 2D Grid Operations
Utilities for working with 2D arrays/grids:
- **createGrid()** - Initialize grids with default values
- **createGridFrom()** - Create grid from input string
- **getNeighbors4/8()** - Get adjacent cells (4-way or 8-way)
- **inBounds()** - Boundary checking
- **rotateClockwise/CounterClockwise()** - Grid rotation
- **flipHorizontal/Vertical()** - Grid flipping
- **printGrid()** - Debug visualization
- **findInGrid()** - Search for values
- **cloneGrid()** - Deep copy grids
- **getAt/setAt()** - Safe grid access
- **floodFill()** - Fill connected regions
- **manhattanDistance()** - Calculate distances
- **getBorderPoints()** - Get perimeter cells

**Constants:**
- `DIRECTIONS_4` - Orthogonal directions
- `DIRECTIONS_8` - All 8 directions
- `DIRECTION_NAMES` - Direction labels

**Common Use Cases:**
- Pathfinding problems
- Game of Life variations
- Maze navigation
- Image processing tasks

### 🔍 `algorithms.ts` - Graph & Pathfinding Algorithms
Common algorithms for AoC problems:
- **bfs()** - Breadth-first search
- **dfs()** - Depth-first search
- **dijkstra()** - Shortest path with weights
- **aStar()** - A* pathfinding for grids
- **topologicalSort()** - Dependency ordering
- **findConnectedComponents()** - Group connected nodes
- **hasCycle()** - Cycle detection
- **findAllPaths()** - All paths between nodes
- **bellmanFord()** - Handles negative weights
- **floydWarshall()** - All-pairs shortest paths
- **findStronglyConnectedComponents()** - Kosaraju's algorithm
- **kruskalMST()** - Minimum spanning tree

**Common Use Cases:**
- Shortest path problems
- Dependency resolution
- Network connectivity
- Cycle detection in graphs

### 🔢 `math.ts` - Mathematical Utilities
Number theory and combinatorics:
- **gcd/lcm()** - Greatest common divisor/least common multiple
- **lcmMultiple()** - LCM of multiple numbers
- **isPrime()** - Primality testing
- **sieveOfEratosthenes()** - Generate primes
- **primeFactors()** - Factorization
- **permutations()** - Generate all permutations
- **combinations()** - Generate combinations
- **modPow()** - Modular exponentiation
- **modInverse()** - Modular multiplicative inverse
- **extendedGcd()** - Extended Euclidean algorithm
- **factorial()** - Calculate n!
- **binomial()** - Binomial coefficients
- **chineseRemainderTheorem()** - Solve congruences
- **arithmeticSum/geometricSum()** - Sequence sums
- **fibonacci()** - Generate Fibonacci numbers
- **isqrt()** - Integer square root

**Common Use Cases:**
- Cycle detection (LCM)
- Cryptography problems
- Combinatorial counting
- Number theory puzzles

### 📦 `structures.ts` - Data Structures
Efficient data structures for AoC:
- **PriorityQueue** - Min/max heap for Dijkstra, A*
- **UnionFind** - Disjoint sets for connectivity
- **DefaultDict** - Dictionary with default values
- **Counter** - Frequency counting
- **Deque** - Double-ended queue
- **Trie** - Prefix tree for string problems

**Common Use Cases:**
- **PriorityQueue**: Pathfinding, scheduling
- **UnionFind**: Connected components, MST
- **DefaultDict**: Counting without initialization
- **Counter**: Frequency analysis
- **Deque**: BFS with levels, sliding windows
- **Trie**: Word searches, autocomplete

### 🐛 `debug.ts` - Debugging & Performance Tools
Tools for development and optimization:
- **benchmark()** - Time function execution
- **benchmarkAsync()** - Time async operations
- **memoize()** - Cache function results
- **assert()** - Custom assertions
- **StepLogger** - Track algorithm steps
- **visualizeGrid()** - Grid visualization
- **ProgressTracker** - Progress bars for long operations
- **MemoryTracker** - Monitor memory usage
- **createRateLimiter()** - Rate limiting
- **createDebugLogger()** - Conditional logging

**Common Use Cases:**
- Performance optimization
- Algorithm debugging
- Memory leak detection
- Progress tracking in long solutions

## Usage Examples

### Example 1: Grid-based Pathfinding
```typescript
import { parseGrid, aStar, manhattanDistance } from '@/utils';

const input = loadInput();
const grid = parseGrid(input);
const start: Point = [0, 0];
const goal: Point = [grid.length - 1, grid[0].length - 1];

const path = aStar(grid, start, goal, 
  (cell) => cell !== '#',
  manhattanDistance
);
```

### Example 2: Parsing Complex Input
```typescript
import { parseGroups, parseKeyValue } from '@/utils';

const groups = parseGroups(input);
const passports = groups.map(group => parseKeyValue(group));
```

### Example 3: Graph Problems
```typescript
import { dijkstra, Graph } from '@/utils';

const graph: Graph<string> = new Map();
// Build graph...
const result = dijkstra(graph, 'start', 'end');
console.log(`Shortest path: ${result.distance}`);
```

### Example 4: Performance Optimization
```typescript
import { memoize, benchmark } from '@/utils';

const expensiveFunction = memoize((n: number) => {
  // Complex recursive calculation
});

const result = benchmark(() => {
  return expensiveFunction(40);
}, "Fibonacci calculation");
```

## Tips for Advent of Code

1. **Start with parsing**: Get your input into a workable format first
2. **Visualize grids**: Use `printGrid()` to debug grid problems
3. **Profile performance**: Use `benchmark()` to find bottlenecks
4. **Memoize recursion**: Cache results for recursive solutions
5. **Use the right algorithm**: BFS for unweighted, Dijkstra for weighted
6. **Track progress**: Use `ProgressTracker` for long-running solutions

## Adding New Utilities

When adding new utilities:
1. Add comprehensive JSDoc comments
2. Include usage examples
3. Export from the module
4. Update this documentation
5. Consider edge cases and error handling