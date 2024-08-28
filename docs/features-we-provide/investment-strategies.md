## Investment Categories

We have categorized different Runes and BRC20s based on multiple factors such as TVL (Total Value Locked), all-time performance, amount, 24-hour volume, 24-hour price change, total supply, and others, we have designed a robust categorization logic that considers multiple factors of all the tokens.

Below is our approach to group BRC20s and Runes into categories for different types of investors like Conservative, Moderate, and Degen (Aggressive) Investors.

This approach ensures a balanced and data-driven way to group BitcoinL2 tokens according to investor specific profiles.

### Categorization Logic

1. **Conservative Investors**: 
   - **TVL**: High (Preferably in the top 30% of all BTSs).
   - **All-Time Performance**: Stable, with moderate returns (10% - 50%).
   - **24-Hour Volume**: High volume indicating stability.
   - **24-Hour Price Change**: Low volatility (< 5% change).
   - **Amount**: High amount in circulation.
   - **Total Supply**: Large total supply, indicating wide adoption.

2. **Moderate Investors**: 
   - **TVL**: Medium (Middle 40%).
   - **All-Time Performance**: Moderate returns (50% - 150%).
   - **24-Hour Volume**: Medium volume.
   - **24-Hour Price Change**: Moderate volatility (5% - 20% change).
   - **Amount**: Moderate amount in circulation.
   - **Total Supply**: Medium total supply.

3. **Degen (Aggressive) Investors**: 
   - **TVL**: Low (Bottom 30%).
   - **All-Time Performance**: High returns (> 150%) or very low returns (High risk, high reward).
   - **24-Hour Volume**: Low volume (indicating high risk).
   - **24-Hour Price Change**: High volatility (> 20% change).
   - **Amount**: Low amount in circulation (low liquidity).
   - **Total Supply**: Low total supply (speculative investments).

### Formula for Scoring

To automate this, we have calculated a score for each BitcoinL2 based on the following weighted formula:

```
Score = (0.3 * Normalized_TVL) + 
        (0.2 * Normalized_AllTimePerformance) + 
        (0.2 * Normalized_24HourVolume) - 
        (0.1 * Normalized_24HourPriceChange) + 
        (0.1 * Normalized_Amount) + 
        (0.1 * Normalized_TotalSupply)
```

Where each factor is normalized between 0 and 1:

- **Normalized_TVL**: TVL of the BitcoinL2 / Max TVL among all BTSs.
- **Normalized_AllTimePerformance**: All-time performance of the BitcoinL2 / Max all-time performance.
- **Normalized_24HourVolume**: 24-hour volume of the BitcoinL2 / Max 24-hour volume.
- **Normalized_24HourPriceChange**: Inverted to penalize high volatility: `(1 - (abs(24-hour price change) / Max 24-hour price change))`.
- **Normalized_Amount**: Amount in circulation / Max amount in circulation.
- **Normalized_TotalSupply**: Total supply / Max total supply.


### Explanation:

- **Scoring & Normalization**: Each parameter is normalized to a 0-1 scale to account for different magnitudes. Higher scores lean towards more conservative investments.
- **Category Assignment**: Based on the computed score, BTSs are grouped into one of three categories: Conservative, Moderate, or Degen.