//DEPENDENCIES----------------------------------------------------------------------------------------------------------------------
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const PORT = process.env.PORT;
const URI = process.env.MONGO_URI;

// Using Google servers to help resolve MongoDB Atlas DNS error
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);



//MIDDLEWARE----------------------------------------------------------------------------------------------------------------------




//Mongo Connection
async function mongoConnection() {
    try {
        await mongoose.connect(URI);
        app.listen(PORT, () => {
            console.log('----------CONNECTED TO MONGO----------');
            console.log(`Server running on http://localhost:${PORT}`);
        })

    } catch (error) {
        console.error(error);

    }
}


mongoConnection();



//ROUTES----------------------------------------------------------------------------------------------------------------------
app.get('/', (req, res) => {
    res.send('Testing testing...')
})




