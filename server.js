//DEPENDENCIES----------------------------------------------------------------------------------------------------------------------
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const PORT = process.env.PORT;
const URI = process.env.MONGO_URI;



//MIDDLEWARE----------------------------------------------------------------------------------------------------------------------





//ROUTES----------------------------------------------------------------------------------------------------------------------
app.get('/', (req, res) => {
    res.send('Testing testing...')
})




//PORT----------------------------------------------------------------------------------------------------------------------
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})