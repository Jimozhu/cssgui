import { test, expect } from 'vitest';
import { tokenize } from '../src/lib/parse';

test('tokenizes dimensions and numbers', () => {
  expect(tokenize('2rem')).toEqual(['2rem']);
  expect(tokenize('2.5')).toEqual(['2.5']);
});

test('tokenizes double-quoted strings', () => {
  expect(tokenize('"some name"')).toEqual(['"some name"']);
});

test('tokenizes single-quoted strings', () => {
  expect(tokenize("'some name'")).toEqual(["'some name'"]);
});

test('tokenizes lists', () => {
  expect(tokenize('inset 2rem 3rem 1rem 4rem')).toEqual([
    'inset',
    '2rem',
    '3rem',
    '1rem',
    '4rem',
  ]);
});

test('tokenizes functions', () => {
  expect(tokenize('translate(2px,3px)')).toEqual([
    { name: 'translate', arguments: ['2px', ',', '3px'] },
  ]);
});

test('tokenizes nested functions', () => {
  expect(tokenize('repeat(1, fit-content(3rem))')).toEqual([
    {
      name: 'repeat',
      arguments: [
        '1',
        ',',
        {
          name: 'fit-content',
          arguments: ['3rem'],
        },
      ],
    },
  ]);
});
