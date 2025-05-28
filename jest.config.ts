import type { Config } from 'jest'
import { createDefaultEsmPreset } from 'ts-jest'

const presetConfig = createDefaultEsmPreset({
  //...options
})

export default {
  ...presetConfig,
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
} satisfies Config