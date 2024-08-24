import React from "react"
import Image from "next/image"
import { MdSentimentVerySatisfied } from "react-icons/md"

import { Strategies } from "@/config/StrategiesList"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const Strategy = ({
  strategy,
  setStrategy,
}: {
  strategy: string
  setStrategy: (strategy: string) => void
}) => {
  return (
    <div className="w-full">
      <Select
        onValueChange={(value) => {
          setStrategy(value)
        }}
      >
        <SelectTrigger className="">
          <SelectValue placeholder="Select Strategy" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {Strategies.map((strategy) => {
              const ImageSrc = strategy.icon
              return (
                <SelectItem
                  value={strategy.value}
                  className="cursor-pointer py-2"
                >
                  <div className="flex flex-row items-center gap-4">
                    <ImageSrc size={25} />
                    <p> {strategy.label}</p>
                  </div>
                </SelectItem>
              )
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default Strategy
