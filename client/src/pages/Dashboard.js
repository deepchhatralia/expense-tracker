import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { checkToken } from '../utils/fetchData';
import { checkIfLoggedIn } from "../utils/checkIfLoggedIn";
// import { CheckIfLoggedIn } from "../utils/CheckIfLoggedIn";

import Sidebar from "../components/Sidebar";
import Sidebar2 from "../components/Sidebar2";

import { Expenses, Category, Analytics } from './subpages';


const Dashboard = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const navigate = useNavigate();

    const [whichPageCount, setWhichPageCount] = useState(0);

    const subPages = [<Expenses />, <Category />, <Analytics />];

    useEffect(() => {

        if (!checkIfLoggedIn()) {
            navigate('/');
        }

        const param = queryParams.get('p');
        let count = 0;

        if (param == "categories") {
            count = 1;
        } else if (param == "analyse") {
            count = 2;
        }

        setWhichPageCount(count);

        // const checkTokenIsValid = async (inputToken) => {

        //     const res = await checkToken(inputToken);

        //     if (!res.success) {
        //         navigate('/');
        //     }
        // };

        // // const checkIfUserLoggedIn = () => {
        // const cookieArray = document.cookie.split(';');

        // let cookie = cookieArray.find((cookie) => cookie.trim().startsWith("token" + '='));

        // if (!cookie) {
        //     navigate('/');
        //     return;
        // }

        // cookie = cookie.substring(7);

        // checkTokenIsValid(cookie);
        // };
    }, []);

    const handleExpenseClick = () => {
        setWhichPageCount(0);
    };

    const handleCategoryClick = () => {
        setWhichPageCount(1);
    };

    const handleAnalysisClick = () => {
        setWhichPageCount(2);
    }


    const handleLogoutClick = () => {
        // document.cookie = "token=0";
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        navigate('/');
    };

    const clickEvents = [handleExpenseClick, handleCategoryClick, handleAnalysisClick, handleLogoutClick];

    const handleSidebarClick = (index) => {
        clickEvents[index]();
    }

    return (
        <>
            <div className="dashboard-main-container container-fluid">
                <div className="row">
                    <div className="col-md-2" style={{ padding: 0 }}>
                        <Sidebar onSidebarClick={handleSidebarClick} />
                    </div>

                    <div className="col-md-10 dashboard-main-content px-5 py-3">
                        {subPages[whichPageCount]}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;