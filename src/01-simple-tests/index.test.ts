// Uncomment the code below and write your tests
// import { simpleCalculator, Action } from './index';

import { simpleCalculator } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 3, action: '+' })).toBe(8);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 3, action: '-' })).toBe(2);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 3, action: '*' })).toBe(15);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 6, b: 3, action: '/' })).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: '^' })).toBe(8);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: '$' })).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: 'a', b: 'b', action: '+' })).toBe(null);
  });
});
