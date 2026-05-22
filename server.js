//DEPENDENCIES----------------------------------------------------------------------------------------------------------------------
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//User Model
const User = require('./models/User.js');

require('dotenv').config();
const PORT = process.env.PORT;
const URI = process.env.MONGO_URI;

// Using Google servers to help resolve MongoDB Atlas DNS error
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);



//MIDDLEWARE----------------------------------------------------------------------------------------------------------------------
//json parser middleware
app.use(express.json());


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

app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const savedUsername = await User.findOne({ username });

        if (!savedUsername) {
            // hashing and salting
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = new User({ username, password: hashedPassword });
            await newUser.save();
            return res.status(201).json({ message: 'User registered successfully' });
        } else {
            return res.status(400).json({ message: 'Username already exists' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
})

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const foundUser = await User.findOne({ username });
        

        if (!foundUser) {
            return res.status(400).json({ message: 'Username and/or password is incorrect.' });
        } 

        const isMatch = await bcrypt.compare(password, foundUser.password);

        if(isMatch){
            //generate jwt
        } else {
            return res.status(400).json({ message: 'Username and/or password is incorrect.' });
        }

    } catch (error) {
        //clg error
    }
})




