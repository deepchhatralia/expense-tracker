import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ShowExpenses from '../../components/ShowExpenses';

import { getCategories, addExpense, getExpenses } from '../../utils/fetchData';
import { checkIfLoggedIn } from '../../utils/checkIfLoggedIn';

const Expenses = () => {
    const navigate = useNavigate();

    const [allExpenses, setAllExpenses] = useState([]);
    const [expense, setExpense] = useState("");

    const [category, setCategory] = useState(0);
    const [categories, setCategories] = useState([]);

    const [paymentMode, setPaymentMode] = useState(1);
    const [note, setNote] = useState("");


    const generateCategories = async () => {
        const data = await getCategories();

        setCategories(data);
    };

    useEffect(() => {
        generateCategories();
        generateExpenses();
    }, []);

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
        const obj = { userId: user.userId, category: category, paymentMode: paymentMode, expense: expense, note: note };

        const data = await addExpense(obj);

        setAllExpenses(val => {
            return { ...val, data }
        });
    };

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
                                <option value="1">Cash</option>
                                <option value="2">Debit Card</option>
                                <option value="3">Credit Card</option>
                                <option value="4">UPI</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="category" className="col-md-2 col-form-label">Category</label>
                        <div className="col-md-5">
                            <select id='category' className="form-select"
                                value={category}
                                onChange={e => setCategory(val => e.target.value)}>

                                <option value={0} disabled>Select category</option>

                                {categories.map((val, index) => {
                                    return <option key={index + 1} value={index + 1}>{val.categoryName}</option>
                                })}

                                {/* <option value="1">Cash</option>
                                <option value="2">Debit Card</option>
                                <option value="3">Credit Card</option>
                                <option value="4">UPI</option> */}

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
                    <div className="mb-3 row">
                        {/* <label htmlFor="note" className="col-sm-2 col-form-label">Note</label> */}
                        <div className="col-md-7">
                            <button onClick={() => addExp()} className='btn btn-primary w-100'>Add</button>
                        </div>
                    </div>
                </div>

                <ShowExpenses allExpenses={allExpenses} />
            </div >
        </>
    );
};

export default Expenses;