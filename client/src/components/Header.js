import '../css/header.css';

import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    const handleTitleClick = () => {
        navigate('/');
    }

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleSignupClick = () => {
        navigate('/signup');
    };

    return (
        <>
            <div id='header'>
                <h1 className='app-name' onClick={handleTitleClick}>Expense Tracker</h1>
                <div id="header-btns">
                    <button onClick={handleLoginClick}>
                        Login
                        {/* <ul>
                            <li>
                                Login
                            </li>
                        </ul> */}
                    </button>
                    <button onClick={handleSignupClick}>
                        Signup
                        {/* <ul>
                            <li>
                                Signup
                            </li>
                        </ul> */}
                    </button>
                </div>
            </div>
        </>
    );
};

export default Header;