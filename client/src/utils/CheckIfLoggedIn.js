import { checkToken } from "./fetchData";

const checkTokenIsValid = async (inputToken, getUser) => {

    const res = await checkToken(inputToken);

    // if (res.success) {
    //     // navigate('/dashboard');
    //     return 1;
    // }
    // return 0;

    if (getUser)
        return res;

    return res.success;
};

const checkIfLoggedIn = (getUser = false) => {
    const cookieArray = document.cookie.split(';');

    let cookie = cookieArray.find((cookie) => cookie.trim().startsWith("token" + '='));

    if (!cookie) {
        // navigate('/');
        return 0;
    }

    cookie = cookie.substring(7);

    return checkTokenIsValid(cookie, getUser);
}

export { checkIfLoggedIn };

// checkTokenIsValid(cookie);