import { test, expect } from 'vitest';
import { parseStyles } from '../src/components/Editor/Controls';
import { properties } from '../src/data/properties';


test('should parse styles correctly', () => {
  const styles = { color: 'red', cursor: 'progress' };
  const result = parseStyles(styles);
  console.log({ properties, styles, result });
  expect(result).toEqual({ color: 'red', cursor: 'progress' });
});

test('should throw an error for unknown properties', () => {
  const styles = { unknownProperty: 'value' };
  expect(() => parseStyles(styles)).toThrow('Parsing unknown property: unknownProperty');
});

test('should throw an error for parsing failures', () => {
  const styles = { size: 'large' };
  expect(() => parseStyles(styles)).toThrow('Parsing unknown property: size');
});
