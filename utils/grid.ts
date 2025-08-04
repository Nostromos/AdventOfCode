/**
 * Grid/2D Array Utilities for Advent of Code
 * 
 * This module contains utilities for working with 2D grids, which are extremely
 * common in AoC problems (mazes, game of life, path finding, etc.)
 */

// Common direction vectors
export const DIRECTIONS_4 = [[0, 1], [1, 0], [0, -1], [-1, 0]]; // Right, Down, Left, Up
export const DIRECTIONS_8 = [[0, 1], [1, 0], [0, -1], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]];
export const DIRECTION_NAMES_4 = ['R', 'D', 'L', 'U']; // Matches DIRECTIONS_4 order
export const DIRECTION_NAMES_8 = ['R', 'D', 'L', 'U', 'DR', 'DL', 'UR', 'UL'];
export const COMPASS_NAMES_4 = ['N', 'S', 'E', 'W'];
export const COMPASS_NAMES_8 = ['N', 'S', 'E', 'W', 'NE', 'NW', 'SE', 'SW']

// Type definitions
export type Grid<T> = T[][];
export type Point = [number, number];
export type Direction = [number, number];

/**
 * Create a 2D grid filled with a default value
 * 
 * @param rows - Number of rows
 * @param cols - Number of columns
 * @param defaultValue - Value to fill the grid with
 * @returns 2D array filled with defaultValue
 * 
 * @example
 * // Create a 10x10 grid of zeros
 * const grid = createGrid(10, 10, 0);
 */
export function createGrid<T>(rows: number, cols: number, defaultValue: T): Grid<T> {
  return Array.from({ length: rows }, () => Array(cols).fill(defaultValue));
}

/**
 * Create a 2D grid from an input (usually a string)
 * 
 * @param input - the input, usually a string
 * @returns 2D array from that input
 * 
 * @example
 * // Create a grid from a raw string
 * const grid = createGrid(rawInput);
 */
export function createGridFrom<T>(input: string, rowSeparator: string, colSeparator: string, transform?: (cell: string) => T): Grid<T> {
  const rows = input.split(rowSeparator);

  if (transform) {
    return rows.map(row => row.split(colSeparator).map(cell => transform(cell)))
  } else {
    return rows.map(row => row.split(colSeparator)) as Grid<T>
  }
}

/**
 * Get all neighbors of a cell (4-directional)
 * 
 * @param grid - The 2D grid
 * @param row - Row index
 * @param col - Column index
 * @returns Array of neighbor coordinates that are in bounds
 * 
 * @example
 * // Get orthogonal neighbors
 * const neighbors = getNeighbors4(grid, 5, 5);
 * // Returns: [[5, 6], [6, 5], [5, 4], [4, 5]] (if all in bounds)
 */
export function getNeighbors4<T>(grid: Grid<T>, row: number, col: number): Point[] {
  if (grid === null || grid === undefined || grid.length === 0 || grid[0].length === 0) {
    throw new Error("Can't get neighbors! Grid is empty or undefined.")
  }

  const height = grid.length;
  const width = grid[0].length;
  const neighbors: Point[] = [];

  for (let d of DIRECTIONS_4) {
    let [r, c] = [row + d[0], col + d[1]]

    if (r >= 0 && r < height && c >= 0 && c < width) {
      neighbors.push([r, c] as Point);
    }
  }

  return neighbors;
}

/**
 * Get all neighbors of a cell (8-directional, includes diagonals)
 * 
 * @param grid - The 2D grid
 * @param row - Row index
 * @param col - Column index
 * @returns Array of neighbor coordinates that are in bounds
 * 
 * @example
 * // Get all 8 neighbors including diagonals
 * const neighbors = getNeighbors8(grid, 5, 5);
 */
export function getNeighbors8<T>(grid: Grid<T>, row: number, col: number): Point[] {
  if (grid === null || grid === undefined || grid.length === 0 || grid[0].length === 0) {
    throw new Error("Can't get neighbors! Grid is empty or undefined.")
  }

  const height = grid.length;
  const width = grid[0].length;
  const neighbors: Point[] = [];

  for (let d of DIRECTIONS_8) {
    let [r, c] = [row + d[0], col + d[1]]

    if (r >= 0 && r < height && c >= 0 && c < width) {
      neighbors.push([r, c] as Point);
    }
  }

  return neighbors;
}

/**
 * Check if coordinates are within grid bounds
 * 
 * @param grid - The 2D grid
 * @param row - Row index
 * @param col - Column index
 * @returns True if coordinates are valid
 * 
 * @example
 * // Validate coordinates before access
 * if (inBounds(grid, row, col)) {
 *   const value = grid[row][col];
 * }
 */
