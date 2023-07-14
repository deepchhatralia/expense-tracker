require('dotenv').config();
const express = require('express');
const routes = express.Router();

const { UserModel, CategoryModel, ExpenseModel } = require('../model/index');

async function checkIfUserExist(val) {
    const data = await UserModel.find({ email: val });

    return data.length;
}

routes.post('/addUser', async (req, res) => {
    let doesExist = 0;

    if (await checkIfUserExist(req.body.email)) {
        doesExist = 1;
    }

    res.json({ exist: doesExist });
})



module.exports = routes;