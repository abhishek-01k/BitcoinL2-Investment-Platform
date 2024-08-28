# Bot Commands and Actions

The Telegram bot supports various commands that allow users to interact with their BitcoinL2 investments and the blockchain directly from the Telegram app.

<figure><img src="../.gitbook/assets/Screenshot 2024-08-24 090553.png" alt=""><figcaption><p>Bot Commands and Actions</p></figcaption></figure>

## `/start`

**Description**: Initiates interaction with the bot and presents the user with a set of available actions.

* **Actions**:
  * Import Wallet
  * Show Wallet
  * Check Contributed BitcoinL2
  * Get User BitcoinL2 Data
  * View Trending Tokens
  * View Losing Tokens

## `/contributetobts <bts_address> <amount>`

**Description**: Contributes a specified amount of tokens to a given BitcoinL2.

* **Actions**:
  * Validates the user's wallet.
  * Sends the contribution to the BitcoinL2 smart contract.
  * Confirms transaction success or reports an error.

## `/withdraw <bts_address> <amount>`

**Description**: Withdraws a specified amount of WETH from a BitcoinL2.

* **Actions**:
  * Approves the withdrawal transaction.
  * Executes the withdrawal from the BitcoinL2 smart contract.
  * Provides transaction details or reports errors.

## Interactive Actions

### `import-wallet`

**Description**: Initiates the wallet import process.

* **Actions**:
  * Prompts the user to enter their private key or mnemonic phrase.
  * Imports the wallet and stores it securely in the session.

### `show-wallet`

**Description**: Displays the user's wallet address.

* **Actions**:
  * Retrieves the wallet address from the session.
  * Displays the address to the user.

### `check-contributed-bts`

**Description**: Shows the BitcoinL2 that the user has contributed to.

* **Actions**:
  * Fetches data from the backend.
  * Displays a summary of the contributed BitcoinL2.

### `get-user-bts-data`

**Description**: Retrieves and displays detailed data on the user's BitcoinL2.

* **Actions**:
  * Fetches and formats BitcoinL2 data.
  * Provides detailed performance and financial metrics.
