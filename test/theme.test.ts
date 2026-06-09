import { describe, it, expect } from 'vitest';
import { normalizePref, resolveTheme, nextMode } from '../src/scripts/theme';

describe('normalizePref', () => {
  it('keeps valid modes', () => {
    expect(normalizePref('auto')).toBe('auto');
    expect(normalizePref('light')).toBe('light');
    expect(normalizePref('dark')).toBe('dark');
  });

  it('falls back to auto for unknown or missing values', () => {
    expect(normalizePref(null)).toBe('auto');
    expect(normalizePref(undefined)).toBe('auto');
    expect(normalizePref('')).toBe('auto');
    expect(normalizePref('nonsense')).toBe('auto');
  });
});

describe('resolveTheme', () => {
  it('resolves auto from the system preference', () => {
    expect(resolveTheme('auto', true)).toBe('dark');
    expect(resolveTheme('auto', false)).toBe('light');
  });

  it('returns explicit modes unchanged regardless of system', () => {
    expect(resolveTheme('light', true)).toBe('light');
    expect(resolveTheme('dark', false)).toBe('dark');
  });
});

describe('nextMode', () => {
  it('cycles Auto -> Light -> Dark -> Auto', () => {
    expect(nextMode('auto')).toBe('light');
    expect(nextMode('light')).toBe('dark');
    expect(nextMode('dark')).toBe('auto');
  });
});
