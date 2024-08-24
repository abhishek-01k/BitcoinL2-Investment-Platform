"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { useActiveAccount } from "thirdweb/react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ContributedBTS from "@/components/portfolio/ContributedBTS"
import UsersBTS from "@/components/portfolio/usersBTS"

const PortfolioPage = () => {
  const activeAccount = useActiveAccount()

  

  return (
    <>
      <Tabs defaultValue="contributions" className="my-12">
        <TabsList className="ml-12">
          <TabsTrigger value="contributions">Contributed</TabsTrigger>
          <TabsTrigger value="myBTS">My-Investments</TabsTrigger>
        </TabsList>
      </Tabs>
    </>
  )
}

export default PortfolioPage