export function inBounds<T>(grid: Grid<T>, row: number, col: number): boolean {
  if (grid === null || grid === undefined || grid.length === 0 || grid[0].length === 0) {
    throw new Error("Cannot find bounds - Grid is empty or undefined.")
  }

  return row >= 0 && col >= 0 && row < grid.length && col < grid[0].length;
}

/**
 * Rotate a grid 90 degrees clockwise
 * 
 * @param grid - The 2D grid to rotate
 * @returns New rotated grid
 * 
 * @example
 * // Rotate for different perspectives
 * const rotated = rotateClockwise(grid);
 */
export function rotateClockwise<T>(grid: Grid<T>): Grid<T> {
  if (grid === null || grid === undefined || grid.length === 0 || grid[0].length === 0) {
    throw new Error("Cannot rotate grid 90 clockwise - Grid is empty or undefined.")
  }

  const numRows = grid.length;
  const numCols = grid[0].length;

  const rotatedGrid = Array.from({ length: numCols }, () => Array(numRows).fill(0));

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      rotatedGrid[j][numRows - 1 - i] = grid[i][j];
    }
  }
  return rotatedGrid;
}

/**
 * Rotate a grid 90 degrees counter-clockwise
 * 
 * @param grid - The 2D grid to rotate
 * @returns New rotated grid
 */
export function rotateCounterClockwise<T>(grid: Grid<T>): Grid<T> {
  if (grid === null || grid === undefined || grid.length === 0 || grid[0].length === 0) {
    throw new Error("Cannot rotate grid 90 counterclockwise - Grid is empty or undefined.")
  }

  const numRows = grid.length;
  const numCols = grid[0].length;

  const rotatedGrid = Array.from({ length: numCols }, () => Array(numRows).fill(0));

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      rotatedGrid[numCols - 1 - j][i] = grid[i][j];
    }
  }
  return rotatedGrid;
}

/**
 * Flip a grid horizontally (left-right)
 * 
 * @param grid - The 2D grid to flip
 * @returns New flipped grid
 * 
 * @example
 * // Mirror the grid horizontally
 * const flipped = flipHorizontal(grid);
 */
export function flipHorizontal<T>(grid: Grid<T>): Grid<T> {
  if (grid === null || grid === undefined || grid.length === 0 || grid[0].length === 0) {
    throw new Error("Cannot flip grid horizontally - Grid is empty or undefined.")
  }

  return grid.map(line => [...line].reverse())
}

/**
 * Flip a grid vertically (top-bottom)
 * 
 * @param grid - The 2D grid to flip
 * @returns New flipped grid
 */
export function flipVertical<T>(grid: Grid<T>): Grid<T> {
  if (grid === null || grid === undefined || grid.length === 0 || grid[0].length === 0) {
    throw new Error("Cannot flip grid vertically - Grid is empty or undefined.")
  }

  return [...grid].reverse();
}

/**
 * Print a grid for debugging (with optional cell formatter)
 * 
 * @param grid - The 2D grid to print
 * @param formatter - Optional function to format each cell
 * @returns String representation of the grid
 * 
 * @example
 * // Print a numeric grid
 * console.log(printGrid(grid, (cell) => cell.toString().padStart(3)));
 * 
 * // Convert booleans to visual symbols
 * console.log(printGrid(visited, (cell) => cell ? '█' : '·'));
 * 
 * // Show path with icons
 * console.log(printGrid(maze, (cell) => {
 *   switch(cell) {
 *     case '#': return '█';
 *     case '.': return ' ';
 *     case 'S': return '◉';
 *     case 'E': return '◎';
 *     case '*': return '★';
 *     default: return String(cell);
 *   }
 * }));
 */
export function printGrid<T>(grid: Grid<T>, formatter?: (cell: T) => string): string {
  if (grid === null || grid === undefined || grid.length === 0 || grid[0].length === 0) {
    throw new Error("Cannot print an empty, undefined, or malformed grid")
  }

  return grid.map(row =>
    row.map(cell =>
      formatter ? formatter(cell) : String(cell)
    ).join('')
  ).join('\n');
}

/**
 * Find all positions of a value in the grid
 * 
 * @param grid - The 2D grid to search
 * @param value - Value to find
 * @returns Array of [row, col] positions
 * 
 * @example
 * // Find all 'X' positions in a character grid
 * const positions = findInGrid(grid, 'X');
 */
export function findInGrid<T>(grid: Grid<T>, value: T): Point[] {
  if (grid === null || grid === undefined || grid.length === 0 || grid[0].length === 0) {
    throw new Error("Cannot find value in an empty, undefined, or malformed grid")
  }

  const positions: Point[] = [];

  grid.forEach((line, i) => line.forEach((char, j) => {
    if (char === value) {
      positions.push([i, j])
    }
  }))

  return positions;
}

/**
 * Clone a 2D grid (deep copy)
 * 
 * @param grid - The grid to clone
 * @returns New grid with copied values
 * 
 * @example
 * // Create a copy before modifications
 * const copy = cloneGrid(original);
 */
