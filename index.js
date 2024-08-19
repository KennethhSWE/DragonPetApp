// index.js

// Import required packages
const express = require('express'); //this is my server
const cors = require('cors'); // allows frontend to request things from server
const bodyParser = require('body-parser'); // parses incoming requests
const dotenv = require('dotenv'); //This loads envirmental variables

// Load environment variables from .env file
dotenv.config();

// Create an instance of Express this is my Sever 
const app = express();

// Middleware setup parses incoming requests 
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies

// Define a route for the home page
app.get('/', (req, res) => {
    res.send('Welcome to the DragonPet Server!');
});

// Define a route for handling Strava OAuth callback
app.get('/strava/callback', (req, res) => {
    const authCode = req.query.code;
    // You would typically exchange this auth code for an access token
    res.send(`Authorization code received: ${authCode}`);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
