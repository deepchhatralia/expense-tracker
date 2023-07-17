import { useNavigate } from "react-router-dom";

import { checkToken } from "./fetchData";
import { useEffect } from "react";

const CheckIfLoggedIn = () => {
    const navigate = useNavigate();

    const checkTokenIsValid = async (inputToken) => {

        const res = await checkToken(inputToken);

        if (!res.success) {
            navigate('/');
        }
    };

    const checkIfUserLoggedIn = () => {
        const cookieArray = document.cookie.split(';');

        let cookie = cookieArray.find((cookie) => cookie.trim().startsWith("token" + '='));

        if (!cookie) {
            navigate('/');
            return;
        }

        cookie = cookie.substring(7);

        checkTokenIsValid(cookie);
    };

    useEffect(() => {
        checkIfUserLoggedIn();
    }, []);
};

export { CheckIfLoggedIn };