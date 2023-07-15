import '../css/header.css';

import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleSignupClick = () => {
        navigate('/signup');
    };

    return (
        <>
            <div id='header'>
                <h3>Expense Tracker</h3>
                <div id="header-btns">
                    <ul>
                        <button onClick={handleLoginClick}>
                            <li>
                                Login
                            </li>
                        </button>
                        <button onClick={handleSignupClick}>
                            <li>
                                Signup
                            </li>
                        </button>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Header;