import { useEffect, useState } from "react";

const ShowExpenses = () => {
    const [expenses, setExpenses] = useState([]);

    const generateExpenses = async () => {
        // const data = await 
    };

    useEffect(() => {
        generateExpenses();
    }, []);

    return (
        <>
            <div>
                Table to show expenses
            </div>
        </>
    );
};

export default ShowExpenses;