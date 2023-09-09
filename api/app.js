require('dotenv').config();
require('./connection/connect')

const express = require('express');
const app = express();
const cors = require('cors');

const user = require('./routes/user');
const category = require('./routes/category');
const expense = require('./routes/expense');


const PORT = process.env.PORT;

const API_KEY = process.env.API_KEY;



function validateApiKey(req, res, next) {
    // next();
    if (req.headers["api-key"] !== API_KEY) {
        res.status(401).json({ success: 0, msg: "Request denied" });
    } else {
        next();
    }
}

app.use(cors());

app.use('/api/v1', validateApiKey);

app.use(express.json());

app.use('/api/v1/user', user);
app.use('/api/v1/category', category);
app.use('/api/v1/expense', expense);


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));