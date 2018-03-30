interface NumberExpression {
  type: 'number';
  value: number;
}

interface AddExpression {
  type: 'add';
  values: [Expression, Expression];
}
interface SubtractExpression {
  type: 'subtract';
  values: [Expression, Expression];
}
interface MultiplyExpression {
  type: 'multiply';
  values: [Expression, Expression];
}
interface DivideExpression {
  type: 'divide';
  values: [Expression, Expression];
}

type BinaryExpression = AddExpression | SubtractExpression | MultiplyExpression | DivideExpression;

interface GroupExpression {
  type: 'group';
  value: Expression;
}

type Expression = NumberExpression | BinaryExpression | GroupExpression;

const builders = {
  add: (values: [Expression, Expression]): AddExpression => ({type: 'add', values}),
  subtract: (values: [Expression, Expression]): SubtractExpression => ({type: 'subtract', values}),
  multiply: (values: [Expression, Expression]): MultiplyExpression => ({type: 'multiply', values}),
  divide: (values: [Expression, Expression]): DivideExpression => ({type: 'divide', values}),
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

const operatorTypesByPrecedence = [{'*': 'multiply', '/': 'divide'}, {'+': 'add', '-': 'subtract'}];

export const generateAst = tokens => {
  if (tokens.type) {
    return tokens;
  }

  if (typeof tokens === 'number') {
    return builders.number(tokens);
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
    let type;
    const reduced = curTokens.reduce((chunk, token) => {
      if (operators[token]) {
        type = operators[token];
        return chunk;
      }
      if (type) {
        const prevTokens = chunk.slice(0, chunk.length - 1);
        const a = generateAst(chunk[chunk.length - 1]);
        const b = generateAst(token);
        const newChunks = [...prevTokens, builders[type]([a, b])];
        type = null;
        return newChunks;
      }
      if (typeof token === 'number') {
        return [...chunk, builders.number(token)];
      }
      return [...chunk, isOperator(token) ? token : generateAst(token)];
    }, []);
    return reduced;
  }, tokens);

  if (newTokens.length !== 1) {
    throw new Error('unable to resolve calculation');
  }

  return newTokens[0];
};

const evaluate = (ast: Expression) => {
  switch (ast.type) {
    case 'add':
      return evaluate(ast.values[0]) + evaluate(ast.values[1]);
    case 'subtract':
      return evaluate(ast.values[0]) - evaluate(ast.values[1]);
    case 'multiply':
      return evaluate(ast.values[0]) * evaluate(ast.values[1]);
    case 'divide':
      return evaluate(ast.values[0]) / evaluate(ast.values[1]);
    case 'group':
      return evaluate(ast.value);
    case 'number':
      return ast.value;
  }
};

export default expression => {
  const tokens = Array.from(generateTokens(expression));
  const ast = generateAst(tokens);
  return evaluate(ast);
};
