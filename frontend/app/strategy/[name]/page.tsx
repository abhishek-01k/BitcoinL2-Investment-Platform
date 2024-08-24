// @ts-nocheck
"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { toast } from "react-toastify"
import {
  getContract,
  prepareContractCall,
  sendBatchTransaction,
  sendTransaction,
  toWei,
} from "thirdweb"
import { sepolia } from "thirdweb/chains"
import { useActiveAccount, useSendBatchTransaction } from "thirdweb/react"

import { BASE_URL } from "@/config/address"
import { client } from "@/config/wallet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Investment = {
  percentage: number
  contractAddress: string // or any other type you need
  amount?: number
}

type Investments = {
  [btsId: string]: Investment
}

const StrategyPage = ({ strategy, bts }) => {
  const searchParams = useSearchParams()
  const ArrayOfBTS = searchParams.get("btsData")

  const fetchDataBasedOnId = async (id) => {
    const url = `${BASE_URL}/bts/${id}`
    const response = await fetch(url)
    const res = await response.json()
    return res
  }

  const [BTSData, setBTSData] = useState<any[]>([])
  useEffect(() => {
    if (ArrayOfBTS) {
      Promise.all(
        JSON.parse(ArrayOfBTS).map((id) => {
          return fetchDataBasedOnId(id)
        })
      ).then((btsArray) => {
        setBTSData(btsArray)
      })
    }
  }, [ArrayOfBTS])

  const [investments, setInvestments] = useState<Investments>({})
  const [investAmount, setInvestAmount] = useState<string>("")

  const handleInvestmentChange = (bts, value) => {
    const newInvestments = { ...investments }
    const totalInvestment = Object.entries(newInvestments)
      .filter(([key]) => key !== bts.id)
      .reduce((acc, [key, currValue]) => acc + currValue.percentage, 0)
    const remainingPercentage = 100 - totalInvestment
    const percentage = Math.min(value, remainingPercentage)
    newInvestments[bts.id] = {
      percentage,
      contractAddress: bts.address,
    }

    setInvestments(newInvestments)
  }

  const { mutate: sendBatch, data: transactionResult } =
    useSendBatchTransaction()

  const handleInvest = async () => {
    if (!investAmount) return
    if (!activeAccount) return
    const totalAmount = parseFloat(investAmount) // Convert string to number

    const actualInvestments = Object.entries(investments).reduce(
      (acc, [btsId, investment]) => {
        const percentage = investment.percentage
        const investmentAmount = (totalAmount * percentage) / 100
        acc[btsId] = {
          ...investment,
          amount: investmentAmount,
        }
        return acc
      },
      {} as Record<string, Investment>
    )

    for (const [btsId, investment] of Object.entries(actualInvestments)) {
      contribute(investment)
    }
  }

  const activeAccount = useActiveAccount()
  const [loading, setLoading] = useState(false)

  const contribute = async (actualInvestments: Investment) => {
    if (actualInvestments && activeAccount) {
      setLoading(true)
      const contract = getContract({
        address: actualInvestments.contractAddress,
        chain: sepolia,
        client: client,
      })

      const amount: number = actualInvestments.amount!

      const transaction = prepareContractCall({
        contract,
        method: "function contribute(uint256 _slippage) external payable",
        params: [BigInt(20)],
        value: toWei(amount.toString()),
      })

      try {
        const { transactionHash } = await sendTransaction({
          account: activeAccount,
          transaction,
        })
        setLoading(false)

        console.log("transactionHash", transactionHash)
      } catch (error: any) {
        setLoading(false)
        console.log("Error ", error)
        toast.error("Error in transaction", error.message)
      }
    }
  }

  return (
    <div>
      <div className="my-12 ml-12">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          {strategy} Strategy
        </h1>

        <p className="max-w-[700px] text-lg text-muted-foreground">
          Set the percentage you want to contribute to
        </p>
      </div>
      <div>
        <div className="mb-4 ml-12 flex flex-row items-center justify-end gap-1.5">
          <p className="max-w-[700px] text-lg text-muted-foreground">
            Enter Amount (in ETH)
          </p>
          <Input
            id="Funds"
            placeholder="Enter Amount to invest"
            type="text"
            value={investAmount}
            onChange={(e) => {
              const value = e.target.value
              setInvestAmount(value)
            }}
            className="mr-12 w-[20rem]"
            min="0"
            step="any" // Use step="1" for integers only or step="any" for decimals
          />
        </div>

        <Table>
          <TableCaption>Customise your contributions.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Logo</TableHead>
              <TableHead>BTS Details</TableHead>
              <TableHead>Symbol</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Last24h Change</TableHead>
              <TableHead className="w-[350px]">Set Contribution</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {BTSData &&
              BTSData.map((bts) => (
                <TableRow key={bts._id}>
                  <TableCell className="font-medium">
                    <Image
                      src={bts.uri}
                      alt={bts.name}
                      width={40}
                      height={40}
                      className="rounded-lg"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <p className="text-lg font-medium leading-none">
                        {bts.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {bts.description?.slice(0, 25)}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="capitalize">{bts.symbol}</p>
                  </TableCell>
                  <TableCell>
                    <p className="">${bts.price.usd.toLocaleString()}</p>
                  </TableCell>
                  <TableCell>
                    <p
                      className={`text-sm ${
                        bts["24hourPriceChange"] < 0
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      &#40;{bts["24hourPriceChange"].toLocaleString()}%&#41;
                    </p>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center gap-2">
                      <Slider
                        onValueChange={(value) => {
                          handleInvestmentChange(bts, value[0])
                        }}
                        max={100}
                        value={[investments[bts.id]?.percentage || 0]} // Default to 0 if not set
                        className="w-[250px]"
                      />
                      <p>{investments[bts.id]?.percentage} %</p>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col justify-center justify-self-center items-center pt-4">
        <div>
          <Button
            size="lg"
            className="w-[250px]"
            disabled={loading}
            onClick={handleInvest}
          >
            Invest
          </Button>
        </div>
        <div className="my-6">
          <Button
            size="lg"
            className="w-[250px]"
            disabled={loading}
            onClick={handleInvest}
          >
            Cross-Chain Invest
          </Button>
        </div>
      </div>
    </div>
  )
}

export default StrategyPage
