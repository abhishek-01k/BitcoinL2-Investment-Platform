"use client";
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Unlock the Power of Investing with BEVm
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Seamlessly invest across multiple blockchains with our advanced investment management platform.
                  </p>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Link
                      href="/getstarted"
                      className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                      prefetch={false}
                    >
                      Get Started
                    </Link>
                    <Link
                      href="/dashboard"
                      className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                      prefetch={false}
                      // target="_blank"
                    >
                      Dashboard
                    </Link>
                  </div>
                </div>
              </div>
              <Card>
                <CardContent className="grid gap-6">
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Seamless Cross-Chain Investments</h3>
                    <p className="text-muted-foreground">
                      Easily invest in a wide range of cryptocurrencies and tokens across multiple blockchains, all from
                      a single platform.
                    </p>
                  </div>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Automated Portfolio Management</h3>
                    <p className="text-muted-foreground">
                      Let our AI-powered strategies handle the heavy lifting of portfolio rebalancing and optimization,
                      freeing you up to focus on other aspects of your investment journey.
                    </p>
                  </div>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Advanced Analytics and Reporting</h3>
                    <p className="text-muted-foreground">
                      Gain deep insights into your investment performance with our comprehensive analytics and reporting
                      tools, accessible through our Telegram bot.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Revolutionize Your Investment Strategy
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform offers a suite of advanced features to help you maximize your investment returns across
                  multiple blockchains.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <img
                src="/btsgroup.png"
                width="550"
                height="310"
                alt="Features"
                className="mx-auto  overflow-hidden rounded-xl object-contain object-center sm:w-full lg:order-last"
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Seamless Cross-Chain Investments</h3>
                  <p className="text-muted-foreground">
                    Easily invest in a wide range of cryptocurrencies and tokens across multiple blockchains, all from a
                    single platform.
                  </p>
                </div>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Automated Portfolio Management</h3>
                  <p className="text-muted-foreground">
                    Let our AI-powered strategies handle the heavy lifting of portfolio rebalancing and optimization,
                    freeing you up to focus on other aspects of your investment journey.
                  </p>
                </div>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Advanced Analytics and Reporting</h3>
                  <p className="text-muted-foreground">
                    Gain deep insights into your investment performance with our comprehensive analytics and reporting
                    tools, accessible through our Telegram bot.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Personalized Strategies</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Tailor Your Investment Journey</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our customizable AI bot can help you create personalized investment strategies based on your risk
                  tolerance, financial goals, and market conditions.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <img
                src="/aibot.png"
                width="550"
                height="310"
                alt="Personalized Strategies"
                className="mx-auto overflow-hidden rounded-xl object-contain object-center sm:w-full lg:order-last"
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Customizable AI Bot</h3>
                  <p className="text-muted-foreground">
                    Leverage our advanced AI bot to create personalized investment strategies tailored to your unique
                    financial goals and risk profile.
                  </p>
                </div>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Telegram Integration</h3>
                  <p className="text-muted-foreground">
                    Receive real-time updates, analytics, and portfolio management tools directly through our Telegram
                    bot integration.
                  </p>
                </div>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Flexible Strategies</h3>
                  <p className="text-muted-foreground">
                    Easily adjust your investment strategies as your financial goals or market conditions change,
                    ensuring your portfolio remains optimized.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Testimonials</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Clients Say</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hear from our satisfied clients about how our platform has transformed their investment strategies.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-lg font-bold">John Doe</h4>
                      <p className="text-sm text-muted-foreground">Crypto Investor</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "BitcoinL2 Investment has been a game-changer for my crypto\n portfolio. The seamless cross-chain
                    capabilities and\n AI-powered strategies have helped me maximize my returns\n while minimizing
                    risk."
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>SA</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-lg font-bold">Sarah Anderson</h4>
                      <p className="text-sm text-muted-foreground">Financial Analyst</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "The advanced analytics and reporting tools provided by BitcoinL2\n Investment have been invaluable in
                    helping me make\n data-driven decisions and optimize my portfolio. Highly\n recommended!"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-muted p-6 md:py-12 w-full">
        <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-8 text-sm">
          <div className="grid gap-1">
            <h3 className="font-semibold">Company</h3>
            <Link href="#" prefetch={false}>
              About Us
            </Link>
            <Link href="#" prefetch={false}>
              Our Team
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Platform</h3>
            <Link href="#" prefetch={false}>
              Pricing
            </Link>
            <Link href="#" prefetch={false}>
              Integrations
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Connect</h3>
            <Link href="https://x.com/0xkamal7" prefetch={false}>
              Twitter
            </Link>
            <Link href="#" prefetch={false}>
              Discord
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

function BitcoinIcon(props : any) {
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