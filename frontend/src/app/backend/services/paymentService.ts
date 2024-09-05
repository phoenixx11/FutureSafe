import { ethers } from 'ethers';

// Example using ethers.js for payment
export const triggerPayment = async (signProtocolAddress: string, amount: string, privateKey: string) => {
  try {
    // Connect to the Ethereum network
    const provider = new ethers.providers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/kksljUTHDVAvILBoeYSu0qM2ybE2EFXD');
    const wallet = new ethers.Wallet(privateKey, provider);

    // Create a transaction
    const tx = {
      to: signProtocolAddress,
      value: ethers.utils.parseEther(amount),
    };

    // Send the transaction
    const transactionResponse = await wallet.sendTransaction(tx);
    console.log('Payment transaction hash:', transactionResponse.hash);

    // Wait for the transaction to be mined
    await transactionResponse.wait();
    console.log('Payment confirmed:', transactionResponse.hash);

    return transactionResponse.hash;
  } catch (error) {
    console.error('Failed to trigger payment:', error);
    throw new Error('Payment failed');
  }
};
