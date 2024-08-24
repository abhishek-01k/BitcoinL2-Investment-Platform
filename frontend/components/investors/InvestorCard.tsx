import * as React from "react"
import Image from "next/image"
import { Bitcoin, CircleDollarSign } from "lucide-react"
import { FaBucket } from "react-icons/fa6"
import { MdAccessTime } from "react-icons/md"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

const InvestorCard = ({
  title,
  volume,
  btsesNumber,
  profit,
  selected,
  handleCardSelect,
}: {
  title: string
  volume: string
  btsesNumber: number
  profit: string
  selected: boolean
  handleCardSelect: (title: string) => void
}) => {
  const borderClass = selected ? "border-4" : "border"
  return (
    <Card
      className={`w-[500px] cursor-pointer ${borderClass} 
      ${title === "Conservative" && selected && "border-green-600"}
       ${title === "Moderate" && selected && "border-yellow-600"}
       ${title === "Degen" && selected && "border-red-600"}
      `}
      onClick={() => handleCardSelect(title)}
    >
      <CardHeader>
        <CardDescription className="flex flex-row justify-between">
          Investor :
          <div className="flex flex-row items-center gap-1">
            <FaBucket />
            <span className="text-md">{Math.ceil(btsesNumber / 4)}</span>
          </div>
        </CardDescription>
        <CardTitle>{title.toUpperCase()}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className=" max-w-[500px]">
          <Image
            src={`/${title.toLowerCase()}-investor.png`}
            alt={title}
            width={400}
            height={400}
            className="h-[250px]"
          />
        </div>
        <div className="mt-12 flex flex-col gap-2">
          <div className="flex items-center ">
            <div className="ml-4 space-y-1">
              <div className="flex  items-center gap-1">
                <CircleDollarSign />
                <p className="text-lg font-medium leading-none">TVL</p>
              </div>

              <p className="text-muted-foreground text-sm"></p>
            </div>
            <div className="ml-auto font-medium">
              ${parseFloat(volume).toLocaleString()}
            </div>
          </div>
          <div className="flex items-center">
            <div className="ml-4 space-y-1">
              <div className="flex  items-center gap-1">
                <MdAccessTime size={24} />
                <p className="text-lg font-medium leading-none">24h Volume</p>
              </div>
              <p className="text-muted-foreground text-sm"></p>
            </div>
            <div className="ml-auto font-medium">
              {" "}
              ${parseFloat(profit).toLocaleString()}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { InvestorCard }
