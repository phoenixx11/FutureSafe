import Arweave from 'arweave';

// Initialize Arweave client
const arweave = Arweave.init({
  host: 'localhost',
  port: 1984,
  protocol: 'https'
});

export const storeDataOnArweave = async (encryptedData: Uint8Array): Promise<string> => {
  try {
    const transaction = await arweave.createTransaction({ data: encryptedData });
    await arweave.transactions.sign(transaction);
    await arweave.transactions.post(transaction);

    console.log('Data stored on Arweave with transaction ID:', transaction.id);
    return transaction.id;
  } catch (error) {
    console.error('Error storing data on Arweave:', error);
    throw new Error('Failed to store data on Arweave');
  }
};
export default arweave;