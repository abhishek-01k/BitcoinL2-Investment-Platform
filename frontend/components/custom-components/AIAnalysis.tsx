import React, { useEffect, useState } from "react"
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const AIAnalysis = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  const [selected, setSelected] = useState("")

  const analysisList = [
    {
      title: "CONSERVATIVE",
      time: "1 MONTH",
      percentChange: "+18",
      totalAvailable: 5,
      claimed: 5,
    },
    {
      title: "MODERATE",
      time: "3 MONTH",
      percentChange: "+18",
      totalAvailable: 5,
      claimed: 4,
    },
    {
      title: "DEGEN",
      time: "6 MONTH",
      percentChange: "-18",
      totalAvailable: 5,
      claimed: 3,
    },
  ]

  return (
    <div className="mt-[20px] border-y py-[20px]">
      <div className="flex flex-row gap-[8px]">
        <img className="w-[22px]" src="/aibot.svg" alt="" />
        <span className="text-[16px] font-[500] text-primary">ANALYSIS</span>
      </div>
      {loading ? (
        <div className="mt-6 flex animate-pulse space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-[10px] w-3/4 rounded bg-[#C3C3C3]"></div>
            <div className="space-y-2">
              <div className="h-[10px] rounded bg-[#C3C3C3]"></div>
              <div className="h-[10px] w-5/6 rounded bg-[#C3C3C3]"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="analysis mt-[26px] flex flex-row gap-[25px]">
          {analysisList.map((analaysis) => {
            const claimedColor =
              analaysis.claimed / analaysis.totalAvailable === 1
                ? "#F24E1E"
                : "#0FA958"
            const borderClass =
              selected && selected === analaysis.title ? "border-4" : "border"
            return (
              <Card
                className={`w-1/3 
                  ${borderClass} 
                  ${
                    selected === "CONSERVATIVE" &&
                    selected === analaysis.title &&
                    "border-green-600"
                  }
                  ${
                    selected === "MODERATE" &&
                    selected === analaysis.title &&
                    "border-yellow-600"
                  }
                  ${
                    selected === "DEGEN" &&
                    selected === analaysis.title &&
                    "border-red-600"
                  }`}
                onClick={() => {
                  setSelected(analaysis.title)
                }}
              >
                <CardHeader>
                  <CardTitle className="text-xl">{analaysis.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid w-full items-center gap-4">
                    <span className="h-[14px] text-[12px] font-[700] text-[#C3C3C3] ">
                      {analaysis.time}
                    </span>
                    <span className="mt-[6px] flex h-[25px] flex-row items-center text-[24px] font-[700]">
                      {analaysis.percentChange}%
                      {analaysis.percentChange.includes("+") ? (
                        <FaArrowUpLong color="#0FA958" />
                      ) : (
                        <FaArrowDownLong color="#F24E1E" />
                      )}
                    </span>
                    <span className={`text-[${claimedColor}]`}>
                      {analaysis.claimed}/{analaysis.totalAvailable}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default AIAnalysis
