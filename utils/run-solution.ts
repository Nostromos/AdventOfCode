const [year, day] = process.argv.slice(2);

if (!year || !day) {
  console.error('Usage: npm run run -- <year> <day>');   // e.g.  npm run run -- 2017 3
  process.exit(1);
}

// path to project root = one level up from utils/
await import(new URL(`../${year}/Days/${day}/solution.ts`, import.meta.url).href);

export { }