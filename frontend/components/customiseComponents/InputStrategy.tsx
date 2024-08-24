import React from "react"
import { StrategyInput } from "@/types"

import { Checkbox } from "../ui/checkbox"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

const InputStrategy = ({
  strategyInput,
  setStrategyInput,
}: {
  strategyInput: StrategyInput
  setStrategyInput: any
}) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-row gap-12">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="stopLoss" className="text-lg">
            Stop Loss
          </Label>
          <Input
            id="stopLoss"
            type="text"
            value={strategyInput.stopLoss}
            onChange={(e) => {
              setStrategyInput((prevStrategyInput: StrategyInput) => ({
                ...prevStrategyInput,
                stopLoss: e.target.value,
              }))
            }}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="takeProfit" className="text-lg">
            Take Profit
          </Label>
          <Input
            id="takeProfit"
            type="text"
            value={strategyInput.takeProfit}
            onChange={(e) => {
              setStrategyInput((prevStrategyInput: StrategyInput) => ({
                ...prevStrategyInput,
                takeProfit: e.target.value,
              }))
            }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between  space-x-2">
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Continuous Monitoring ?
          </label>
          <Checkbox
            id="terms"
            checked={strategyInput.continousMonitoring}
            onClick={() => {
              console.log(
                "Changing monitoring",
                strategyInput.continousMonitoring
              )
              setStrategyInput((prevStrategyInput: StrategyInput) => ({
                ...prevStrategyInput,
                continousMonitoring: !prevStrategyInput.continousMonitoring,
              }))
            }}
          />
        </div>
        <div className="flex items-center justify-between space-x-2">
          <label
            htmlFor="suggestions"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Suggestions from the AI Bot
          </label>
          <Checkbox
            id="suggestions"
            checked={strategyInput.showSuggestions}
            onClick={() =>
              setStrategyInput((prevStrategyInput: StrategyInput) => ({
                ...prevStrategyInput,
                showSuggestions: !prevStrategyInput.showSuggestions,
              }))
            }
          />
        </div>
      </div>
    </div>
  )
}

export default InputStrategy
