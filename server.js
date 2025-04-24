// Load required modules
const express = require('express');
const axios = require('axios');

const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files (optional for Bootstrap CSS/JS)
app.use(express.static('public'));

// Default route: just show the button
app.get('/', (req, res) => {
    res.render('index', { countries: null });
});

// Route to fetch countries from the API
app.get('/countries', async (req, res) => {
    try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countries = response.data;
        res.render('index', { countries });
    } catch (error) {
        console.error('Error fetching countries:', error);
        res.render('index', { countries: [] });
    }
});

// Start the server
app.listen(8080, () => {
    console.log('App is running on http://localhost:8080');
});
