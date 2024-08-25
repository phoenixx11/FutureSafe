// src/utils/web3auth.ts
import { Web3Auth } from "@web3auth/core";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { CHAIN_NAMESPACES } from "@web3auth/base";

export const initWeb3Auth = async () => {
  const clientId = "YOUR_CLIENT_ID"; // Obtain this from Web3Auth Dashboard

  const web3auth = new Web3Auth({
    clientId,
    chainConfig: {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId: "0x1", // Ethereum Mainnet
      rpcTarget: "https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID", // Replace with your RPC provider
    },
  });

  const openloginAdapter = new OpenloginAdapter({
    adapterSettings: {
      network: "testnet", // or "testnet"
      uxMode: "popup", // Choose between "popup" and "redirect"
      whiteLabel: {
        name: "FutureSafe",
        logoLight: "path/to/light-logo.png",
        logoDark: "path/to/dark-logo.png",
        defaultLanguage: "en",
        dark: true,
      },
      loginConfig: {
        google: {
          verifier: "YOUR_GOOGLE_VERIFIER",
          clientId: "YOUR_GOOGLE_CLIENT_ID",
        },
      },
      mfaLevel: "default", // Options: "default", "optional", "mandatory"
    },
  });

  web3auth.configureAdapter(openloginAdapter);

  await web3auth.initModal();

  return web3auth;
};
