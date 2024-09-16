import { test, expect } from 'vitest';
import { parseStyles } from '../src/components/Editor/Controls';
import { properties } from '../src/data/properties';
import { stylesToEditorSchema } from '../src/lib/transformers/styles-to-editor-schema';
import { tokenize } from '../src/lib/parse';

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

  const val1 = parseStyles({ fontSize: '2px' });
  const result3 = schema.validate(val1.fontSize);
  expect(result3).toBe(true);

  const result4 = schema.validate("2rem");
  expect(result4).toBe(false);

  const val2 = parseStyles({ fontSize: '2rem', color: '#fff' });
  expect(schema.validate(val2.fontSize)).toBe(true);
  const colorSchema = properties['color'];
  expect(colorSchema.validate(val2.color)).toBe(true);
});

test('tokenize', () => {
  const css = `
  border-radius: 5px;
  margin-left: 5px;
  margin-bottom: 5px;
  margin-right: 5px;
  margin-top: 5px;
  padding: 5px 3px;
  border-width: 2px;
  font-weight: bolder;
  background-color: #96e4cfe8;
  color: #e11919;
  text-align: left;
  font-family: Recursive;
  font-style: italic;
  font-size: 25px;
  background-image: ;
  border-style: dotted;
  `
  const val = tokenize(css);
  console.log({ val });
})