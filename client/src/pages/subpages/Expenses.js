import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ShowExpenses from '../../components/ShowExpenses';

import { getCategories, addExpense, getExpenses, deleteExpense } from '../../utils/fetchData';
import { checkIfLoggedIn } from '../../utils/checkIfLoggedIn';

import "../../css/expenses.css";

const Expenses = () => {
    const navigate = useNavigate();

    const mode = ["Cash", "Debit Card", "Credit Card", "UPI"];

    const [allExpenses, setAllExpenses] = useState([]);
    const [expense, setExpense] = useState("");

    const [category, setCategory] = useState(0);
    const [categories, setCategories] = useState([]);

    const [paymentMode, setPaymentMode] = useState(0);
    const [note, setNote] = useState("");

    const [error, setError] = useState("");


    const generateCategories = async () => {
        const data = await getCategories();

        setCategories(data);
    };

    const generateExpenses = async () => {
        const data = await checkIfLoggedIn(true);

        // if token is expired than it will return 0
        if (!data.success) {
            document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            navigate('/');
        }

        const res = await getExpenses(data.userId);

        setAllExpenses(res.data);
    }

    const addExp = async () => {
        const user = await checkIfLoggedIn(true);

        // if token is expired than it will return 0
        if (!user.success) {
            document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            navigate('/');
        }

        if (!(category && expense && note)) {
            setError("Please enter all details");
            return;
        }
        setError("");

        const obj = { userId: user.userId, category: category, paymentMode: mode[paymentMode], expense: expense, note: note };

        // const obj = { userId: user.userId, category: "testing", paymentMode: "cash", expense: 500, note: "testing" };

        const data = await addExpense(obj);

        setAllExpenses(val => {
            return [...val, data.data]
        });

        setExpense("");
        setCategory(0);
        setPaymentMode("");
        setNote("");
    };

    const deleteExp = async (id) => {
        if (window.confirm("Are you sure you want to delete ??")) {
            const res = await deleteExpense(id);

            if (res.success) {
                generateExpenses();
            }
        }
    };

    useEffect(() => {
        generateCategories();
        generateExpenses();
    }, []);

    return (
        <>
            <div className="container">
                <div className='mb-5'>
                    <div className="mb-3 row">
                        <label htmlFor="amt" className="col-md-2 col-form-label">Amount</label>
                        <div className="col-md-5">
                            <input type="number" className="form-control" id="amt"
                                value={expense}
                                onChange={e => setExpense(val => e.target.value)} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="payment-mode" className="col-md-2 col-form-label">Payment Mode</label>
                        <div className="col-md-5">
                            <select id='payment-mode' className="form-select"
                                value={paymentMode}
                                onChange={e => setPaymentMode(val => e.target.value)}>
                                {mode.map((val, index) => {
                                    return <option key={index} value={index}>{val}</option>
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="category" className="col-md-2 col-form-label">Category</label>
                        <div className="col-md-5">
                            <select id='category' className="form-select"
                                value={category}
                                onChange={e => {
                                    setCategory(val => e.target.value)
                                }}>

                                <option value={0} disabled>Select category</option>

                                {categories.map((val, index) => {
                                    return <option key={index + 1} value={val.categoryName}>{val.categoryName}</option>
                                })}

                            </select>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="note" className="col-md-2 col-form-label">Note</label>
                        <div className="col-md-5">
                            <textarea className="form-control" id="note" rows="3"
                                value={note}
                                onChange={e => setNote(val => e.target.value)}></textarea>
                        </div>
                    </div>
                    <div className='mb-2' style={{ color: "red", fontSize: "13px", fontStyle: "italic" }}>
                        {error}
                    </div>
                    <div className="mb-3 row">
                        {/* <label htmlFor="note" className="col-sm-2 col-form-label">Note</label> */}
                        <div className="col-md-7">
                            <button onClick={() => addExp()} className='btn btn-primary w-100'>Add</button>
                        </div>
                    </div>
                </div>

                <ShowExpenses allExpenses={allExpenses} deleteExp={deleteExp} />
            </div >
        </>
    );
};

export default Expenses;