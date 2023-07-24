require('dotenv').config();
require('./connection/connect')

const express = require('express');
const app = express();
const cors = require('cors');

const routes = require('./routes/route');

const PORT = process.env.PORT;

const API_KEY = process.env.API_KEY;

// function validateApiKey(req, res, next) {
//     console.log(req.headers.api);
//     // next();
//     if (req.headers.api != API_KEY) {
//         res.status(401).json({ success: 0, msg: "Request denied" });
//     }
//     next();
// }

// app.use(validateApiKey);

app.use(cors());
app.use(express.json());
app.use('/api/v1', routes);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));