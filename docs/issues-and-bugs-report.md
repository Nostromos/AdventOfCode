# Advent of Code Repository Issues and Bugs Report

This document contains a comprehensive list of bugs, mistakes, issues, broken tests, unclear or missing documentation, and code quality problems found in the Advent of Code repository.

## Critical Issues

### 1. README.md Contains Incorrect Content
**File:** `/README.md`
**Issue:** The README contains content about a Go storytelling application mixed with Advent of Code content. Lines 1-110 discuss a completely different project.
**Impact:** Highly confusing for anyone trying to understand the repository
**Fix:** Remove the storytelling content and focus only on Advent of Code

### 2. Widespread Path Issues in Solution Files
**Files:** All solution files in `solutions/` directory
**Issue:** Solutions use incorrect paths like `"2017/Days/1/Input.txt"` instead of `"solutions/2017/1/Input.txt"`
**Example:** `/solutions/2017/1/solution.ts:3` - `const PATH = "2017/Days/1/Input.txt";`
**Impact:** Solutions cannot load input files, causing runtime errors
**Fix:** Update all paths to use correct `solutions/YEAR/DAY/Input.txt` format

### 3. Test Suite Failures
**Files:** Most test files
**Issue:** Tests are failing due to:
- Path issues (trying to load inputs during imports)
- Empty test suites with no actual tests
- Commented out test implementations
**Example:** `/solutions/2024/1/solution.test.ts:13` - actual test is commented out
**Impact:** Test suite is largely non-functional
**Fix:** Refactor tests to not load inputs at import time, implement actual tests

## Configuration Issues

### 4. TypeScript Module System Conflict
**File:** `/tsconfig.json`
**Issue:** Package.json specifies `"type": "module"` but ts-node config overrides to CommonJS
**Lines:** `tsconfig.json:6` and `package.json:7`
**Impact:** Potential module resolution issues
**Fix:** Align module systems between configurations

### 5. Missing Package Description
**File:** `/package.json:4`
**Issue:** Empty description field
**Impact:** Poor npm package metadata
**Fix:** Add appropriate description

## Template and Tooling Issues

### 6. Template Path Issues
**File:** `/utils/Template/solution.ts:3`
**Issue:** Template uses wrong path pattern `YEAR/Days/X/Input.txt`
**Impact:** New solutions created with incorrect paths
**Fix:** Update to `solutions/YEAR/X/Input.txt`

### 7. Template Time Calculation Bug
**File:** `/utils/Template/solution.ts:26`
**Issue:** Part 2 timing uses wrong variables: `end - start` instead of `end2 - start2`
**Impact:** Incorrect performance measurements
**Fix:** Use correct variables for Part 2 timing

### 8. Template Test File Issues
**File:** `/utils/Template/solution.test.ts:7`
**Issue:** Contains hardcoded "Day9" instead of template placeholder
**Impact:** Incorrect function names in generated tests
**Fix:** Change to use consistent placeholder pattern

### 9. new-solution.ts Directory Issues
**File:** `/utils/new-solution.ts`
**Issues:**
- Line 12: Creates solutions in wrong directory `year/Days/day` instead of `solutions/year/day`
- Line 16: Logs error but doesn't exit when directory exists
- Line 49: Hardcoded Day9 replacement is a workaround for template bug
**Impact:** Tool creates files in wrong locations
**Fix:** Update paths and add proper error handling

## Code Quality Issues

### 10. Inconsistent Function Naming
**Pattern:** Throughout solution files
**Issue:** Functions named like `Day1Part1` instead of `partOne` as suggested in CLAUDE.md
**Impact:** Inconsistent codebase conventions
**Fix:** Standardize on one naming convention

### 11. Type Safety Issues
**Example:** `/solutions/2024/1/solution.ts`
**Issue:** Using unary + operator for string to number conversion without validation
**Lines:** Multiple locations like line 26, 32
**Impact:** Potential runtime errors with invalid input
**Fix:** Use proper parsing with error handling

### 12. loadInput Function Path Handling
**File:** `/utils/index.ts:11`
**Issue:** Treats provided paths as absolute when they should be relative to project root
**Impact:** Confusing API that doesn't match usage patterns
**Fix:** Make paths relative to project root

### 13. Missing Semicolon
**File:** `/utils/grid.ts:14`
**Issue:** Missing semicolon after `COMPASS_NAMES_8` array
**Impact:** Potential ASI issues
**Fix:** Add semicolon

### 14. Broken Test Implementation
**File:** `/solutions/2024/1/solution.test.ts`
**Issue:** Test always returns 11 instead of calling actual function
**Impact:** False positive test results
**Fix:** Uncomment and fix actual test implementation

## Documentation Issues

### 15. Incorrect Directory Structure in README
**File:** `/README.md`
**Issue:** Still partially contains Go project structure and dependencies
**Impact:** Confusing documentation
**Fix:** Complete the cleanup of Go-related content

### 16. No Error Handling Documentation
**Issue:** Utils don't document error cases or edge conditions
**Impact:** Unclear API contracts
**Fix:** Add error handling documentation to utility functions

## File Organization Issues

### 17. Abandoned Draft Files
**Location:** `/solutions/2024/24/`
**Files:** `attempt1.ts`, `solution copy.ts`
**Issue:** Draft/abandoned files left in repository
**Impact:** Cluttered codebase
**Fix:** Clean up or move to separate drafts folder

### 18. Debug Warning in Test Output
**Issue:** Tests show debugger listening warnings
**Impact:** Noisy test output
**Fix:** Configure Jest to suppress debugger warnings

## Missing Features

### 19. No Validation in loadInput
**File:** `/utils/index.ts`
**Issue:** No error handling for missing files
**Impact:** Unhelpful error messages
**Fix:** Add try-catch with descriptive errors

### 20. No Test Coverage Reports
**Issue:** No test coverage configuration
**Impact:** Unknown test coverage
**Fix:** Add Jest coverage configuration

## Performance Issues

### 21. Synchronous File Reading
**File:** `/utils/index.ts:14`
**Issue:** Using synchronous file reading
**Impact:** Blocks event loop during file operations
**Fix:** Consider async alternatives for better performance

## Recommendations

### High Priority
1. Fix all path issues in existing solutions
2. Update templates to use correct paths
3. Fix the README.md content
4. Implement actual tests instead of fake ones

### Medium Priority
1. Standardize function naming conventions
2. Add proper error handling
3. Clean up abandoned files
4. Fix TypeScript configuration conflicts

### Low Priority
1. Add test coverage reporting
2. Improve documentation
3. Add input validation
4. Consider async file operations

## Summary

The repository has 21+ significant issues that affect functionality, maintainability, and developer experience. The most critical issues are the widespread path problems that prevent solutions from running and the broken test suite. These should be addressed first to restore basic functionality.