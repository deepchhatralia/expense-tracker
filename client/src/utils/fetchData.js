import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const addUser = async (data) => {
    const res = await axios.post(BACKEND_URL + "addUser", data);

    return res.data;
};

export { addUser };