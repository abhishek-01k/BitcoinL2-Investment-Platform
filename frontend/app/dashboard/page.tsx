"use client";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, CartesianGrid, XAxis, Line } from "recharts"
import { Separator } from "@/components/ui/separator"

export default function Dashboard() {

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="sm:hidden">
              <MenuIcon className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                prefetch={false}
              >
                <BitcoinIcon className="h-5 w-5 transition-all group-hover:scale-110" />
                <span className="sr-only">CrossChain BitcoinL2 Investment Platform</span>
              </Link>
              <Link href="#" className="flex items-center gap-4 px-2.5 text-foreground" prefetch={false}>
                <WalletIcon className="h-5 w-5" />
                Deposit
              </Link>
              <Link href="#" className="flex items-center gap-4 px-2.5 text-foreground" prefetch={false}>
                <GitGraphIcon className="h-5 w-5" />
                Profit & Loss
              </Link>
              <Link href="#" className="flex items-center gap-4 px-2.5 text-foreground" prefetch={false}>
                <ShoppingBasketIcon className="h-5 w-5" />
                Investments
              </Link>
              <Link href="#" className="flex items-center gap-4 px-2.5 text-foreground" prefetch={false}>
                <NetworkIcon className="h-5 w-5" />
                Cross-Chain
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="#" prefetch={false}>
                  Dashboard
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="relative ml-auto flex-1 md:grow-0">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
              <img
                src="/placeholder.svg"
                width={36}
                height={36}
                alt="Avatar"
                className="overflow-hidden rounded-full"
                style={{ aspectRatio: "36/36", objectFit: "cover" }}
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <Card className="sm:col-span-2">
            <CardHeader>
              <CardTitle>Deposit</CardTitle>
              <CardDescription>
                Securely deposit your funds into the platform, supporting multiple Bitcoin L2 networks.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="flex items-center justify-center gap-2 rounded-lg p-4">
                    <BitcoinIcon className="h-6 w-6" />
                    <span>Bitcoin</span>
                  </Button>
                  <Button variant="outline" className="flex items-center justify-center gap-2 rounded-lg p-4">
                    <EclipseIcon className="h-6 w-6" />
                    <span>Zulu Network</span>
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="flex items-center justify-center gap-2 rounded-lg p-4">
                    <OctagonIcon className="h-6 w-6" />
                    <span>BEVM</span>
                  </Button>
                  <Button variant="outline" className="flex items-center justify-center gap-2 rounded-lg p-4">
                    <SmileIcon className="h-6 w-6" />
                    <span>Merlin</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Profit & Loss</CardTitle>
              <CardDescription>View your profit and loss over time from your investments.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  profit: { label: "Profit", color: "hsl(var(--chart-1))" },
                  loss: { label: "Loss", color: "hsl(var(--chart-2))" },
                }}
                className="min-h-[300px]"
              >
                <LineChart
                  accessibilityLayer
                  data={[
                    { month: "Jan", profit: 1200, loss: 500 },
                    { month: "Feb", profit: 1500, loss: 300 },
                    { month: "Mar", profit: 1800, loss: 200 },
                    { month: "Apr", profit: 2000, loss: 100 },
                    { month: "May", profit: 2300, loss: 50 },
                    { month: "Jun", profit: 2500, loss: 0 },
                  ]}
                  margin={{ top: 20, left: 32, right: 32 }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                  <Line
                    dataKey="profit"
                    type="natural"
                    stroke="var(--color-profit)"
                    strokeWidth={2}
                    dot={{ fill: "var(--color-profit)" }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    dataKey="loss"
                    type="natural"
                    stroke="var(--color-loss)"
                    strokeWidth={2}
                    dot={{ fill: "var(--color-loss)" }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Investments</CardTitle>
              <CardDescription>
                View and select 'baskets' of different Runes/BRC-20 tokens to invest in.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="flex flex-col items-center justify-center gap-2 rounded-lg p-4">
                    <ShoppingBasketIcon className="h-6 w-6" />
                    <span>Runes</span>
                    <span className="text-sm text-muted-foreground">Diversified portfolio</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center justify-center gap-2 rounded-lg p-4">
                    <ShoppingBasketIcon className="h-6 w-6" />
                    <span>BRC-20</span>
                    <span className="text-sm text-muted-foreground">Optimistic investors</span>
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="flex flex-col items-center justify-center gap-2 rounded-lg p-4">
                    <ShoppingBasketIcon className="h-6 w-6" />
                    <span>BEVM</span>
                    <span className="text-sm text-muted-foreground">Blockchain-enabled VM</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center justify-center gap-2 rounded-lg p-4">
                    <ShoppingBasketIcon className="h-6 w-6" />
                    <span>Algo Trading</span>
                    <span className="text-sm text-muted-foreground">Diversify your risk</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-start bg-muted/50">
              <div className="grid gap-0.5">
                <CardTitle className="group flex items-center gap-2 text-lg">
                  Cross-Chain Opportunities
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <NetworkIcon className="h-3 w-3" />
                    <span className="sr-only">View Cross-Chain Opportunities</span>
                  </Button>
                </CardTitle>
                <CardDescription>
                  Explore investment opportunities across multiple blockchain protocols.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-6 text-sm">
              <div className="grid gap-3">
                <div className="font-semibold">Optimistic Investors</div>
                <ul className="grid gap-3">
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Optimism L2 <span>+12.5%</span>
                    </span>
                    <span>$1,500</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Arbitrum L2 <span>+9.2%</span>
                    </span>
                    <span>$1,200</span>
                  </li>
                </ul>
                <Separator className="my-2" />
                <div className="font-semibold">BEVM Opportunities</div>
                <ul className="grid gap-3">
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      BEVM Tokens <span>+15.3%</span>
                    </span>
                    <span>$2,000</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      BEVM Derivatives <span>+11.7%</span>
                    </span>
                    <span>$1,800</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

function BitcoinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727" />
    </svg>
  )
}


function EclipseIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a7 7 0 1 0 10 10" />
    </svg>
  )
}


function GitGraphIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="5" cy="6" r="3" />
      <path d="M5 9v6" />
      <circle cx="5" cy="18" r="3" />
      <path d="M12 3v18" />
      <circle cx="19" cy="6" r="3" />
      <path d="M16 15.7A9 9 0 0 0 19 9" />
    </svg>
  )
}


function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function NetworkIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="16" y="16" width="6" height="6" rx="1" />
      <rect x="2" y="16" width="6" height="6" rx="1" />
      <rect x="9" y="2" width="6" height="6" rx="1" />
      <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" />
      <path d="M12 12V8" />
    </svg>
  )
}


function OctagonIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
    </svg>
  )
}


function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}


function ShoppingBasketIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 11-1 9" />
      <path d="m19 11-4-7" />
      <path d="M2 11h20" />
      <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4" />
      <path d="M4.5 15.5h15" />
      <path d="m5 11 4-7" />
      <path d="m9 11 1 9" />
    </svg>
  )
}


function SmileIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" x2="9.01" y1="9" y2="9" />
      <line x1="15" x2="15.01" y1="9" y2="9" />
    </svg>
  )
}


function WalletIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </svg>
  )
}