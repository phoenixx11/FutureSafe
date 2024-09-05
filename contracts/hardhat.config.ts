import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  defaultNetwork: "localhost",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/kksljUTHDVAvILBoeYSu0qM2ybE2EFXD", // Replace with your Alchemy Project ID
      accounts: ['0xbd11757a1dda972b7c67f1b1573a0a403f7b1ca8f119ffbf1d96aa7885b4910f'], // Replace with your private key
    },
  },
  solidity: "0.8.24",
};

export default config;





