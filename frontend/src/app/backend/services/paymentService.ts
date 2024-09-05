import { JsonRpcProvider, parseEther } from 'ethers'; // Directly import from ethers v6

export const triggerPayment = async (): Promise<boolean> => {
  try {
    // Initialize the provider with your RPC URL
    const provider = new JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/kksljUTHDVAvILBoeYSu0qM2ybE2EFXD');
    
    // Get the signer (the sender's wallet)
    const signer = provider.getSigner(); // No need to await here in ethers v6
    
    // Fetch the user's address
    const address = await signer.getAddress(); 
    console.log(`User's Address: ${address}`);
    
    // Prepare the transaction
    const tx = await signer.sendTransaction({
      to: '0x7F513028Fc64a758CD96216d320b3dAa50791361', // Replace with the recipient's Ethereum address
      value: parseEther('0.01'), // Amount to send in Ether (adjust as needed)
    });

    console.log(`Transaction hash: ${tx.hash}`);

    // Wait for the transaction to be mined
    await tx.wait();
    console.log('Payment successful');
    
    return true; // Return true for success
  } catch (error) {
    // Log the error and return false on failure
    console.error('Payment failed:', error);
    return false;
  }
};
