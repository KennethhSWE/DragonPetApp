// Server Side stores users tokens and refresh codes. Also handles the token exchange

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

//createe an insrance of MongoDB
const mongoose =require('mongoose');

// Middleware setup to parse incoming requests
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection setup
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
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

// Define a route for the home page
app.get('/', (req, res) => {
    res.send('Welcome to the DragonPet Server!');
});

// Define a route for handling Strava OAuth callback
app.get('/strava/callback', async (req, res) => {
    const authCode = req.query.code;

    if (!authCode) {
        return res.status(400).send('Authorization code is missing');
    }

    try {
        // Exchange authorization code for an access token
        const response = await axios.post('https://www.strava.com/api/v3/oauth/token', {
            client_id: process.env.STRAVA_CLIENT_ID,
            client_secret: process.env.STRAVA_CLIENT_SECRET,
            code: authCode,
            grant_type: 'authorization_code',
        });

        const { access_token, refresh_token, expires_at, athlete } = response.data;

        // Store tokens in the database
        await Token.findOneAndUpdate(
            { userId: athlete.id },
            { accessToken: access_token, refreshToken: refresh_token, expiresAt: expires_at },
            { upsert: true }
        );

        // Redirect back to the app with a success message
        const redirectUrl = `dragonpetapp://auth/callback?success=true`;
        res.redirect(redirectUrl);
    } catch (error) {
        console.error('Error exchanging authorization code for access token:', error.response?.data || error.message);
        res.status(500).send('Failed to exchange authorization code for access token');
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
