import { title } from "process"

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Bitcoin L2 Investments",
  description: "Investment Strategies for the Future powered by AI",
  mainNav: [
    {
      title : "Explore",
      href: "/getstarted",
    },
    {
      title: "Portfolio",
      href: "/portfolio",
    },
    {
      title: "Create an AI Investment Bot",
      href: "/createaibot",
    }
  ],
  links: {
    twitter: "https://x.com/",
  },
}
