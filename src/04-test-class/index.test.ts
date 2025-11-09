import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from './index';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const bankAccount = getBankAccount(100);
    expect(bankAccount.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const bankAccount = getBankAccount(100);
    expect(() => bankAccount.withdraw(200)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const a = getBankAccount(100);
    const b = getBankAccount(200);
    expect(() => a.transfer(200, b)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const a = getBankAccount(100);
    expect(() => a.transfer(200, a)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const bankAccount = getBankAccount(100);
    bankAccount.deposit(200);
    expect(bankAccount.getBalance()).toBe(300);
  });

  test('should withdraw money', () => {
    const bankAccount = getBankAccount(200);
    bankAccount.withdraw(100);
    expect(bankAccount.getBalance()).toBe(100);
  });

  test('should transfer money', () => {
    const a = getBankAccount(200);
    const b = getBankAccount(100);
    a.transfer(100, b);
    expect(a.getBalance()).toBe(100);
    expect(b.getBalance()).toBe(200);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const bankAccount = getBankAccount(200);
    const balance = await bankAccount.fetchBalance();

    if (balance === null) {
      expect(typeof balance).toBe('object');
    } else {
      expect(typeof balance).toBe('number');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const bankAccount = getBankAccount(200);

    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(200);

    await bankAccount.synchronizeBalance();

    expect(bankAccount.getBalance()).toBe(200);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const bankAccount = getBankAccount(200);

    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(null);

    await expect(bankAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
