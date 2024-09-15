import { test, expect } from 'vitest';
import { parseStyles } from '../src/components/Editor/Controls';
import { properties } from '../src/data/properties';
import { stylesToEditorSchema } from '../src/lib/transformers/styles-to-editor-schema';


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

test('stylesToEditorSchema', () => {
  const schemas = stylesToEditorSchema({
    color: 'red',
    cursor: 'progress',
    fontSize: 'large',
    width: {
      unit: 'px',
      value: 100,
    }
  });

  console.log(schemas);
});

test('normalizeSchema', () => {
  const schema = properties['fontSize'];
  // console.log(schema);
  const result1 = schema.validate('16px');
  expect(result1).toBe(false);

  const result2 = schema.validate('large');
  expect(result2).toBe(true);

  const val = parseStyles({ fontSize: '2px' });
  const result3 = schema.validate(val.fontSize);
  expect(result3).toBe(true);
});