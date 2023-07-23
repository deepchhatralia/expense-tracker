import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const addUser = async (data) => {
    try {
        const res = await axios.post(BACKEND_URL + "addUser", data);

        return res.data;
    } catch (err) {
        return err.message;
    }
};

const validateUser = async (data) => {
    try {
        const res = await axios.post(BACKEND_URL + "validateUser", data);

        return res.data;
    } catch (err) {
        return err.message;
    }
};

const checkToken = async (inputToken) => {
    try {
        const config = {
            headers: {
                token: inputToken
            }
        };

        const res = await axios.get(BACKEND_URL + '/checkToken', config);

        return res.data;
    } catch (err) {
        return err.message;
    }
};



// returns only one category for updation
const getCategory = async (id) => {
    try {
        const res = await axios.get(BACKEND_URL + '/getCategory?id=' + id);

        return res.data;
    } catch (err) {
        return err.message;
    }
}

// returns all categories to show to the user 
const getCategories = async () => {
    try {
        const res = await axios.get(BACKEND_URL + '/getCategories');

        return res.data;
    } catch (err) {
        return err.message;
    }
};

const addCategory = async (obj) => {
    try {
        const res = await axios.post(BACKEND_URL + '/addCategory', { newData: obj });

        return res.data;
    } catch (err) {
        return err.message;
    }
};

const updateCategory = async (id, obj) => {
    try {
        const res = await axios.put(BACKEND_URL + '/updateCategory', { id: id, updatedData: obj });

        return res.data;
    } catch (err) {
        return err.message;
    }
};

const deleteCategory = async (_id) => {
    try {
        const res = await axios.delete(BACKEND_URL + '/deleteCategory', { data: { id: _id } });

        return res.data;
    } catch (err) {
        return err.message;
    }
};



// returns only one expense for updation
const getExpense = async (id) => {
    try {
        const res = await axios.get(BACKEND_URL + '/getExpense?id=' + id);

        return res.data;
    } catch (err) {
        return err.message;
    }
};

// returns all expenses to show to the user 
const getExpenses = async (userid) => {
    // here id is userId, so to only show expenses belonging to a particular user

    try {
        const res = await axios.get(BACKEND_URL + '/getExpenses?id=' + userid);

        return res.data;
    } catch (err) {
        return err.message;
    }
};

const getExpenseByCategory = async (userId, category) => {
    try {
        const res = await axios.get(BACKEND_URL + `/getExpenseByCategory?category=${category}&userId=${userId}`)

        return res.data;
    } catch (err) {
        return err.message;
    }
};

const addExpense = async (obj) => {
    try {
        const res = await axios.post(BACKEND_URL + '/addExpense', obj);

        return res.data;
    } catch (err) {
        return err.message;
    }
};

const updateExpense = async (id, obj) => {
    try {
        const res = await axios.put(BACKEND_URL + '/updateExpense', { id: id, updatedData: obj });

        return res.data;
    } catch (err) {
        return err.message;
    }
};

const deleteExpense = async (_id) => {
    try {
        const res = await axios.delete(BACKEND_URL + '/deleteExpense', { data: { id: _id } });

        return res.data;
    } catch (err) {
        return err.message;
    }
}

export { addUser, validateUser, checkToken, getCategory, getCategories, addCategory, updateCategory, deleteCategory, getExpense, getExpenses, addExpense, getExpenseByCategory, updateExpense, deleteExpense };