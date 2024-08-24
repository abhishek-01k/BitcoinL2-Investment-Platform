// @ts-nocheck
"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"

import { BASE_URL } from "@/config/address"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { BotCard } from "@/components/BotCard"

import sendTelegramMessage from "../../actions/welcome"
import { InvestorCard } from "../../components/investors/InvestorCard"

type BTSDataType = {
  tvl: { usd: string }
  all_time_performance: number
  "24hourVolume": number
  "24hourPriceChange": number
  amount: string
  total_supply: string
}

type CategorizedBTS = BTSDataType & {
  score: number
  category: string
}

export default function Home() {
  const [selectedCard, setSelectedCard] = useState<string>("")
  const [groupedBTS, setGroupedBTS] = useState<CategorizedBTS[]>([])

  useEffect(() => {
    const fetchBTSData = async () => {
      try {
        const url = `${BASE_URL}/bts/trending`
        const res = await fetch(url)
        const response = await res.json()
        const { docs } = response

        // Send only top 10 BTS token
        const BTSData = docs

        // for faster testing with only 10 BTS tokens
        // const BTSData = docs.length > 10 ? docs.slice(0, 10) : docs

        const categorizedBTS = categorizeBTS(BTSData)
        setGroupedBTS(categorizedBTS)
      } catch (error) {
        console.error("Error fetching BTS data:", error)
      }
    }

    fetchBTSData()
  }, [])

  const handleCardSelect = (cardTitle: string) => {
    setSelectedCard(cardTitle)
  }

  const welcome = () => {
    const welcomeMessage = "Welcome to AlvaraXChainInvestment !"
    sendTelegramMessage("kamalthedev", welcomeMessage)
      .then((response: any) => console.log("Message sent:", response))
      .catch((error: any) => console.error("Error:", error))
  }

  function categorizeBTS(btsData: BTSDataType[]): CategorizedBTS[] {
    const maxValues = {
      tvl: Math.max(...btsData.map((bts) => parseFloat(bts.tvl.usd))),
      performance: Math.max(...btsData.map((bts) => bts.all_time_performance)),
      volume: Math.max(...btsData.map((bts) => bts["24hourVolume"])),
      priceChange: Math.max(
        ...btsData.map((bts) => Math.abs(bts["24hourPriceChange"]))
      ),
      amount: Math.max(...btsData.map((bts) => parseFloat(bts.amount))),
      supply: Math.max(...btsData.map((bts) => parseFloat(bts.total_supply))),
    }

    return btsData.map((bts) => {
      const normalizedTVL = parseFloat(bts.tvl.usd) / maxValues.tvl
      const normalizedPerformance =
        bts.all_time_performance / maxValues.performance
      const normalizedVolume = bts["24hourVolume"] / maxValues.volume
      const normalizedPriceChange =
        1 - Math.abs(bts["24hourPriceChange"]) / maxValues.priceChange
      const normalizedAmount = parseFloat(bts.amount) / maxValues.amount
      const normalizedSupply = parseFloat(bts.total_supply) / maxValues.supply

      const score =
        0.3 * normalizedTVL +
        0.2 * normalizedPerformance +
        0.2 * normalizedVolume -
        0.1 * normalizedPriceChange +
        0.1 * normalizedAmount +
        0.1 * normalizedSupply

      let category = "Moderate"
      if (score > 0.75) {
        category = "Conservative"
      } else if (score < 0.4) {
        category = "Degen"
      }

      return {
        ...bts,
        score,
        category,
      }
    })
  }

  const fetchTotalVolumeBasedOnBTS = (arr, category) => {
    const filtered = arr.filter((item) => item.category === category)
    const totalVolume = filtered.reduce((sum, item) => sum + item.tvl.usd, 0)
    const averageVolume =
      filtered.length > 0 ? totalVolume / filtered.length : 0

    return averageVolume
  }

  const fetchLast24HourVolumeChange = (arr, category) => {
    const filtered = arr.filter((item) => item.category === category)
    const totalVolume = filtered.reduce(
      (sum, item) => sum + item["24hourVolume"],
      0
    )
    const averageVolume =
      filtered.length > 0 ? totalVolume / filtered.length : 0

    return averageVolume
  }

  return (
    <div className="flex flex-col gap-8 px-20 py-8">
      <div>
        <h5 className="text-[24px] font-[700]">EXPLORE</h5>
        <p className="text-[12px] font-[700] text-[#C3C3C3]">
          Choose your investor type
        </p>
      </div>

      <div className="flex flex-col gap-12">
        <div className="flex flex-row justify-center gap-12 border-[#DCD2C7]">
          {["Conservative", "Moderate", "Degen"].map((title, index) => {
            const averageVolumeBasedOnCategory = fetchTotalVolumeBasedOnBTS(
              groupedBTS,
              title
            )
            const btses = groupedBTS.filter((item) => item.category === title)

            const profit = fetchLast24HourVolumeChange(groupedBTS, title)
            return (
              <InvestorCard
                key={index}
                selected={selectedCard === title}
                title={title}
                btsesNumber={btses?.length}
                volume={averageVolumeBasedOnCategory}
                profit={profit}
                handleCardSelect={handleCardSelect}
              />
            )
          })}
        </div>

        <Separator />
      </div>

      {selectedCard && (
        <>
          <BotCard
            title={selectedCard}
            key={selectedCard}
            btsData={groupedBTS.filter(
              (bts) => bts.category.toLowerCase() === selectedCard.toLowerCase()
            )}
            category={selectedCard.toLowerCase()}
          />

          <Link href="/customise">
            <div className=" border-primary flex h-[238px] w-[393px] cursor-pointer flex-col items-center justify-center rounded-[8px] border p-[21px] py-[15px]">
              <h2 className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                Customise your investment by choosing own set % of tokens
              </h2>
            </div>
          </Link>
        </>
      )}
    </div>
  )
}
