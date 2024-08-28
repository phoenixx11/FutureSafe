
import { ethers } from "ethers";
import CapsulePaymentABI from "../contracts/CapsulePayment.json"; // Ensure you have the ABI file

const CONTRACT_ADDRESS = "0xYourContractAddress"; // Replace with your deployed contract address

export const getProvider = () => {
  if (typeof window !== "undefined" && (window as any).ethereum) {
    return new ethers.providers.Web3Provider((window as any).ethereum);
  }
  throw new Error("No Ethereum provider found");
};

export const getContract = () => {
  const provider = getProvider();
  const signer = provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, CapsulePaymentABI.abi, signer);
};

export const createCapsule = async (unlockDate: number, paymentAmount: ethers.BigNumber) => {
  try {
    const contract = getContract();
    const tx = await contract.createCapsule(unlockDate, paymentAmount);
    await tx.wait();
    return tx;
  } catch (error) {
    console.error("Error creating capsule:", error);
    throw error;
  }
};

export const unlockCapsule = async (capsuleId: number, paymentAmount: ethers.BigNumber) => {
  try {
    const contract = getContract();
    const tx = await contract.unlockCapsule(capsuleId, { value: paymentAmount });
    await tx.wait();
    return tx;
  } catch (error) {
    console.error("Error unlocking capsule:", error);
    throw error;
  }
};
