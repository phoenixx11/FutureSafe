import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  defaultNetwork: "localhost",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/", // Replace with your Alchemy Project ID
      accounts: [''], // Replace with your private key
    },
  },
  solidity: "0.8.24",
};

export default config;





