import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';

const ShowExpenses = ({ allExpenses = [], loadExpForUpdate, deleteExp }) => {
    const navigate = useNavigate();

    return (
        <>
            <div>
                <table className="table table-striped table-bordered table-hover mb-5">
                    <thead>
                        <tr>
                            <th scope="col">Sr No</th>
                            <th scope="col">Category</th>
                            <th scope="col">Expense</th>
                            <th scope="col">Note</th>
                            <th scope="col">Payment Mode</th>
                            <th scope="col">Date & Time</th>
                            <th scope="col">Update</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allExpenses ? allExpenses.map((val, index) => {
                            // const { _id, category, date, expense, note, paymentMode } = val;
                            return (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{val["category"]}</td>
                                    <td>{val["expense"]}</td>
                                    <td>{val["note"]}</td>
                                    <td>{val["paymentMode"]}</td>
                                    <td>{val["date"]}</td>
                                    <td>
                                        <button onClick={() => loadExpForUpdate(val["_id"])} className="tableBtns" title="update">
                                            {<UpdateIcon />}
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => deleteExp(val["_id"])} className="tableBtns" title="delete">
                                            {<DeleteIcon />}
                                        </button>
                                    </td>
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