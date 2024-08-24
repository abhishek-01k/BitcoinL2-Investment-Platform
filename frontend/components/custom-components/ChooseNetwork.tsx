// @ts-nocheck
import React, { useState } from "react";

const ChooseNetwork = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedTokens, setSelectedTokens] = useState([]);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const tokens = [
    {
      name: "Ethereum",
      percentage: 50,
      image:
        "https://assets.coingecko.com/coins/images/279/small/ethereum.png?1696501628",
    },
    {
      name: "Binance Smart Chain",
      percentage: 50,
      image: "https://cryptologos.cc/logos/binance-coin-bnb-logo.png?v=022",
    },
    {
      name: "Polygon",
      percentage: 50,
      image:
        "https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png?1624446912",
    },
    {
      name: "Avalanche",
      percentage: 50,
      image: "https://cryptologos.cc/logos/avalanche-avax-logo.png?v=022",
    },
    {
      name: "Arbitrum",
      percentage: 50,
      image:
        "https://assets.coingecko.com/coins/images/16547/small/photo_2023-03-29_21.47.00.jpeg?1696516109",
    },
    {
      name: "Optimism",
      percentage: 50,
      image:
        "https://assets.coingecko.com/coins/images/25244/small/Optimism.png?1696524385",
    },
  ];

  const selectToken = (tokenName) => {
    setSelectedTokens((prevSelectedTokens) => {
      if (prevSelectedTokens.includes(tokenName)) {
        return prevSelectedTokens.filter((name) => name !== tokenName);
      } else {
        return [...prevSelectedTokens, tokenName];
      }
    });
  };

  const getTokenDetails = (tokenName) => {
    return tokens.find((token) => token.name === tokenName);
  };

  const unselectToken = (tokenName) => {
    setSelectedTokens(selectedTokens.filter((name) => name !== tokenName));
  };

  return (
    <div className="mt-[33px] relative">
      <div
        className="flex flex-row gap-[5px] w-[600px] h-[53px] rounded-[10px] justify-center items-center bg-primary cursor-pointer"
        onClick={toggleDropdown}
      >
        <span className="flex flex-row items-center gap-[5px] text-[16px] font-[500] text-white">
          Choose chain
        </span>
      </div>
      {isDropdownVisible && (
        <div className="absolute pt-[10px] top-[53px] w-[600px] h-[275px] overflow-scroll border border-[#DCD2C7] rounded-[10px] bg-white z-10">
          {tokens.map((token) => (
            <div
              key={token.name}
              className={`flex flex-row h-[50px] px-[30px] items-center gap-[10px] cursor-pointer ${
                selectedTokens.includes(token.name) ? "bg-accent" : ""
              }`}
              onClick={() => selectToken(token.name)}
            >
              <img
                className="h-[30px] w-[30px] rounded-full"
                src={token.image}
                alt={token.name}
              />
              <span className="font-[16px] text-[500]">{token.name}</span>
            </div>
          ))}
        </div>
      )}
      {selectedTokens.length > 0 && (
        <div className="mt-[20px]">
          {selectedTokens.length > 0 && (
            <div className="mt-[20px] flex flex-row gap-[10px]">
              {selectedTokens.map((tokenName) => {
                const tokenDetails = getTokenDetails(tokenName);
                return (
                  <div className="flex flex-row items-center gap-[20px]">
                    <div
                      key={tokenName}
                      className="flex flex-row items-center justify-center gap-[10px] h-[40px] w-[194px] border border-primary rounded-[10px] bg-white"
                    >
                      <img
                        className="h-[30px] w-[30px]"
                        src={tokenDetails.image}
                        alt={tokenDetails.name}
                      />
                      <span className="font-[16px] text-[500]">
                        {tokenDetails.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChooseNetwork;
