import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { checkToken } from '../utils/fetchData';
// import { CheckIfLoggedIn } from "../utils/CheckIfLoggedIn";

const Dashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // <CheckIfLoggedIn />

        const checkTokenIsValid = async (inputToken) => {

            const res = await checkToken(inputToken);

            if (!res.success) {
                navigate('/');
            }
        };

        // const checkIfUserLoggedIn = () => {
        const cookieArray = document.cookie.split(';');

        let cookie = cookieArray.find((cookie) => cookie.trim().startsWith("token" + '='));

        if (!cookie) {
            navigate('/');
            return;
        }

        cookie = cookie.substring(7);

        checkTokenIsValid(cookie);
        // };
    }, []);

    return (
        <>
            <p>Dashboard page</p>
        </>
    );
};

export default Dashboard;