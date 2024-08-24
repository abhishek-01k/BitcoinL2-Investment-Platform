// @ts-nocheck
"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { useParams } from "next/navigation"
import { NextRouter, useRouter } from "next/router"
import axios from "axios"
import TelegramLoginButton from "telegram-login-button"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

import sendTelegramMessage from "../../actions/welcome"
import InvestmentPanel from "../../components/Layout/InvestmentPanel"

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false })

export default function MyBots() {
  const params = useParams()

  const [charttype, setChartType] = useState("candlestick")

  const { id, first_name, last_name, username, photo_url, auth_date, hash } =
    params

  const isLoggedIn = Boolean(id)

  console.log(id)

  const [series, setSeries] = useState([])
  const [selectedCurrency, setSelectedCurrency] = useState("ethereum")

  useEffect(() => {
    if (isLoggedIn && id) {
      const welcomeMessage = "Welcome to the XChain-BTS-Investment Bot!"
      sendTelegramMessage(id, welcomeMessage)
        .then((response: any) => console.log("Message sent:", response))
        .catch((error: any) => console.error("Error:", error))
    }
  }, [id, isLoggedIn])

  useEffect(() => {
    const fetchData = async () => {
      // fetch the data from the coingecko api
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${selectedCurrency}/ohlc?vs_currency=usd&days=14`
      )
      const formattedData = response.data.map((x: any) => ({
        x: new Date(x[0]),
        y: [x[1], x[2], x[3], x[4]],
      }))

      setSeries([{ data: formattedData }])
    }

    fetchData()
  }, [selectedCurrency])

  // show the chart via candlestick
  const options = {
    chart: {
      type: charttype,
      height: 350,
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
    theme: {
      mode: "light",
    },
  }

  const chartList = [
    "line",
    "area",
    "bar",
    "candlestick",
    "rangeBar",
    "rangeArea",
  ]

  return (
    <div className="flex flex-row">
      <InvestmentPanel />
      {/* <Separator orientation="vertical" className="w-[2px] h-screen" /> */}
      <div className="w-full border-l-2 px-4">
        <div className="flex flex-row gap-4 py-4">
          <div className="items-center border-r">
            <Select
              value={selectedCurrency}
              onValueChange={(value) => {
                setSelectedCurrency(value)
              }}
            >
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select Token" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Tokens</SelectLabel>
                  <SelectItem value="ethereum">ETH</SelectItem>
                  <SelectItem value="usd-coin">USDC</SelectItem>
                  <SelectItem value="tether">USDT</SelectItem>
                  <SelectItem value="chainlink">LINK</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select
              value={charttype}
              onValueChange={(value) => {
                setChartType(value)
              }}
            >
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select Chart Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Chart Types</SelectLabel>
                  {chartList.map((chart) => (
                    <SelectItem value={chart}>
                      <p className="text-sm capitalize">{chart}</p>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="">
            {!isLoggedIn ? (
              <TelegramLoginButton
                botName="alvara_xchain_investment_bot"
                dataOnauth={(user) => console.log(user)}
                // dataAuthUrl="https://xchain-alvara-investments.vercel.app/myaibot"
                cornerRadius={5}
              />
            ) : (
              <div className="flex h-[40px] w-[160px] flex-row items-center gap-[5px] rounded-[5px] bg-[#54A9EA] px-[10px]">
                <img
                  className="h-[30px] w-[30px] rounded-full"
                  src={decodeURIComponent(photo_url)}
                  alt=""
                />
                <span className="font-[16px] text-white">
                  {first_name} {last_name}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="">
          <div className="chart">
            <ApexChart
              options={options}
              series={series}
              type={charttype}
              height={700}
              width={1000}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
