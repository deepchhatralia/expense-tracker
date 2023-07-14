// require('dotenv').config();

const mongodb = require('mongoose');

const DATABASE_URL = process.env.DATABASE_URL;

mongodb.connect(DATABASE_URL)
    .then(() => console.log("Database connected..."))
    .catch(err => console.log(err))