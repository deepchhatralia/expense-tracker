import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ShowExpenses from '../../components/ShowExpenses';

import { getCategories, addExpense, getExpense, getExpenses, deleteExpense, updateExpense } from '../../utils/fetchData';
import { checkIfLoggedIn } from '../../utils/checkIfLoggedIn';

import "../../css/expenses.css";

const Expenses = () => {
    const navigate = useNavigate();

    const mode = ["Cash", "Debit Card", "Credit Card", "UPI"];
    const [addOrUpdate, setAddOrUpdate] = useState(1);

    const [userId, setUserId] = useState("");
    const [expId, setExpId] = useState("");

    const [allExpenses, setAllExpenses] = useState([]);
    const [expense, setExpense] = useState("");

    const [category, setCategory] = useState(0);
    const [categories, setCategories] = useState([]);

    const [paymentMode, setPaymentMode] = useState(0);
    const [note, setNote] = useState("");

    const [error, setError] = useState("");

    const getUserId = async () => {
        // if (userId != "")
        //     return userId;

        const data = await checkIfLoggedIn(true);

        // if token is expired than it will return 0
        if (!data.success) {
            document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            navigate('/');
        }

        setUserId(data.userId);
        generateCategories(data.userId);
    }

    const checkValidation = () => {
        if (!(category && expense && note)) {
            setError("Please enter all details");
            return 0;
        }
        if (expense == 0) {
            setError("Invalid expense value");
            return 0;
        }
        if (expense > 100000) {
            setError("Expense cannot be more than 1,00,000");
            return 0;
        }
        setError("");
        return 1;
    }

    const clearInputFields = () => {
        setExpense("");
        setCategory(0);
        setPaymentMode("");
        setNote("");
    }

    const generateCategories = async (uId) => {
        // const uId = await getUserId();
        // console.log(uId)
        const data = await getCategories(uId);
        // console.log(data)
        setCategories(data);

        generateExpenses(uId);
    };

    const generateExpenses = async (userId) => {
        // const uId = await getUserId();

        const res = await getExpenses(userId);

        setAllExpenses(res.data);
    }

    const addExp = async () => {
        const user = await checkIfLoggedIn(true);

        // if token is expired than it will return 0
        if (!user.success) {
            document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            navigate('/');
        }

        if (!checkValidation()) {
            return;
        }

        const obj = { userId: user.userId, category: category, paymentMode: mode[paymentMode], expense: expense, note: note };

        // const obj = { userId: user.userId, category: "testing", paymentMode: "cash", expense: 500, note: "testing" };

        const data = await addExpense(obj);

        setAllExpenses(val => {
            return [data.data, ...val]
        });

        clearInputFields();
    };

    const loadExpForUpdate = async (id) => {
        const res = await getExpense(id);
        const { _id: _id, category: _category, date: _date, expense: _expense, note: _note, paymentMode: _paymentMode } = res.data[0];

        setExpId(_id);
        setExpense(_expense);
        setNote(_note);
        setCategory(_category);
        setPaymentMode(_paymentMode);

        // change button text to Update and to fire updateExp event when Update is clicked
        setAddOrUpdate(0);
    };

    const updateExp = async () => {
        if (!checkValidation()) {
            return;
        }
        const obj = { _id: expId, category: category, paymentMode: mode[paymentMode], expense: expense, note: note };

        const res = await updateExpense(expId, obj);

        if (!res.success) {
            setError("Try again");
            return;
        }
        setError("");

        setAllExpenses(val => {
            const temp = val.map(data => {
                if (data._id != res.data._id) {
                    return data;
                }
                return res.data;
            })
            return temp;
        })

        clearInputFields();
        setExpId("");
        setAddOrUpdate(1);
    };

    const deleteExp = async (id) => {
        if (window.confirm("Are you sure you want to delete ??")) {
            const res = await deleteExpense(id);

            if (res.success) {
                generateExpenses(userId);
            }
        }
    };

    useEffect(() => {
        getUserId();

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
                            <textarea maxLength={100} className="form-control" id="note" rows="3"
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
                            <button onClick={() => {
                                addOrUpdate ? addExp() : updateExp()
                            }} className='btn btn-primary w-100'>
                                {addOrUpdate ? "Add" : "Update"}
                            </button>
                        </div>
                    </div>
                </div>

                <ShowExpenses allExpenses={allExpenses} loadExpForUpdate={loadExpForUpdate} deleteExp={deleteExp} />
            </div >
        </>
    );
};

export default Expenses;