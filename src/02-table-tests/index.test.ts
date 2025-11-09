import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 10, b: 5, action: Action.Subtract, expected: 5 },
  { a: 10, b: 10, action: Action.Subtract, expected: 0 },
  { a: 10, b: 10, action: Action.Multiply, expected: 100 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 6, b: 3, action: Action.Multiply, expected: 18 },
  { a: 6, b: 3, action: Action.Divide, expected: 2 },
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 22, b: 2, action: Action.Divide, expected: 11 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 'a', b: 'b', action: Action.Exponentiate, expected: null },
  { a: 3, b: 2, action: '$', expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'returns $expected when $action is applied to $a and $b',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
