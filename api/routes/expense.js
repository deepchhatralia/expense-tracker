const express = require("express");
const routes = express.Router();

const { ExpenseModel } = require("../model/index");

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

module.exports = routes;