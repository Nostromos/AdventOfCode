import loadInput from "@/utils";

const PATH = "2017/Days/6/Input.txt"; // Relative to project root
const raw = loadInput(PATH);
const input = raw.split(" ").map((num) => Number(num));

export function Day6Part1(configuration: number[]) {
  let config = [...configuration];
  let configurations = new Set<string>();
  let cycleCount = 0;

  while (!configurations.has(config.join())) {
    configurations.add(config.join());

    let max = Math.max(...config);
    let maxIndex = config.indexOf(max)
    config[maxIndex] = 0;

    for (let i = maxIndex + 1; max > 0; i++) {
      if (i === config.length) i = 0;

      config[i]++;
      max--;
    }

    cycleCount++;
  }

  return { config, cycleCount }
}

export function Day6Part2(configuration: number[]) {
  let config = [...configuration];

  return Day6Part1(config);
}

const testConfig = [
  10, 9, 8, 7, 6, 5,
  4, 3, 1, 1, 0, 15,
  14, 13, 11, 12
]
console.log(Day6Part2(testConfig));