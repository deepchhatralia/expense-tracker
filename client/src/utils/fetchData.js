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

const getCategories = async () => {
    const res = await axios.get(BACKEND_URL + '/getCategories');

    return res.data;
};

const getExpenses = async (id) => {
    // here id is userId 

    const res = await axios.get(BACKEND_URL + '/getExpenses?id=' + id);

    return res.data;
};

const addExpense = async (obj) => {
    const res = await axios.post(BACKEND_URL + '/addExpense', obj);

    return res.data;
};

const deleteExpense = async (_id) => {
    const res = await axios.delete(BACKEND_URL + '/deleteExpense', { data: { id: _id } });

    return res.data;
}

export { addUser, validateUser, checkToken, getCategories, getExpenses, addExpense, deleteExpense };