import React, { Dispatch, FC, SetStateAction, useEffect, useState } from "react"
import Image from "next/image"
import { PlusIcon } from "lucide-react"
import { BsPlusCircleFill } from "react-icons/bs"
import { FaMinus, FaPlus } from "react-icons/fa6"
import { MdCancel } from "react-icons/md"
import { RxCross1 } from "react-icons/rx"
import { toast } from "react-toastify"

import { TokenList } from "@/config/TokenList"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "../ui/button"
import { TokenState } from "./CustomiseForm"

type SelectTokenProps = {
  tokens: TokenState
  setTokens: (updateTokens: (prevTokens: TokenState) => TokenState) => void
}

const SelectToken: FC<SelectTokenProps> = ({ tokens, setTokens }) => {
  const addToken = (tokenName: string, percentage: number) => {
    setTokens(
      (prevTokens: TokenState) =>
        ({
          ...prevTokens,
          [tokenName]: percentage,
        } as TokenState)
    )
  }

  const removeToken = (tokenName: string) => {
    setTokens((prevTokens: TokenState) => {
      const newTokens = { ...prevTokens }
      delete newTokens[tokenName]
      return newTokens
    })
  }

  const increaseTokenPercentage = (tokenName: string, amount: number) => {
    setTokens((prevTokens: TokenState) => {
      if (prevTokens[tokenName]) {
        return { ...prevTokens, [tokenName]: prevTokens[tokenName] + amount }
      } else {
        console.log(`Token '${tokenName}' not found`)
        return prevTokens
      }
    })
  }

  const decreaseTokenPercentage = (tokenName: string, amount: number) => {
    setTokens((prevTokens: TokenState) => {
      if (prevTokens[tokenName]) {
        const newAmount = Math.max(0, prevTokens[tokenName] - amount)
        return { ...prevTokens, [tokenName]: newAmount }
      } else {
        console.log(`Token '${tokenName}' not found`)
        return prevTokens
      }
    })
  }

  const getToken = (tokenName: string) => {
    return TokenList.find((token) => token.name === tokenName)
  }

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger className="w-full">
          <Button className="w-full ">
            <div className="flex flex-row items-center gap-1">
              Choose tokens
              <BsPlusCircleFill />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[28rem] ">
          {TokenList.map((token) => (
            <DropdownMenuItem
              onClick={() => {
                addToken(token.name, 10)
              }}
              className={`my-2 ${
                Object.keys(tokens).includes(token.name) ? " bg-accent" : ""
              }`}
            >
              <div
                key={token.name}
                className={`flex h-[50px] cursor-pointer flex-row items-center gap-[10px] px-[30px] ${
                  Object.keys(tokens).includes(token.name) ? "bg-accent" : ""
                }`}
              >
                <Image
                  src={token.image}
                  alt={token.name}
                  height={30}
                  width={30}
                />
                <span className="font-[16px] text-[500]">{token.name}</span>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="mt-8 flex flex-col gap-4">
        {Object.keys(tokens).map((tokenName: string) => {
          const tokenDetails = getToken(tokenName)
          if (tokenDetails) {
            return (
              <div key={tokenName}>
                <div className="flex flex-row items-center gap-[20px]">
                  <div
                    key={tokenName}
                    className="flex w-[250px] flex-row items-center justify-center gap-[10px] rounded-[10px] border px-4 py-2"
                  >
                    <Image
                      src={tokenDetails.image}
                      alt={tokenDetails.name}
                      height={30}
                      width={30}
                    />
                    <h3 className="scroll-m-20 text-lg font-semibold tracking-tight">
                      {tokenDetails.name}
                    </h3>
                  </div>
                  <div className="flex w-[250px] flex-row items-center justify-between gap-[10px] rounded-[10px] border px-4 py-2">
                    <FaMinus
                      onClick={() => decreaseTokenPercentage(tokenName, 10)}
                    />
                    <span className="font-[500]">
                      {tokens[tokenName.toString()]} %
                    </span>
                    <FaPlus
                      onClick={() => increaseTokenPercentage(tokenName, 10)}
                    />
                  </div>
                  <RxCross1
                    size={25}
                    onClick={() => removeToken(tokenName)}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}

export default SelectToken
