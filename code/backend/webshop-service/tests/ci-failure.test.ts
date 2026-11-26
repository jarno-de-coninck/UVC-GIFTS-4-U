/**
 * TEMPORARY: deliberately failing test to verify the Discord CI notification
 * (including the ping on failure). Do NOT merge this – close the PR and delete the branch.
 *
 * @module tests/ci-failure
 */
import { describe, it, expect } from '@jest/globals';

describe('Discord notification test', () => {
  it('fails on purpose', () => {
    expect(1 + 1).toBe(3);
  });
});
