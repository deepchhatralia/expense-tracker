import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// axios.defaults.headers.common['Content-Type'] = 'application/json';
// axios.defaults.headers.common['api'] = API_KEY;

const header = {
    headers: {
        'Content-Type': 'application/json',
        'api-key': API_KEY,
        // Add any other custom headers specific to this request
    },
};

const addUser = async (data) => {
    try {
        const res = await axios.post(BACKEND_URL + "user/addUser", data);

        return res.data;
    } catch (err) {
        return err.message;
    }
};

const validateUser = async (data) => {
    try {
        const res = await axios.post(BACKEND_URL + "user/validateUser", data);

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

        const res = await axios.get(BACKEND_URL + 'user/checkToken', config);

        return res.data;
    } catch (err) {
        return err.message;
    }
};



// returns only one category for updation
const getCategory = async (id) => {
    try {
        const res = await axios.get(BACKEND_URL + 'category/getCategory?id=' + id);

        return res.data;
    } catch (err) {
        return err.message;
    }
}

// returns all categories to show to the user 
const getCategories = async (userId) => {
    try {
        const res = await axios.get(BACKEND_URL + 'category/getCategories?userId=' + userId);

        return res.data;
    } catch (err) {
        return err.message;
    }
};

const addCategory = async (obj) => {
    try {
        const res = await axios.post(BACKEND_URL + 'category/addCategory', obj);

        return res.data;
    } catch (err) {
        return err.message;
    }
};

const updateCategory = async (id, obj) => {
    try {
        const res = await axios.put(BACKEND_URL + 'category/updateCategory', { id: id, updatedData: obj });

        return res.data;
    } catch (err) {
        return err.message;
    }
};

const deleteCategory = async (_id) => {
    try {
        const res = await axios.delete(BACKEND_URL + 'category/deleteCategory', { data: { id: _id } });

        return res.data;
    } catch (err) {
        return err.message;
    }
};



// returns only one expense for updation
const getExpense = async (id) => {
    try {
        const res = await axios.get(BACKEND_URL + 'expense/getExpense?id=' + id);

        return res.data;
    } catch (err) {
        return err.message;
    }
};

// returns all expenses to show to the user 
const getExpenses = async (userid) => {
    // here id is userId, so to only show expenses belonging to a particular user

    try {
        const res = await axios.get(BACKEND_URL + 'expense/getExpenses?id=' + userid);

        return res.data;
    } catch (err) {
        return err.message;
    }
};

const getExpenseByCategory = async (userId, category) => {
    try {
        const res = await axios.get(BACKEND_URL + `expense/getExpenseByCategory?category=${category}&userId=${userId}`)

        return res.data;
    } catch (err) {
        return err.message;
    }
};

const addExpense = async (obj) => {
    try {
        const res = await axios.post(BACKEND_URL + 'expense/addExpense', obj);

        return res.data;
    } catch (err) {
        return err.message;
    }
};

const updateExpense = async (id, obj) => {
    try {
        const res = await axios.put(BACKEND_URL + 'expense/updateExpense', { id: id, updatedData: obj });

        return res.data;
    } catch (err) {
        return err.message;
    }
};

const deleteExpense = async (_id) => {
    try {
        const res = await axios.delete(BACKEND_URL + 'expense/deleteExpense', { data: { id: _id } });

        return res.data;
    } catch (err) {
        return err.message;
    }
}

export { addUser, validateUser, checkToken, getCategory, getCategories, addCategory, updateCategory, deleteCategory, getExpense, getExpenses, addExpense, getExpenseByCategory, updateExpense, deleteExpense };