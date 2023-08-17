import "../css/home.css";

import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    const handleGetStartedClick = () => {
        navigate('/login');
    }

    return (
        <>
            {/* <header>
                <h1>Track your expenses and stay on budget</h1>
                <img src="image.png" alt="Screenshot of the expense tracker app" />
            </header>
            <main>
                <p>Are you tired of keeping track of your expenses in a spreadsheet? Our expense tracker web app makes it easy to track your spending and stay on budget.</p>
                <ul>
                    <li>Add expenses quickly and easily</li>
                    <li>See your spending broken down by category</li>
                    <li>Create budgets and track your progress</li>
                    <li>Get insights into your spending habits</li>
                </ul>
                <p>Our app is easy to use and affordable. Sign up today and start tracking your expenses!</p>
                <a href="https://www.expensetracker.com/" class="btn">Sign up for free today!</a>
                <a href="https://www.expensetracker.com/features" class="btn">Learn more about our features</a>
            </main>
            <footer>
                &copy; 2023 Expense Tracker
            </footer> */}


            <div className="main-body">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h1 style={{ fontWeight: 800 }} className="h1 mb-3">Travel and expense management for growing businesses</h1>

                            <h5>Make intelligent decisions and improve enterprise performance management with collaborative financial planning and analysis.</h5>
                        </div>

                        <div className="offset-md-1 col-md-5 d-flex align-items-center justify-content-center flex-row">
                            <button onClick={handleGetStartedClick} className="w-75 btn btn-outline-secondary text-light border border-warning">
                                <h4 className="m-0">Get Started</h4>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;