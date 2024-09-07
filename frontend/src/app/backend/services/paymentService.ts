import { JsonRpcProvider, Wallet, parseEther } from 'ethers'; 
import { ethers } from 'ethers'; 

const signProtocolAddress = '0x7F513028Fc64a758CD96216d320b3dAa50791361'; 
const privateKey = '0xbd11757a1dda972b7c67f1b1573a0a403f7b1ca8f119ffbf1d96aa7885b4910f'; 

// Function to trigger payment
export const triggerPayment = async (amount: string) => {
  try {
    const provider = new ethers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/kksljUTHDVAvILBoeYSu0qM2ybE2EFXD');
    const wallet = new ethers.Wallet(privateKey, provider);
    const sanitizedAmount = amount ? amount.toString().trim() : null;
    if (!sanitizedAmount || isNaN(Number(sanitizedAmount))) {
      throw new Error('Invalid amount for payment');
    }
    // Set up the transaction
    const tx = {
      to: signProtocolAddress, 
      value: parseEther(sanitizedAmount), // Convert amount to wei
      gasLimit: 21000, // Standard gas limit for a simple ETH transfer
    };

    // Send the transaction
    const transaction = await wallet.sendTransaction(tx);
    await transaction.wait();

    console.log('Payment transaction hash:', transaction.hash);
    return transaction.hash;
  } catch (error) {
    console.error('Payment transaction failed:', error);
    throw new Error('Payment transaction failed');
  }
};

// usage
(async () => {
  try {
    const transactionHash = await triggerPayment('0.01'); // Sending 
    console.log('Transaction successful:', transactionHash);
  } catch (error) {
    console.error('Error in payment:', error);
  }
})();
