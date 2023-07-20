require('dotenv').config();

const jwt = require('jsonwebtoken');
const express = require('express');
const routes = express.Router();

const { UserModel, CategoryModel, ExpenseModel } = require('../model/index');


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

async function checkIfCategoryExist(val) {
    const data = await CategoryModel.find({ categoryName: val })

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


routes.post('/addCategory', async (req, res) => {
    try {
        let exist = 0;

        if (await checkIfCategoryExist(req.body.categoryName)) {
            exist = 1;
        }

        res.json({ success: 1, categoryExist: exist })
    } catch (err) {
        res.json({ success: 0, msg: err.message });
    }
});

routes.get('/getCategory', async (req, res) => {
    try {
        const data = await CategoryModel.find({ _id: req.body.id })

        res.json({ success: 1, ...data });
    } catch (err) {
        res.json({ success: 0, msg: err.message });
    }
});

routes.get('/getCategories', async (req, res) => {
    try {
        const data = await CategoryModel.find();

        res.json(data);
    } catch (err) {
        res.json({ success: 0, msg: err.message });
    }
});

routes.put('/updateCategory', async (req, res) => {
    try {
        const data = await CategoryModel.findByIdAndUpdate(req.body.id, req.body.updatedData);

        res.json({ success: 1 });
    } catch (err) {
        res.json({ success: 0, msg: err.message })
    }
});

routes.delete('/deleteCategory', async (req, res) => {
    try {
        let data = await CategoryModel.findByIdAndDelete(req.body.id);

        let deleted = 0;

        if (data)
            deleted = 1;

        res.json({ success: deleted, data });
    } catch (err) {
        res.json({ success: 0, msg: err.message });
    }
});


routes.get('/getExpenses', async (req, res) => {
    try {
        const data = await ExpenseModel.find({ userId: req.body.userId });

        res.json({ success: 1, data: data });
    } catch (err) {
        res.status(400).json({ success: 0, msg: err.message });
    }
});


routes.post('/addExpense', async (req, res) => {
    try {
        const data = await ExpenseModel.create(req.body);

        res.json({ success: 1, data });
    } catch (err) {
        res.json({ success: 0, msg: err.message });
    }
});

routes.put('/updateExpense', async (req, res) => {
    try {
        const data = await ExpenseModel.findByIdAndUpdate(req.body.id, req.body.updatedData);

        res.json({ success: 1 });
    } catch (err) {
        res.json({ success: 0, msg: err.message });
    }
});

routes.delete('/deleteExpense', async (req, res) => {
    try {
        const data = await ExpenseModel.findByIdAndDelete(req.body.id);

        res.json({ success: 1 });
    } catch (err) {
        res.json({ success: 0, msg: err.message });
    }
});


module.exports = routes;