// Import required packages
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const axios = require('axios');
const mongoose = require('mongoose');

// Load environment variables from .env file
dotenv.config();

// Create an instance of Express server
const app = express();

// Middleware setup to parse incoming requests
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection setup
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// Define a schema and model for storing tokens
const tokenSchema = new mongoose.Schema({
    userId: String,
    accessToken: String,
    refreshToken: String,
    expiresAt: Number,
});

const Token = mongoose.model('Token', tokenSchema);

// Define a route for handling root requests
app.get('/', async (req, res) => {
    // Check if the request contains a Strava authorization code
    if (req.query.code) {
        const authCode = req.query.code;
        console.log("Received authorization code:", authCode);

        try {
            // Exchange authorization code for an access token
            const response = await axios.post('https://www.strava.com/oauth/token', {
                client_id: process.env.STRAVA_CLIENT_ID,
                client_secret: process.env.STRAVA_CLIENT_SECRET,
                code: authCode,
                grant_type: 'authorization_code',
            });

            const { access_token, refresh_token, expires_at, athlete } = response.data;
            console.log('Strava Response Data:', response.data);

            // Store tokens in the database
            await Token.findOneAndUpdate(
                { userId: athlete.id },
                { accessToken: access_token, refreshToken: refresh_token, expiresAt: expires_at },
                { upsert: true }
            );

            // Redirect back to the app with a success message using deep link
            const redirectUrl = `dragonpetapp://auth/callback?success=true&code=${authCode}`;
            console.log(`Redirecting to: ${redirectUrl}`);
            res.redirect(redirectUrl);

        } catch (error) {
            console.error('Error exchanging authorization code for access token:', error.response?.data || error.message);
            console.log("Full error object:", error); // Log the full error object for more context
            res.status(500).send('Failed to exchange authorization code for access token');
        }
    } else {
        // Handle normal requests to your domain
        res.send('Welcome to the DragonPet Server!');
    }
});

// Define a route to get user data
app.get('/user-data', async (req, res) => {
    try {
        const token = await Token.findOne({ userId: req.query.userId });
        if (!token) {
            console.error('User not found for ID:', req.query.userId);  // Log when user data is not found
            return res.status(404).send({ error: 'User not found' });
        }

        // Log the retrieved token details
        console.log('Retrieved token for user:', req.query.userId);

        // Send user data (replace with actual data retrieval logic)
        res.send({
            miles_walked: 100, // Replace with actual data
            miles_ran: 50,     // Replace with actual data
        });

    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Failed to fetch user data' });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
