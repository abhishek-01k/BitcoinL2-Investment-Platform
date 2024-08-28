# Telegram Bot APIs and Integration

The CrossChain-BitcoinL2-Investment bot leverages several APIs and services to provide a rich user experience. Here’s a breakdown of the key integrations:

## Telegram API
- **Purpose**: Handles user interactions, command processing, and messaging.
- **Library Used**: Telegraf, a framework for building Telegram bots.
- **Endpoints**:
  - `/sendMessage`: Sends text messages to users.
  - `/sendPhoto`: Sends images to users.
  - `/answerCallbackQuery`: Handles inline keyboard interactions.

## Blockchain Interaction (Ethers.js)
- **Purpose**: Facilitates secure interactions with the Ethereum blockchain.
- **Library Used**: `ethers.js`, a JavaScript library for Ethereum.
- **Usage**:
  - **JsonRpcProvider**: Connects to the Ethereum network.
  - **Contract Class**: Interacts with BitcoinL2 smart contracts, enabling functions like `contribute` and `withdraw`.
  - **Transaction Management**: Sends and monitors blockchain transactions.

## Backend Services (Express and Axios)
- **Express Server**: Hosts the bot's webhook and handles incoming requests.
- **Axios**: Used for HTTP requests, such as setting webhooks and fetching external data.
- **Endpoints**:
  - `/webhook`: Processes incoming messages from Telegram.
  - `/setWebhook`: Configures the bot’s webhook URL.

## Security Considerations
- **Encryption**: Wallet keys and sensitive data are encrypted using `crypto-js` and the bot’s token.
- **Secure Sessions**: User sessions are managed securely within the bot’s context to prevent unauthorized access.
