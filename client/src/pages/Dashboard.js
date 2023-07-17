import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { checkToken } from '../utils/fetchData';

const Dashboard = () => {
    const navigate = useNavigate();

    const checkTokenIsValid = async (inputToken) => {
        const res = await checkToken(inputToken);

        if (!res.success) {
            navigate('/');
        }
    };

    useEffect(() => {
        const cookieArray = document.cookie.split(';');

        let cookie = cookieArray.find((cookie) => cookie.trim().startsWith("token" + '='));

        if (!cookie) {
            navigate('/');
            return;
        }

        cookie = cookie.substring(7);

        checkTokenIsValid(cookie);


    }, []);

    return (
        <>
            <p>Dashboard page</p>
        </>
    );
};

export default Dashboard;