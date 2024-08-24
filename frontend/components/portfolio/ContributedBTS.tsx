"use client"

import React from "react"
import Image from "next/image"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const ContributedBTS = ({ btscontributed }: { btscontributed: any[] }) => {
  return (
    <div className="mt-12 flex flex-col">
      <div className="mb-12 ml-12">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Contributed BTS Details
        </h1>

        <p className="max-w-[700px] text-lg text-muted-foreground">
          List of BTS that you have contributed
        </p>
      </div>

      {btscontributed.length > 0 ? (
        <Table>
          <TableCaption>A list of your recent contributions.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Logo</TableHead>
              <TableHead>BTS Details</TableHead>
              <TableHead>Symbol</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Last24h Change</TableHead>
              <TableHead className="text-right">Amounts Contributed</TableHead>
              <TableHead className="text-right">%</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {btscontributed &&
              btscontributed.map((bts) => (
                <TableRow key={bts._id}>
                  <TableCell className="font-medium">
                    <Image
                      src={bts.btsDetails.uri}
                      alt={bts.btsDetails.name}
                      width={40}
                      height={40}
                      className="rounded-lg"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <p className="text-lg font-medium leading-none">
                        {bts.btsDetails.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {bts.btsDetails.description?.slice(0, 25)}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p>{bts.btsDetails.symbol}</p>
                  </TableCell>
                  <TableCell>
                    <p>
                      ${bts.btsDetails["1lpBalanceNumeric"].toLocaleString()}
                    </p>
                  </TableCell>
                  <TableCell>
                    <p>
                      {bts.btsDetails["24hourPriceChange"].toLocaleString()}%
                    </p>
                  </TableCell>
                  <TableCell className="text-right">
                    <p>${bts.totalBalance.toLocaleString()}</p>
                  </TableCell>
                  <TableCell className="text-right">
                    <p>{bts.percentageOfLpBalance.toLocaleString()}%</p>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <p className="max-w-[700px] text-lg text-muted-foreground">
            You have not contributed to any BTS
          </p>
        </div>
      )}
    </div>
  )
}

export default ContributedBTS
