require('dotenv').config();

const jwt = require('jsonwebtoken');

const express = require("express");
const routes = express.Router();

const { UserModel } = require("../model");

routes.post('/validateUser', async (req, res) => {
    const inputEmail = req.body.email;
    const inputPassword = req.body.password;

    const val = await UserModel.find({ email: inputEmail });

    if (val.length && inputPassword == val[0].password) {
        // Generate a JWT token
        const payload = { userId: val[0]._id, username: inputEmail };
        const secretKey = process.env.JSON_WEB_TOKEN_SECRET_KEY;
        const options = { expiresIn: '1h' };
        const generatedToken = jwt.sign(payload, secretKey, options);

        res.json({ success: 1, token: generatedToken });
    } else {
        res.json({ success: 0, msg: "Invalid username or password" });
    }
});

routes.get('/checkToken', (req, res) => {

    const tokenFromClient = req.headers.token;

    try {
        const decodedToken = jwt.verify(tokenFromClient, process.env.JSON_WEB_TOKEN_SECRET_KEY);

        res.json({ success: 1, ...decodedToken });
    } catch (err) {
        res.json({ success: 0, msg: err.message });
    }

    // Access the user ID from the decoded token
    // const userId = decodedToken.userId;

    // console.log(tokenFromClient);


});

async function checkIfUserExist(val) {
    const data = await UserModel.find({ email: val });

    return data.length;
}


routes.post('/addUser', async (req, res) => {
    try {
        let exist = 0;

        if (await checkIfUserExist(req.body.email)) {
            exist = 1;
        } else {
            const data = await UserModel.create(req.body);
        }

        res.json({ success: 1, userExist: exist });
    } catch (err) {
        res.json({ success: 0, msg: err.message });
    }
});

module.exports = routes;