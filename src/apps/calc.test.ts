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
      left: {
        type: 'add',
        left: {type: 'number', value: 2},
        right: {
          type: 'multiply',
          left: {
            type: 'divide',
            left: {type: 'number', value: 2},
            right: {type: 'number', value: 2},
          },
          right: {type: 'number', value: 2},
        },
      },
      right: {type: 'number', value: 2},
    });
  });

  test('(2 + 2)', () => {
    const tokens = ['(', 2, '+', 2, ')'];
    expect(generateAst(tokens)).toEqual({
      type: 'group',
      value: {
        type: 'add',
        left: {type: 'number', value: 2},
        right: {type: 'number', value: 2},
      },
    });
  });

  test('(2 + 2) * 2', () => {
    const tokens = ['(', 2, '+', 2, ')', '*', 2];
    expect(generateAst(tokens)).toEqual({
      type: 'multiply',
      left: {
        type: 'group',
        value: {
          type: 'add',
          left: {type: 'number', value: 2},
          right: {type: 'number', value: 2},
        },
      },
      right: {type: 'number', value: 2},
    });
  });

  test('2 * (2 + 2)', () => {
    const tokens = [2, '*', '(', 2, '+', 2, ')'];
    const ast = generateAst(tokens);
    expect(ast).toEqual({
      type: 'multiply',
      left: {type: 'number', value: 2},
      right: {
        type: 'group',
        value: {
          type: 'add',
          left: {type: 'number', value: 2},
          right: {type: 'number', value: 2},
        },
      },
    });
  });

  test('(2 + 2) / 2 * (2 - 2)', () => {
    const tokens = ['(', 2, '+', 2, ')', '/', 2, '*', '(', 2, '-', 2, ')'];
    expect(generateAst(tokens)).toEqual({
      type: 'multiply',
      left: {
        type: 'divide',
        left: {
          type: 'group',
          value: {
            type: 'add',
            left: {type: 'number', value: 2},
            right: {type: 'number', value: 2},
          },
        },
        right: {type: 'number', value: 2},
      },
      right: {
        type: 'group',
        value: {
          type: 'subtract',
          left: {type: 'number', value: 2},
          right: {type: 'number', value: 2},
        },
      },
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
