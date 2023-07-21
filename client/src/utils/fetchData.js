import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const addUser = async (data) => {
    const res = await axios.post(BACKEND_URL + "addUser", data);

    return res.data;
};

const validateUser = async (data) => {
    const res = await axios.post(BACKEND_URL + "validateUser", data);

    return res.data;
};

const checkToken = async (inputToken) => {
    const config = {
        headers: {
            token: inputToken
        }
    };

    const res = await axios.get(BACKEND_URL + '/checkToken', config);

    return res.data;
};



// returns only one category for updation
const getCategory = async (id) => {
    const res = await axios.get(BACKEND_URL + '/getCategory?id=' + id);

    return res.data;
}

// returns all categories to show to the user 
const getCategories = async () => {
    const res = await axios.get(BACKEND_URL + '/getCategories');

    return res.data;
};

const addCategory = async (obj) => {
    const res = await axios.post(BACKEND_URL + '/addCategory', { newData: obj });

    return res.data;
};

const updateCategory = async (id, obj) => {
    const res = await axios.put(BACKEND_URL + '/updateCategory', { id: id, updatedData: obj });

    return res.data;
};

const deleteCategory = async (_id) => {
    const res = await axios.delete(BACKEND_URL + '/deleteCategory', { data: { id: _id } });

    return res.data;
};



// returns only one expense for updation
const getExpense = async (id) => {
    const res = await axios.get(BACKEND_URL + '/getExpense?id=' + id);

    return res.data;
};

// returns all expenses to show to the user 
const getExpenses = async (userid) => {
    // here id is userId, so to only show expenses belonging to a particular user

    const res = await axios.get(BACKEND_URL + '/getExpenses?id=' + userid);

    return res.data;
};

const addExpense = async (obj) => {
    const res = await axios.post(BACKEND_URL + '/addExpense', obj);

    return res.data;
};

const updateExpense = async (id, obj) => {
    const res = await axios.put(BACKEND_URL + '/updateExpense', { id: id, updatedData: obj });

    return res.data;
};

const deleteExpense = async (_id) => {
    const res = await axios.delete(BACKEND_URL + '/deleteExpense', { data: { id: _id } });

    return res.data;
}

export { addUser, validateUser, checkToken, getCategory, getCategories, addCategory, updateCategory, deleteCategory, getExpense, getExpenses, addExpense, updateExpense, deleteExpense };