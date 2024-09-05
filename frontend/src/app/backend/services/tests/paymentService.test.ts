import { triggerPayment } from './paymentService';
import { JsonRpcProvider } from 'ethers';

// Mock dependencies
jest.mock('ethers', () => {
  const actualEthers = jest.requireActual('ethers');
  return {
    ...actualEthers,
    JsonRpcProvider: jest.fn().mockImplementation(() => ({
      getSigner: jest.fn().mockReturnValue({
        getAddress: jest.fn().mockResolvedValue('0xYourMockAddress'),
        sendTransaction: jest.fn().mockResolvedValue({
          hash: '0xMockTransactionHash',
          wait: jest.fn().mockResolvedValue({}),
        }),
      }),
    })),
  };
});

describe('triggerPayment', () => {
  it('should successfully complete a payment', async () => {
    const result = await triggerPayment();
    expect(result).toBe(true);
  });

  it('should log the user\'s address', async () => {
    console.log = jest.fn();
    await triggerPayment();
    expect(console.log).toHaveBeenCalledWith('User\'s Address: 0xYourMockAddress');
  });

  it('should log the transaction hash', async () => {
    console.log = jest.fn();
    await triggerPayment();
    expect(console.log).toHaveBeenCalledWith('Transaction hash: 0xMockTransactionHash');
  });

  it('should log payment success', async () => {
    console.log = jest.fn();
    await triggerPayment();
    expect(console.log).toHaveBeenCalledWith('Payment successful');
  });

  it('should return false on payment failure', async () => {
    const mockProvider = new JsonRpcProvider();
    mockProvider.getSigner().sendTransaction = jest.fn().mockRejectedValue(new Error('Payment failed'));

    const result = await triggerPayment();
    expect(result).toBe(false);
  });
});
