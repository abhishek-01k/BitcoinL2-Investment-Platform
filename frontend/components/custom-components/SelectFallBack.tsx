// @ts-nocheck
import React, { useState } from "react";
import Select from "react-select";

// add more AI model trading stragies
const options = [
  { value: "sentiment_analysis", label: "Sentiment analysis" },
  { value: "trend_following", label: "Trend following" },
  { value: "copy_trading", label: "Copy trading" },
];

const SelectFallBack = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (option) => {
    setSelectedOption(option);
    console.log(`Option selected:`, option);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: "7px",
      height: "45px",
    }),
  
    menu: (provided) => ({
      ...provided,
      borderRadius: "7px",
    }),
    // Add styles for other parts as needed
  };

  return (
    <div className="fallback-strategy-select mt-[30px]">
      <label
        className="text-primary font-[500] text-[16px] "
        htmlFor="strategy"
      >
        FALLBACK STRATEGY
      </label>
      <Select
        id="strategy"
        value={selectedOption}
        onChange={handleChange}
        options={options}
        className="basic-single mt-[10px] rounded-[7px] h-[45px]"
        classNamePrefix="select"
        styles={customStyles}
        placeholder="Strategy"
        isClearable
      />
    </div>
  );
};

export default SelectFallBack;
