import { FaArrowTrendUp } from "react-icons/fa6"
import { IoIosCopy } from "react-icons/io"
import { MdSentimentVerySatisfied } from "react-icons/md"

export const Strategies = [
  {
    value: "sentiment_analysis",
    label: "Sentiment analysis",
    icon: MdSentimentVerySatisfied,
  },
  {
    value: "trend_following",
    label: "Trend following",
    icon: FaArrowTrendUp,
  },
  {
    value: "copy_trading",
    label: "Copy trading",
    icon: IoIosCopy,
  },
]
