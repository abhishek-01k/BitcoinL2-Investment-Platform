import React from "react";
import { ethers } from "ethers";

const AddFundsButton = () => {
  const handleClick = async () => {
    // Check if MetaMask is installed
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }

    try {
      // Request account access if needed
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Create a new instance of the ethers provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Set the amount to send
      const amountInWei = ethers.utils.parseEther("0.0021");

      // Send the transaction
      const tx = await signer.sendTransaction({
        to: "0x219c60335e728b195b2101b3A8f2c23570173fAC",
        value: amountInWei,
        gasLimit: ethers.utils.hexlify(100000), // Example gas limit
      });

      console.log("Transaction Hash:", tx.hash);
      alert("Payment initiated. Check your wallet for transaction details.");
    } catch (error) {
      console.error(error);
      alert("An error occurred!");
    }
  };

  return (
    <button
      className="text-primary font-[500] text-[16px]"
      onClick={handleClick}
    >
      Add Funds
    </button>
  );
};

export default AddFundsButton;
