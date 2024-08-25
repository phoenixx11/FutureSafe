// src/components/LoginButton.tsx
import { useEffect, useState } from "react";
import { initWeb3Auth } from "../utils/web3auth";
import { Web3Auth } from "@web3auth/core";

export const LoginButton = () => {
  const [web3auth, setWeb3Auth] = useState<Web3Auth | null>(null);

  useEffect(() => {
    const initializeWeb3Auth = async () => {
      const web3auth = await initWeb3Auth();
      setWeb3Auth(web3auth);
    };

    initializeWeb3Auth();
  }, []);

  const login = async () => {
    if (web3auth) {
      await web3auth.connect();
    }
  };

  return <button onClick={login}>Login</button>;
};
