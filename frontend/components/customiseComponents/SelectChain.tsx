import React from "react"
import Image from "next/image"

import { ChainList } from "@/config/ChainList"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const SelectChain = ({
  selectedChain,
  setSelectedChain,
}: {
  selectedChain: string
  setSelectedChain: (selectedChain: string) => void
}) => {
  return (
    <div className="w-full">
      <Select
        onValueChange={(value) => {
          setSelectedChain(value)
        }}
      >
        <SelectTrigger className="">
          <SelectValue placeholder="Select Chain" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {ChainList.map((token) => (
              <SelectItem value={token.name} className="cursor-pointer py-2">
                <div className="flex flex-row items-center gap-4">
                  <Image
                    src={token.image}
                    alt={token.name}
                    height={30}
                    width={30}
                  />
                  <p> {token.name}</p>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default SelectChain
