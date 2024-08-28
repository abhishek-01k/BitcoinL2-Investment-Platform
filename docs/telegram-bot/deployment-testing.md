# Deployment and Testing of the Telegram Bot

To deploy and test the Telegram bot, follow these steps:

## Deployment
1. **Set Environment Variables**:
   - Create a `.env` file in the project root.
   - Add the necessary variables such as `TELEGRAM_BOT_TOKEN`, `ETH_RPC_SEPOLIA`, etc.

2. **Deploy to a Cloud Platform**:
   - Choose a cloud service like Heroku, Vercel, or any platform that supports Node.js.
   - Deploy the bot along with the Express server.

3. **Set Webhook**:
   - Configure the bot’s webhook using the `/setWebhook` endpoint.
   - Example:
     ```bash
     axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`);
     ```

## Testing
1. **Local Testing**:
   - Run the bot locally with:
     ```bash
     npm start
     ```
   - Interact with the bot via Telegram to test commands and workflows.

2. **Webhook Testing**:
   - Ensure the webhook is correctly set and responding to Telegram messages.
   - Use tools like ngrok to expose your local server to the internet for testing.

3. **Blockchain Interaction Testing**:
   - Test transactions on a testnet (e.g., Sepolia).
   - Verify that contributions and withdrawals are processed correctly and securely.
