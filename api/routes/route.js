require('dotenv').config();
const express = require('express');
const routes = express.Router();

const { UserModel, CategoryModel, ExpenseModel } = require('../model/index');

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
        const data = await CategoryModel.findByIdAndUpdate(req.body.oldId, req.body.updatedData);

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


module.exports = routes;