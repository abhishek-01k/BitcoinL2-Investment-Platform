# Weighting Factors in BTCL2 Investments Algorithm

## Overview

In the BTCL2 Investments algorithm, weighting factors are used to assign different levels of importance to each metric that contributes to the final investment score. This approach ensures that more critical factors have a greater influence on the categorization of investments, aligning the final score with the intended investor profiles.

## Importance of Weighting Factors

Different metrics, such as TVL, all-time performance, and 24-hour volume, contribute to the overall risk and return profile of a BitcoinL2 token. However, not all metrics are equally important. For example, TVL might be more indicative of an asset's stability, while 24-hour price change might be more relevant for assessing short-term volatility.

To reflect these nuances, our algorithm assigns specific weights to each metric, influencing how much each factor contributes to the final score.

## Weighting Formula

The score for each BitcoinL2 token is calculated using the following weighted formula:

```
Score = (0.3 * Normalized_TVL) +
        (0.2 * Normalized_AllTimePerformance) +
        (0.2 * Normalized_24HourVolume) -
        (0.1 * Normalized_24HourPriceChange) +
        (0.1 * Normalized_Amount) +
        (0.1 * Normalized_TotalSupply)
```

### Explanation of Weights:
- **TVL (0.3):** Given the highest weight because it reflects the overall stability and trust in the token.
- **All-Time Performance (0.2):** Moderately weighted to balance long-term returns with other factors.
- **24-Hour Volume (0.2):** Indicates liquidity and market interest, crucial for assessing short-term viability.
- **24-Hour Price Change (-0.1):** Inversely weighted to penalize high volatility, reflecting risk.
- **Amount in Circulation (0.1) & Total Supply (0.1):** Given equal, smaller weights as they represent liquidity and adoption but are less volatile.

## Application in Categorization

The weighted score determines the categorization of a BitcoinL2 token into Conservative, Moderate, or Degen (Aggressive) investor categories. By adjusting the weights, the algorithm can emphasize or de-emphasize certain factors, making the categorization more aligned with specific investor profiles.

### Example Use Case:
For a Conservative Investor, a high weight on TVL and low weight on price change ensure the selection of stable investments with low volatility. Conversely, for Degen Investors, higher weights on all-time performance might emphasize potential high returns despite higher risks.

## Conclusion

Weighting factors play a crucial role in our algorithm, allowing us to tailor the investment categorization to different risk profiles. By carefully selecting and applying these weights, we can ensure that the final score reflects the most relevant metrics for each type of investor.
