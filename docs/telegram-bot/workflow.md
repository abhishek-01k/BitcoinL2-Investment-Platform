# Telegram Bot Workflow

The workflow of the Telegram bot is designed to provide a seamless user experience, enabling interaction with the blockchain without leaving the Telegram app.

## Wallet Management
1. **Importing a Wallet**:
   - User initiates the import process via `/start` or `import-wallet`.
   - The bot prompts for a private key or mnemonic phrase.
   - Upon successful import, the wallet is stored securely in the session.

2. **Viewing Wallet Information**:
   - Users can view their wallet address using the `show-wallet` action.
   - The bot retrieves and displays the wallet address stored in the session.

## BitcoinL2 Contributions and Withdrawals
1. **Contributing to BitcoinL2**:
   - User triggers the `/contributetobts` command.
   - The bot validates the input and wallet, then processes the transaction.
   - If successful, the bot confirms the contribution with a transaction hash.

2. **Withdrawing from BitcoinL2**:
   - User initiates the `/withdraw` command.
   - The bot handles the approval and withdrawal processes.
   - The transaction result is provided to the user.

## Real-Time Token Data
1. **Trending Tokens**:
   - The user selects `trending-tokens` to view the top-performing tokens.
   - The bot fetches and displays data from the backend.

2. **Losing Tokens**:
   - The `loosing-tokens` action shows tokens that have lost value.
   - The bot retrieves and formats this data for the user.

## Advanced User Interactions
1. **Checking Contributed BitcoinL2**:
   - The bot can display detailed information about the BitcoinL2 the user has contributed to.
   - This includes performance data, token value, and links to detailed views.

2. **Retrieving User BitcoinL2 Data**:
   - Users can access comprehensive data about their investments.
   - The bot provides formatted reports, helping users make informed decisions.
