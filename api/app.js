require('dotenv').config();
require('./connection/connect')

const express = require('express');
const app = express();
const cors = require('cors');

const routes = require('./routes/route');

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use('/api/v1', routes);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));