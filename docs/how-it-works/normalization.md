# Normalization Techniques in BTCL2 Investments Algorithm

## Overview

Normalization is a data preprocessing technique used to scale different features within a dataset to a common range, typically between 0 and 1. This process is crucial when working with metrics that have different units or magnitudes, ensuring that each factor contributes proportionately to the final score.

## Why Normalization?

In our algorithm, we assess multiple factors such as TVL, all-time performance, and 24-hour volume. These metrics can vary significantly in scale. For instance, TVL might be in millions, while 24-hour price changes could be in percentage points. Without normalization, larger numerical values would disproportionately influence the scoring, skewing the results.

## Normalization Formula

Each factor in the BTCL2 scoring algorithm is normalized using the following formula:

```
Normalized_Value = (Actual_Value) / (Maximum_Value)
```

This scales the values between 0 and 1, where 1 represents the maximum observed value for that metric across all BitcoinL2 tokens.

## Application in the Algorithm

In the BTCL2 Investments algorithm, normalization allows us to:
- **Ensure Fair Comparison:** By bringing all metrics to the same scale, we can fairly compare factors like TVL and price volatility.
- **Balance the Influence:** It prevents any single factor from dominating the score due to its natural scale, making the categorization of investments more balanced and data-driven.
- **Improve Predictive Accuracy:** Normalized data helps in generating more accurate predictions and categorizations, aligning the results with the intended risk profiles (Conservative, Moderate, Degen).

## Use Case: Predicting Investment Categories

The normalized scores are combined with weighted factors to predict the investment category of a BitcoinL2 token. For example, a token with a high normalized TVL and low normalized price volatility will likely fall into the "Conservative Investor" category. The normalization ensures that each factor is appropriately considered, leading to reliable and consistent categorization.

## Conclusion

Normalization is a foundational step in our investment strategy algorithm, providing a robust framework for evaluating and categorizing BitcoinL2 tokens. It ensures that our predictions are data-driven and aligned with the risk profiles of different types of investors.
