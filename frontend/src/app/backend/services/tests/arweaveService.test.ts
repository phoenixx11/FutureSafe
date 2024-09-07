import arweave from '../arweaveService';  // Adjust the path according to your project structure

describe('Arweave Service', () => {
  it('should get network info', async () => {
    const info = await arweave.network.getInfo();
    console.log(info);
    expect(info).toBeDefined();
  }, 30000); // Sets the timeout to 30 seconds  
});
  