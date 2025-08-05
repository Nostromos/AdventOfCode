![Advent of Code Logo](https://repository-images.githubusercontent.com/112706767/160be980-3b1a-11eb-9dbe-439a40adfa99)
<h2 align="center"><i>Advent of Code</i></h2>

<p align="center">
  <a href="https://golang.org/doc/go1.14">
    <img alt="Typescript" src="https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=for-the-badge" />
  </a> 
  <a>
    <img alt="Node.js" src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white" />
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img alt="ts-node" src="https://img.shields.io/static/v1?style=for-the-badge&message=ts-node&color=3178C6&logo=ts-node&logoColor=FFFFFF&label=" />
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img alt="Jest" src="https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white" />
  </a>
</p>



## Overview

These are my [Advent of Code](https://adventofcode.com/) solutions for years 2017 to 2024 as part of the [Recurse Center](https://recurse.com/)'s Advent of Code group.

In most cases, I optimized for solving the problem quickly, so some of these solutions are... messy.

## Features

- Multiple story selection from a menu
- Interactive story navigation with keyboard controls
- Beautiful terminal UI with styled text boxes
- Support for custom story files in JSON format

## Installation

```bash
go build -o storytel ./cmd/storytel
```

## Usage

Run the application:
```bash
./storytel
```

### Controls

**Story Selection Mode:**
- `↑/↓` or `j/k` - Navigate through stories
- `Enter` - Select a story
- `q` - Quit

**Story Playing Mode:**
- `↑/↓` or `j/k` - Navigate through options
- `Enter` - Select an option
- `q` - Quit

## Story Format

Stories are stored as JSON files in the `stories/` directory. Each story follows this structure:

```json
{
  "chapter-name": {
    "title": "Chapter Title",
    "story": [
      "First paragraph",
      "Second paragraph"
    ],
    "options": [
      {
        "text": "Option text",
        "arc": "next-chapter-name"
      }
    ]
  }
}
```

## Adding New Stories

1. Create a new JSON file in the `stories/` directory
2. Follow the story format above
3. Include an "intro" chapter as the entry point
4. The application will automatically detect and list new stories

## Project Structure

```
solutions/                 // All solutions and test files...
├─ 2017/                   // Organized by year...
│  ├─ 1/                   // And by day...
│  │  ├─ Input.txt         // Text file input - MUST BE TXT (ignored by git)
│  │  ├─ Problem.md        // The problem text itself (ignored by git)
│  │  ├─ solution.ts       // My solution to parts 1 and 2 (if complete)
│  │  ├─ solution.test.ts  // Test file using examples given in problem
│  ├─ 2/
│  ├─ 3/
│  ├─ .../
├─ 2019/
├─ 2023/
├─ .../
utils/                     // Utility library with useful data structures, 
                              algos, debugging tools, input processing, 
                              string parsings, etc.
├─ Template/               // Template files for new solutions
docs/                      // Docs, commentary, issues, future plans, notes, etc.

```
> [!NOTE]
> `handler/` and `story/` folders are non-functional for now. The original version of this exercise required you to generate and serve templated HTML but I had way more fun with BubbleTea.

## Dependencies

- [Bubble Tea](https://github.com/charmbracelet/bubbletea) - Terminal UI framework
- [Lip Gloss](https://github.com/charmbracelet/lipgloss) - Terminal styling

## License

This project is part of the Gophercises exercise series.


# Advent of Code

These are my AOC solutions. There are no Inputs or Problem Statements, so you'll need to bring your own.

## Run
1. Create an Input.txt file in the same directory as the solution.ts file you'd like to run.
2. Run `npm run solve -- <year> <day>`
3. Read the output.