// Backend Task
// 1. Initialize the Database with Seed Data
// API Endpoint: /api/initialize
// Method: GET
// Functionality: Fetch JSON data from the provided URL and initialize the database.
// Steps:

// Fetch data from https://s3.amazonaws.com/roxiler.com/product_transaction.json.
// Parse the JSON response.
// Save the data to your database (MongoDB).

const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const Transaction = require('./models/Transaction'); // Assuming a Transaction model is created

const app = express();

mongoose.connect('mongodb://localhost:27017/transactions', { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/api/initialize', async (req, res) => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const transactions = response.data;

        await Transaction.insertMany(transactions);
        res.status(200).send('Database initialized with seed data');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});