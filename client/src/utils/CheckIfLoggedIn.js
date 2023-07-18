import { checkToken } from "./fetchData";

const checkTokenIsValid = async (inputToken) => {

    const res = await checkToken(inputToken);
    // console.log(res)
    if (res.success) {
        // navigate('/dashboard');
        return 1;
    }
};

const checkIfLoggedIn = () => {
    const cookieArray = document.cookie.split(';');

    let cookie = cookieArray.find((cookie) => cookie.trim().startsWith("token" + '='));

    if (!cookie) {
        // navigate('/');
        return 0;
    }

    cookie = cookie.substring(7);

    return checkTokenIsValid(cookie);
}

export { checkIfLoggedIn };

// checkTokenIsValid(cookie);