export function cloneGrid<T>(grid: Grid<T>): Grid<T> {
  return structuredClone(grid);
}

/**
 * Get the value at a point, or a default if out of bounds
 * 
 * @param grid - The 2D grid
 * @param point - [row, col] coordinates
 * @param defaultValue - Value to return if out of bounds
 * @returns Value at point or default
 * 
 * @example
 * // Safe grid access
 * const value = getAt(grid, [row, col], '#');
 */
export function getAt<T>(grid: Grid<T>, point: Point, defaultValue: T): T {
  if (grid === null || grid === undefined || grid.length === 0 || grid[0].length === 0) {
    throw new Error("Cannot get a value from an empty, malformed, or undefined grid.")
  }

  const rows = grid.length;
  const cols = grid[0].length;

  let [r, c] = point;

  if (r < 0 || r >= rows || c < 0 || c >= cols) {
    return defaultValue;
  } else {
    return grid[r][c];
  }
}

/**
 * Set a value at a point if in bounds
 * 
 * @param grid - The 2D grid (modified in place)
 * @param point - [row, col] coordinates
 * @param value - Value to set
 * @returns True if set successfully
 * 
 * @example
 * // Safe grid modification
 * if (setAt(grid, [row, col], 'X')) {
 *   // Successfully set
 * }
 */
export function setAt<T>(grid: Grid<T>, point: Point, value: T): boolean {
  if (grid === null || grid === undefined || grid.length === 0 || grid[0].length === 0) {
    throw new Error("Cannot set value at point. Grid empty, malformed, or undefined.")
  }

  const rows = grid.length;
  const cols = grid[0].length;

  let [r, c] = point;

  if (r < 0 || r >= rows || c < 0 || c >= cols) {
    return false;
  } else {
    grid[r][c] = value;
    return true;
  }
}

/**
 * Flood fill algorithm starting from a point
 * 
 * @param grid - The 2D grid
 * @param start - Starting [row, col]
 * @param fillValue - Value to fill with
 * @param targetValue - Optional: only fill cells with this value
 * @returns Number of cells filled
 * 
 * @example
 * // Fill connected area
 * const filled = floodFill(grid, [5, 5], 'X', '.');
 */
export function floodFill<T>(grid: Grid<T>, start: Point, fillValue: T, targetValue?: T): number {
  const [startRow, startCol] = start;

  if (startRow < 0 || startRow >= grid.length || startCol < 0 || startCol >= grid[0].length) {
    return 0;
  }
  const startValue = grid[startRow][startCol];
  if (startValue === fillValue) {
    return 0;
  }

  // figure out what we're trying to fill - if there's no target value, we just use start
  const valueToReplace = targetValue !== undefined ? targetValue : startValue;

  // If start !== the value we target, dont fill
  if (startValue !== valueToReplace) {
    return 0;
  }

  const rows = grid.length;
  const cols = grid[0].length;

  function fill(point: Point): number {
    let [r, c] = point;

    // Check bounds
    if (r < 0 || r >= rows || c < 0 || c >= cols) {
      return 0;
    }

    // Skip if not the value we're replacing or already filled
    if (grid[r][c] !== valueToReplace || grid[r][c] === fillValue) {
      return 0;
    }

    grid[r][c] = fillValue;
    let count = 1;

    count += fill([r + 1, c]); // Down
    count += fill([r - 1, c]); // Up
    count += fill([r, c + 1]); // Right
    count += fill([r, c - 1]); // Left

    return count;
  }

  return fill(start);
}

/**
 * Get Manhattan distance between two points
 * 
 * @param p1 - First point [row, col]
 * @param p2 - Second point [row, col]
 * @returns Manhattan distance
 * 
 * @example
 * // Calculate taxi-cab distance
 * const dist = manhattanDistance([0, 0], [3, 4]); // 7
 */
export function manhattanDistance(p1: Point, p2: Point): number {
  return Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]);
}

/**
 * Get all points on the edge/border of the grid
 * 
 * @param grid - The 2D grid
 * @returns Array of border points
 * 
 * @example
 * // Get perimeter cells
 * const border = getBorderPoints(grid);
 */
export function getBorderPoints<T>(grid: Grid<T>): Point[] {
  let borderPoints: Point[] = [];
  const rows = grid.length;
  const cols = grid[0].length;

  // Top and bottom rows
  for (let j = 0; j < cols; j++) {
    borderPoints.push([0, j]);
    if (rows > 1) {
      borderPoints.push([rows - 1, j]);
    }
  }

  // Left and right columns (excluding corners in first and last)
  for (let i = 1; i < rows - 1; i++) {
    borderPoints.push([i, 0]);
    if (cols > 1) {
      borderPoints.push([i, cols - 1]);
    }
  }

  return borderPoints;
}
