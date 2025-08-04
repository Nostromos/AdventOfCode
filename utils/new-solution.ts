import { mkdirSync, readFileSync, writeFileSync, existsSync, readFile } from 'fs';
import { join } from 'path';

// Get command line arguments
const [year, day] = process.argv.slice(2);

if (!year || !day) {
  console.error('Usage: npm run new-solution -- <year> <day>');
  process.exit(1);
}

const newSolution = join(process.cwd(), year, 'Days', day); // path to new solution

// claude told me to do error checking so whatever
if (existsSync(newSolution)) { 
  console.error(`${newSolution} already exists!`);
}

// make the folder(s)
mkdirSync(newSolution, { recursive: true });

const templateDir = join(process.cwd(), 'Template');

const solutionTemplate = readFileSync(
  join(templateDir, "solution.ts"),
  "utf8"
);

const solutionContent = solutionTemplate
  .replace(/X/g, day)
  .replace('2017/Days/X', `${year}/Days/${day}`)
  .replace(/DayXpart1/g, `Day${day}Part1`)
  .replace(/DayXPart2/g, `Days${day}Part2`);

writeFileSync(join(newSolution, 'solution.ts'), solutionContent);

const testTemplate = readFileSync(
  join(templateDir, 'solution.test.ts'),
  'utf8'
);

const testContent = testTemplate
  .replace(/Day X/g, `Day ${day}`)
  .replace(/X/g, day)
  .replace(
    "// import { Day } from './solution';",
    `import { Day${day}Part1, Day${day}Part2 } from './solution';`
  )
  .replace(/Day9/g, `Day${day}Part1`);  // Fix the example function name

writeFileSync(join(newSolution, 'solution.test.ts'), testContent);

// Create empty Input.txt
writeFileSync(join(newSolution, 'Input.txt'), '');

// Create empty Problem.md
writeFileSync(join(newSolution, 'Problem.md'), `# Day ${day}\n\n`);

console.log(`Created solution template at ${newSolution}`);