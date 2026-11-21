/**
 * Jest config for native ESM + TypeScript.
 * Run via `npm test`, which starts Node with --experimental-vm-modules (required for ESM in Jest).
 *
 * @type {import('jest').Config}
 */
export default {
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  extensionsToTreatAsEsm: ['.ts'],
  // Source imports use `.js` extensions (NodeNext); map them back to the `.ts` files
  moduleNameMapper: { '^(\\.{1,2}/.*)\\.js$': '$1' },
  transform: { '^.+\\.ts$': ['ts-jest', { useESM: true, tsconfig: 'tests/tsconfig.json' }] },
};
