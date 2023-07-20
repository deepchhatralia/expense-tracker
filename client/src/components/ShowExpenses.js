import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { checkIfLoggedIn } from "../utils/checkIfLoggedIn";
import { getExpenses } from "../utils/fetchData";
import { all } from "axios";

const ShowExpenses = ({ allExpenses = [] }) => {
    const navigate = useNavigate();

    // const [expenses, setExpenses] = useState([]);

    // const generateExpenses = async () => {
    //     const data = await checkIfLoggedIn(true);

    //     // if token is expired than it will return 0
    //     if (!data.success) {
    //         document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    //         navigate('/');
    //     }

    //     const res = await getExpenses(data.userId);

    //     setExpenses(res.data);
    // }

    // useEffect(() => {
    //     generateExpenses();
    // }, []);

    return (
        <>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Sr No</th>
                            <th scope="col">Category</th>
                            <th scope="col">Expense</th>
                            <th scope="col">Note</th>
                            <th scope="col">Payment Mode</th>
                            <th scope="col">Date & Time</th>
                        </tr>
                    </thead>
                    <tbody>

                        {allExpenses ? allExpenses.map((val, index) => {
                            const { category, date, expense, note, paymentMode } = val;
                            return (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{category}</td>
                                    <td>{expense}</td>
                                    <td>{note}</td>
                                    <td>{paymentMode}</td>
                                    <td>{date}</td>
                                </tr>
                            );
                        }) : "No Expenses"}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ShowExpenses;