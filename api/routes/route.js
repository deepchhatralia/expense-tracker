require('dotenv').config();

const jwt = require('jsonwebtoken');

const express = require('express');
const routes = express.Router();

const { UserModel, CategoryModel, ExpenseModel } = require('../model/index');

async function checkIfCategoryExist(val, uId) {
    const data = await CategoryModel.find({ categoryName: val, userId: uId })

    return data.length;
}

routes.post('/addCategory', async (req, res) => {
    try {
        let exist = 0;

        if (await checkIfCategoryExist(req.body.categoryName, req.body.userId)) {
            exist = 1;
        }

        if (exist) {
            res.json({ success: 1, categoryExist: exist })
            return;
        }
        const data = await CategoryModel.create(req.body)

        res.json({ success: 1, categoryExist: exist, data: data })
    } catch (err) {
        res.json({ success: 0, msg: err.message });
    }
});

routes.get('/getCategory', async (req, res) => {
    try {
        const data = await CategoryModel.find({ _id: req.query.id })

        res.json({ success: 1, data: data });
    } catch (err) {
        res.json({ success: 0, msg: err.message });
    }
});

routes.get('/getCategories', async (req, res) => {
    try {
        const userId = req.query.userId;
        const data = await CategoryModel.find({ userId: userId });

        res.json(data);
    } catch (err) {
        res.json({ success: 0, msg: err.message });
    }
});

routes.put('/updateCategory', async (req, res) => {
    try {
        const data = await CategoryModel.findByIdAndUpdate(req.body.id, req.body.updatedData, { new: true });

        res.json({ success: 1, data: data });
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

        res.json({ success: 1, data: data });
    } catch (err) {
        res.json({ success: 0, msg: err.message });
    }
});

routes.get('/getExpense', async (req, res) => {
    try {
        const id = req.query.id;

        const data = await ExpenseModel.find({ _id: id });

        res.status(200).json({ success: 1, data: data });
    } catch (err) {
        res.status(400).json({ success: 0, msg: err.message });
    }
});

routes.get('/getExpenses', async (req, res) => {
    try {
        const id = req.query.id;

        const data = await ExpenseModel.find({ userId: id });

        res.status(200).json({ success: 1, data: data });
    } catch (err) {
        res.status(400).json({ success: 0, msg: err.message });
    }
});

routes.get('/getExpenseByCategory', async (req, res) => {
    try {
        const category = req.query.category;
        const userId = req.query.userId;

        const data = await ExpenseModel.find({ category: category, userId: userId });

        res.status(200).json({ success: 1, data: data });
    } catch (err) {
        res.status(400).json({ success: 0, msg: err.message });
    }
});


routes.post('/addExpense', async (req, res) => {
    try {
        const data = await ExpenseModel.create(req.body);

        res.json({ success: 1, data: data });
    } catch (err) {
        res.json({ success: 0, msg: err.message });
    }
});

routes.put('/updateExpense', async (req, res) => {
    try {
        const data = await ExpenseModel.findByIdAndUpdate(req.body.id, req.body.updatedData, { new: true });

        res.json({ success: 1, data: data });
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