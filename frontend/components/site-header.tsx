"use client"

import Link from "next/link"
import {  sepolia } from "thirdweb/chains"
import { ConnectButton } from "thirdweb/react"
import { createWallet, inAppWallet } from "thirdweb/wallets"

import { siteConfig } from "@/config/site"
import { client } from "@/config/wallet"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  const wallets = [
    inAppWallet(),
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    createWallet("me.rainbow"),
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            
            <ConnectButton
              client={client}
              wallets={wallets}
              chains={[ sepolia]}
            />

            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
