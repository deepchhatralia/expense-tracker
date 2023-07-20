import { useEffect, useState } from 'react';
import ShowExpenses from '../../components/ShowExpenses';

import { getCategories } from '../../utils/fetchData';

const Expenses = () => {
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
                                    return <option key={index + 1} value={val}>{val.categoryName}</option>
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
                            <button className='btn btn-primary w-100'>Add</button>
                        </div>
                    </div>
                </div>

                <ShowExpenses />
            </div >
        </>
    );
};

export default Expenses;