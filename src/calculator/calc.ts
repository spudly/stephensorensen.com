interface NumberExpression {
  type: 'number';
  value: number;
}

interface BinaryExpression {
  type: 'add' | 'subtract' | 'multiply' | 'divide';
  left: Expression;
  right: Expression;
}

interface GroupExpression {
  type: 'group';
  value: Expression;
}

type Expression = NumberExpression | BinaryExpression | GroupExpression;

type OperatorChar = '+' | '-' | '*' | '/' | '(' | ')';
type OperatorType = 'multiply' | 'divide' | 'add' | 'subtract';

interface OperatorMap {
  [token: string]: OperatorType;
}

type Token = number | string;

const builders = {
  add: (left: Expression, right: Expression): BinaryExpression => ({type: 'add', left, right}),
  subtract: (left: Expression, right: Expression): BinaryExpression => ({
    type: 'subtract',
    left,
    right,
  }),
  multiply: (left: Expression, right: Expression): BinaryExpression => ({
    type: 'multiply',
    left,
    right,
  }),
  divide: (left: Expression, right: Expression): BinaryExpression => ({
    type: 'divide',
    left,
    right,
  }),
  number: (value: number): NumberExpression => ({type: 'number', value}),
  group: (value: Expression): GroupExpression => ({type: 'group', value}),
};

const isOperator = (char: string) => ['+', '-', '*', '/', '(', ')'].some(op => char === op);
const isWhitespace = (char: string) => /^\s$/.test(char);

export const generateTokens = function* generateTokens(expression: string) {
  let chunk = '';

  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];
    if (isWhitespace(char)) {
      // ignore
    } else if (char === '(') {
      yield char;
    } else if (char === ')' || isOperator(char)) {
      if (chunk) {
        yield parseFloat(chunk);
      }
      yield char;
      chunk = '';
    } else {
      chunk += char;
    }
  }
  if (chunk !== '') {
    yield parseFloat(chunk);
  }
};

const operatorTypesByPrecedence: Array<OperatorMap> = [
  {'*': 'multiply', '/': 'divide'},
  {'+': 'add', '-': 'subtract'},
];

export const generateAst = (tokens: Array<Token | Expression>): Expression => {
  if (tokens.length === 1) {
    const token = tokens[0];
    if (typeof token === 'number') {
      return builders.number(token);
    }
    if (typeof token === 'string') {
      throw new Error('Unable to resolve expression');
    }
    return token;
  }

  if (tokens.includes(')')) {
    const closeIndex = tokens.indexOf(')');
    const openIndex = tokens.lastIndexOf('(', closeIndex);
    return generateAst([
      ...tokens.slice(0, openIndex),
      builders.group(generateAst(tokens.slice(openIndex + 1, closeIndex))),
      ...tokens.slice(closeIndex + 1),
    ]);
  }

  const newTokens = operatorTypesByPrecedence.reduce((curTokens, operators) => {
    let type: OperatorType | null;
    const reduced = curTokens.reduce(
      (chunk: Array<Token | Expression>, token: Token | Expression) => {
        if (typeof token === 'string' && operators[token]) {
          type = operators[token];
          return chunk;
        }
        if (type) {
          const prevTokens = chunk.slice(0, chunk.length - 1);
          const a = generateAst([chunk[chunk.length - 1]]);
          const b = generateAst([token]);
          const newChunks = [...prevTokens, builders[type](a, b)];
          type = null;
          return newChunks;
        }
        if (typeof token === 'number') {
          return [...chunk, builders.number(token)];
        }
        return [
          ...chunk,
          typeof token === 'string' && isOperator(token) ? token : generateAst([token]),
        ];
      },
      []
    );
    return reduced;
  }, tokens);

  if (newTokens.length !== 1) {
    throw new Error('unable to resolve calculation');
  }

  const newToken = newTokens[0];

  if (typeof newToken === 'string' || typeof newToken === 'number') {
    throw new Error('fail');
  }

  return newToken;
};

const evaluate = (ast: Expression): number => {
  switch (ast.type) {
    case 'add':
      return evaluate(ast.left) + evaluate(ast.right);
    case 'subtract':
      return evaluate(ast.left) - evaluate(ast.right);
    case 'multiply':
      return evaluate(ast.left) * evaluate(ast.right);
    case 'divide':
      return evaluate(ast.left) / evaluate(ast.right);
    case 'group':
      return evaluate(ast.value);
    case 'number':
      return ast.value;
  }
};

export default (expression: string) => {
  const tokens: Token[] = Array.from(generateTokens(expression));
  const ast = generateAst(tokens);
  return evaluate(ast);
};
