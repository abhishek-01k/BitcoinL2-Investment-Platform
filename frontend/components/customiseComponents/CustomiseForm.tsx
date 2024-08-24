import React, { useState } from "react"
import Link from "next/link"
import { StrategyInput } from "@/types"
import { toast } from "react-toastify"
import { prepareTransaction, sendTransaction, toWei } from "thirdweb"
import { sepolia } from "thirdweb/chains"
import { useActiveAccount, useConnectModal } from "thirdweb/react"

import { client } from "@/config/wallet"

import AIAnalysis from "../custom-components/AIAnalysis"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import InputStrategy from "./InputStrategy"
import SelectChain from "./SelectChain"
import SelectToken from "./SelectToken"
import Strategy from "./Strategy"

export type TokenState = {
  [key: string]: number
}

const CustomiseForm = () => {
  const { connect, isConnecting } = useConnectModal()
  const activeAccount = useActiveAccount()

  const [funds, setFunds] = useState<any>()

  const handleAddFunds = async () => {
    if (!activeAccount?.address) {
      connect({ client })
    }

    if (activeAccount?.address) {
      try {
        // Change this to the Bot address
        const transaction = prepareTransaction({
          to: "0xE5A730337eaF120A7627AB7A3F083a7b4b865EB0",
          chain: sepolia,
          client: client,
          value: toWei(funds),
        })

        const { transactionHash } = await sendTransaction({
          account: activeAccount,
          transaction,
        })
        console.log("transactionHash >>>", transactionHash)
        toast.success(`Transaction successful ${transactionHash}`)
      } catch (error) {
        console.log("Error >>", error)
        toast.error("Error in the transaction")
      }
    }
  }

  const [tokens, setTokens] = useState<TokenState>({})
  const [selectedChain, setSelectedChain] = useState("")
  const [strategy, setStrategy] = useState("")

  const [strategyInput, setStrategyInput] = useState<StrategyInput>({
    stopLoss: "",
    takeProfit: "",
    continousMonitoring: false,
    showSuggestions: false,
  })

  const handleConfirm = () => {
    const input = {
      fundsAdded: funds,
      tokens,
      selectedChain,
      ...strategyInput,
    }

    console.log("Input >>>", input)
  }

  return (
    <div className="flex flex-col gap-12">
      <div>
        <h2 className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Customise an AI BOT for your Investment
        </h2>
      </div>
      <div className="flex max-w-md flex-col justify-center gap-8">
        <div className="flex w-full items-center space-x-2">
          <Input
            id="funds"
            type="text"
            className="w-3/4"
            value={funds}
            placeholder="Enter Funds"
            onChange={(e) => {
              setFunds(e.target.value)
            }}
          />
          <Button type="submit" className="w-1/4" onClick={handleAddFunds}>
            Add Funds{" "}
          </Button>
        </div>

        <SelectToken tokens={tokens} setTokens={setTokens} />
        <SelectChain
          selectedChain={selectedChain}
          setSelectedChain={setSelectedChain}
        />
        <Strategy strategy={strategy} setStrategy={setStrategy} />

        <InputStrategy
          strategyInput={strategyInput}
          setStrategyInput={setStrategyInput}
        />
      </div>

      {strategyInput.showSuggestions && <AIAnalysis />}

      <div>
        <Link href="/createaibot">
          <Button onClick={handleConfirm}>Confirm</Button>
        </Link>
      </div>
    </div>
  )
}

export default CustomiseForm
