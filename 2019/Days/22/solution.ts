import loadInput from "@/utils";

const PATH = "2019/Days/22/Input.txt"; // Relative to project root
const raw = loadInput(PATH);

// -----------------------------------------
// --- Day 22: Slam Shuffle ---
// -----------------------------------------

export function Day22(raw: string, deckSize: number = 10007, card: number): number {
  const input = raw.trim().split("\n").map(line => line.split(" "));
  let pos = card;

  for (let line of input) {
    const operation = getOperation(line);
    const value = operation === "new stack" ? 0 : Number(line.at(-1));

    if (value === undefined) {
      throw new Error("value is undefined")
    } else if (operation === "cut") {
      pos = ((pos - value) % deckSize + deckSize) % deckSize;
    } else if (operation === "increment") {
      pos = (pos * value) % deckSize;
    } else if (operation === "new stack") {
      pos = deckSize - 1 - pos;
    }
  }

  return pos;
}

// Calculates modular multiplicative inverse using Fermat's Little Theorem
// For prime modulus m: a^(-1) ≡ a^(m-2) (mod m)
function modInverse(a: bigint, m: bigint): bigint {
  // For prime m, inverse of a is a^(m-2) mod m
  return modPow(a, m - 2n, m);
}

// Efficient modular exponentiation using binary exponentiation
// Computes (base^exp) % mod in O(log exp) time
function modPow(base: bigint, exp: bigint, mod: bigint): bigint {
  let result = 1n;
  base = base % mod;

  while (exp > 0n) {
    // If exp is odd, multiply result by base
    if (exp % 2n === 1n) {
      result = (result * base) % mod;
    }
    // Square the base and halve the exponent
    exp = exp / 2n;
    base = (base * base) % mod;
  }

  return result;
} 

export function Day22Part2(raw: string, deckSize: bigint = 119315717514047n, card: number, numShuffles: bigint): bigint {
  // Parse and reverse the operations to work backwards through the shuffle
  const input = raw.trim().split("\n").map(line => line.split(" ")).reverse();
  
  // Linear transformation coefficients: position = (a * original_position + b) % deckSize
  let a = 1n;  // Multiplicative factor
  let b = 0n;  // Additive factor

  // Build the backwards transformation by processing operations in reverse
  for (let line of input) {
    const operation = getOperation(line);
    const value = operation === "new stack" ? BigInt(0) : BigInt(Number(line.at(-1)));

    if (value === undefined) {
      throw new Error("value is undefined")
    } else if (operation === "cut") {
      // Reverse of "cut n": position i came from (i + n) % deckSize
      // This adds n to the position: new_pos = old_pos + n
      b = b + value;
    } else if (operation === "increment") {
      // Reverse of "deal with increment n": multiply by modular inverse of n
      // If forward is: new_pos = (old_pos * n) % deckSize
      // Then backward is: old_pos = (new_pos * n^(-1)) % deckSize
      const inv = modInverse(value, deckSize);
      a = a * inv;
      b = b * inv;
    } else if (operation === "new stack") {
      // Reverse of "deal into new stack": position i came from (deckSize - 1 - i)
      // This is: new_pos = -old_pos + (deckSize - 1) = -old_pos - 1 (mod deckSize)
      a = -a;
      b = -b - 1n;
    }
    // Ensure coefficients stay positive for consistency
    a = ((a % deckSize) + deckSize) % deckSize;
    b = ((b % deckSize) + deckSize) % deckSize;
  }

  // Now we need to apply this transformation numShuffles times
  // Use fast exponentiation to compute (a, b) after numShuffles applications
  // If f(x) = ax + b, then f^n(x) = a^n * x + b * (a^(n-1) + a^(n-2) + ... + 1)
  
  // Initialize result transformation as identity: f(x) = 1*x + 0
  let resultA = 1n;
  let resultB = 0n;

  // Current power of the base transformation
  let baseA = a;
  let baseB = b;

  // Binary exponentiation to compute the transformation after numShuffles applications
  while (numShuffles > 0n) {
    // If current bit is 1, compose with current power of base transformation
    if (numShuffles % 2n === 1n) {
      // Compose: result = result ∘ base
      // If result(x) = resultA*x + resultB and base(x) = baseA*x + baseB
      // Then (result ∘ base)(x) = resultA*(baseA*x + baseB) + resultB
      //                         = (resultA*baseA)*x + (resultA*baseB + resultB)
      let newResultA = (resultA * baseA) % deckSize;
      let newResultB = ((resultA * baseB) + resultB) % deckSize;
      resultA = newResultA;
      resultB = newResultB;
    }

    // Square the base transformation: base = base ∘ base
    // If base(x) = baseA*x + baseB
    // Then (base ∘ base)(x) = baseA*(baseA*x + baseB) + baseB
    //                       = (baseA*baseA)*x + (baseA*baseB + baseB)
    let newBaseA = (baseA * baseA) % deckSize;
    let newBaseB = ((baseA * baseB) + baseB) % deckSize;
    baseA = newBaseA;
    baseB = newBaseB;

    numShuffles = numShuffles / 2n;
  }

  console.log("Final transformation coefficients: a =", resultA, ", b =", resultB);

  // Apply the final transformation to position 2020 to find which card ends up there
  // After all the backwards shuffles, position 2020 came from position (resultA * 2020 + resultB) % deckSize
  return (resultA * BigInt(2020) + resultB) % deckSize;
}


function getOperation(line: string[]) {
  if (line !== undefined) {
    if (line[0] === "cut") {
      ``
      return "cut";
    } else if (line[1] === "with") {
      return "increment"
    } else {
      return "new stack"
    }
  }
}

console.log(Day22Part2(raw, 119315717514047n, 2020, 101741582076661n))