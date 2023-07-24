import React from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

import { useEffect, useState } from "react";
import { getCategories, getExpenseByCategory, getExpenses } from "../../utils/fetchData";
import { checkIfLoggedIn } from "../../utils/checkIfLoggedIn";
import { useNavigate } from "react-router-dom";

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true
        },
    },
};

const Analytics = () => {
    const navigate = useNavigate();

    const [userId, setUserId] = useState("");

    const [allCategories, setAllCategories] = useState([]);
    const [categoryData, setCategoryData] = useState({});
    const [paymentModeData, setPaymentModeData] = useState({});
    const [monthWiseExpenseData, setMonthWiseExpenseData] = useState([0, 0, 0, 0, 0, 0, 500, 0, 0, 0, 0, 0]);

    const catData = {
        // labels,
        datasets: [
            {
                label: 'Expense',
                data: categoryData,
                backgroundColor: '#5CA4A9',
            }
        ]
    };

    const payModeData = {
        labels: Object.keys(paymentModeData),
        datasets: [
            {
                label: 'No. of payments',
                data: Object.values(paymentModeData),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ]
            },
        ],
    };

    const monthWiseData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: 'Month wise expenses (Rs.)',
                data: monthWiseExpenseData,
                backgroundColor: '#5CA4A9',
            }
        ],
    };

    // generateAllExpensesByCategories
    const generate = async (userId) => {
        let _categoryData = {};
        let _paymentModeData = {};

        const res = await getExpenses(userId);

        // let amountSum = 0;

        let temp = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        res.data.map(val => {
            // amountSum += val.expense;
            const dateString = val.date;
            const [datePart, timePart] = dateString.split(', ');
            const [day, month, year] = datePart.split('/');
            const [time, ampm] = timePart.split(' ');
            const [hour, minute, second] = time.split(':');

            temp[parseInt(month)] += val.expense;

            // setMonthWiseExpenseData(data => {
            //     data[Number(month)] += val.expense;
            //     return data;
            // });

            if (_categoryData[val.category])
                _categoryData[val.category] += val.expense;
            else
                _categoryData[val.category] = val.expense;

            // calculating total expense and showing % of amount made through a payment mode
            // if (_paymentModeData[val.paymentMode])
            //     _paymentModeData[val.paymentMode] += val.expense;
            // else
            //     _paymentModeData[val.paymentMode] = val.expense;

            // calculating number of payments made through a particular payment mode
            if (_paymentModeData[val.paymentMode])
                _paymentModeData[val.paymentMode] += 1;
            else
                _paymentModeData[val.paymentMode] = 1;

        });


        // converting total amount of each payment mode to percentage for pie chart
        // Object.keys(_paymentModeData).forEach(element => {
        //     _paymentModeData[element] = (_paymentModeData[element] * 100) / amountSum;
        // });

        setCategoryData(_categoryData);
        setPaymentModeData(_paymentModeData);
        setMonthWiseExpenseData(temp);
    };

    const generateUserId = async () => {
        const user = await checkIfLoggedIn(true);

        // if token is expired than it will return 0
        if (!user.success) {
            document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            navigate('/');
        }

        setUserId(user.userId);

        generate(user.userId);

    };

    useEffect(() => {
        generateUserId();
    }, []);


    return (
        <>
            <div className='row'>
                <div className='offset-md-2 col-md-8 mb-5'>
                    <Bar options={options} data={catData} />
                </div>
            </div>

            <div className='row'>
                <div className='offset-md-2 col-md-8 mb-5'>
                    <Pie options={options} data={payModeData} />
                </div>
            </div>

            <div className='row'>
                <div className='offset-md-2 col-md-8 mb-5'>
                    <Bar options={options} data={monthWiseData} />
                </div>
            </div>
        </>
    );
};

export default Analytics;