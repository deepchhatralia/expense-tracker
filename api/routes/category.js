const express = require("express");
const { CategoryModel } = require("../model/index");
const routes = express.Router();

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

module.exports = routes;