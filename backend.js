// app.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Object to store connections between codes and devices
const connections = {};

// Generate a random 10-digit code
function generateCode() {
    return Math.floor(1000000000 + Math.random() * 9000000000);
}

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Endpoint to establish connection and generate code
app.get('/connect', (req, res) => {
    const code = generateCode();
    connections[code] = {}; // Store connection data
    res.json({ code });
});

// Endpoint to verify code and establish connection
app.get('/connect/:code', (req, res) => {
    const { code } = req.params;
    if (connections[code]) {
        res.json({ success: true });
    } else {
        res.status(404).json({ error: 'Invalid code' });
    }
});

// Endpoint to receive signals from mobile device
app.post('/signal/:direction', (req, res) => {
    const { direction } = req.params;
    // Process signal (simulate pressing and holding 'A' or 'D' keys)
    // You'll need to implement this part according to your specific setup
    console.log(`Received signal from mobile device: ${direction}`);
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
