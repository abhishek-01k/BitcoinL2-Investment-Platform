import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const InvestmentPanel = () => {
  const data = [
    {
      name: "Aug",
      Estimate: 4000,
      Actual: 2400,
      amt: 2400,
    },
    {
      name: "Sept",
      Estimate: 3000,
      Actual: 1398,
      amt: 2210,
    },
    {
      name: "Oct",
      Estimate: 2000,
      Actual: 1800,
      amt: 2290,
    },
    {
      name: "Nov",
      Estimate: 2780,
      Actual: 2908,
      amt: 2000,
    },
    {
      name: "Dec",
      Estimate: 1890,
      Actual: 1800,
      amt: 2181,
    },
  ];
  return (
    <div className="z-50">
      <div className="flex flex-col w-[393px]">
        <div className="flex flex-row justify-end py-[11px] px-[12px]"></div>
        <div className="flex flex-col ">
          <div className="border-b-[0.25px] p-[20px] pt-[5px]">
            <div className="h-[240px] flex flex-row justify-center">
              <img src="/moderate-investor.png" alt="moderate investor" />
            </div>
            <p className="text-[28px] font-[700] text-primary">
              Customise your AI Bot
            </p>
          </div>
          <div className="border-b-[0.25px] p-[20px]">
            <div className="flex flex-row  mt-[24px] space-x-[50px]">
              <div className="flex flex-col">
                <span className="text-[14px] font-[500] text-grey">
                  Invested value
                </span>
                <span className="text-[20px] text-primary font-[500]">
                  5,000
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-[500] text-grey">
                  Current Value
                </span>
                <span className="text-[20px] text-primary font-[500]">
                  5,601
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-[500] text-grey">
                  Day&apos;s Profit
                </span>
                <span className="text-[20px] text-primary font-[500]">601</span>
              </div>
            </div>
            <div className="flex flex-row mt-[24px] space-x-[40px]">
              <div className="flex flex-col">
                <span className="text-[14px] font-[500] text-grey">
                  Unrealised Profit
                </span>
                <span className="text-[20px] text-primary font-[500]">350</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-[500] text-grey">
                  Realised profit
                </span>
                <span className="text-[20px] text-primary font-[500]">210</span>
              </div>
            </div>
          </div>
          <div className="border-b-[0.25px] p-[20px]">
            <div className="flex flex-row mt-[24px] space-x-[100px]">
              <div className="flex flex-col">
                <span className="text-[14px] font-[500] text-grey">
                  Max Gainer
                </span>
                <span className="text-[20px] text-primary font-[500]">
                  LINK
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-[500] text-grey">
                  Max Loser
                </span>
                <span className="text-[20px] text-primary font-[500]">ETH</span>
              </div>
            </div>
          </div>
          <div className="border-b-[0.25px] p-[20px]">
            <p className="text-[20px] font-[500] text-primary">
              Portfolio Forecast
            </p>
            <div className="h-[218px] pt-[20px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  width={500}
                  height={300}
                  data={data}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="Actual"
                    stroke="#6E5B98"
                    activeDot={{ r: 8 }}
                  />
                  <Line type="monotone" dataKey="Estimate" stroke="#C0B5D9" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentPanel;
