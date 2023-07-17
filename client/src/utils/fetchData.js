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

export { addUser, validateUser, checkToken };