import calc, {generateTokens, generateAst} from './calc';

describe('generateTokens', () => {
  test('2 + 2 / 2 * 2 - 2', () => {
    const tokens = Array.from(generateTokens('2 + 2 / 2 * 2 - 2'));
    expect(tokens).toEqual([2, '+', 2, '/', 2, '*', 2, '-', 2]);
  });
  test('(2 + 2) / 2 * (2 - 2)', () => {
    const tokens = Array.from(generateTokens('(2 + 2) / 2 * (2 - 2)'));
    expect(tokens).toEqual(['(', 2, '+', 2, ')', '/', 2, '*', '(', 2, '-', 2, ')']);
  });
});

describe('generateAst', () => {
  test('2 + 2 / 2 * 2 - 2', () => {
    expect(generateAst([2, '+', 2, '/', 2, '*', 2, '-', 2])).toEqual({
      type: 'subtract',
      values: [
        {
          type: 'add',
          values: [
            {type: 'number', value: 2},
            {
              type: 'multiply',
              values: [
                {
                  type: 'divide',
                  values: [{type: 'number', value: 2}, {type: 'number', value: 2}],
                },
                {type: 'number', value: 2},
              ],
            },
          ],
        },
        {type: 'number', value: 2},
      ],
    });
  });

  test('(2 + 2)', () => {
    const tokens = ['(', 2, '+', 2, ')'];
    expect(generateAst(tokens)).toEqual({
      type: 'group',
      value: {
        type: 'add',
        values: [{type: 'number', value: 2}, {type: 'number', value: 2}],
      },
    });
  });

  test('(2 + 2) * 2', () => {
    const tokens = ['(', 2, '+', 2, ')', '*', 2];
    expect(generateAst(tokens)).toEqual({
      type: 'multiply',
      values: [
        {
          type: 'group',
          value: {
            type: 'add',
            values: [{type: 'number', value: 2}, {type: 'number', value: 2}],
          },
        },
        {type: 'number', value: 2},
      ],
    });
  });

  test('2 * (2 + 2)', () => {
    const tokens = [2, '*', '(', 2, '+', 2, ')'];
    const ast = generateAst(tokens);
    expect(ast).toEqual({
      type: 'multiply',
      values: [
        {type: 'number', value: 2},
        {
          type: 'group',
          value: {
            type: 'add',
            values: [{type: 'number', value: 2}, {type: 'number', value: 2}],
          },
        },
      ],
    });
  });

  test('(2 + 2) / 2 * (2 - 2)', () => {
    const tokens = ['(', 2, '+', 2, ')', '/', 2, '*', '(', 2, '-', 2, ')'];
    expect(generateAst(tokens)).toEqual({
      type: 'multiply',
      values: [
        {
          type: 'divide',
          values: [
            {
              type: 'group',
              value: {
                type: 'add',
                values: [{type: 'number', value: 2}, {type: 'number', value: 2}],
              },
            },
            {type: 'number', value: 2},
          ],
        },
        {
          type: 'group',
          value: {
            type: 'subtract',
            values: [{type: 'number', value: 2}, {type: 'number', value: 2}],
          },
        },
      ],
    });
  });
});

describe('calc', () => {
  test('2 + 2 / 2 * 2 - 2', () => {
    expect(calc('2 + 2 / 2 * 2 - 2')).toBe(2);
  });
  test('(2 + 2) / 2 * (2 - 2)', () => {
    expect(calc('(2 + 2) / 2 * (2 - 2)')).toBe(0);
  });
});
