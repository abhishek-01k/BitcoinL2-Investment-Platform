import React from "react";
import AddFundsButton from "../Layout/AddFundsButton";

const AddFunds = () => {
  return (
    <div className="flex flex-row justify-between px-[20px] mt-[20px] w-[600px] h-[53px] border border-[#DCD2C7] rounded-[10px] items-center ">
      <input
        className="text-primary font-[500] text-[16px]"
        value="1000"
        type="text"
      />
      {/* <span className="text-primary font-[500] text-[16px]"> Add Funds</span> */}
      <AddFundsButton />
    </div>
  );
};

export default AddFunds;
