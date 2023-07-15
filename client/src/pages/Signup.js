import { useState } from "react";

import { addUser } from "../utils/fetchData";

import "../css/login.css";

const Signup = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [error, setError] = useState('');


    const handleFormSubmission = async (e) => {
        e.preventDefault();

        if (!(firstname && lastname && email && password && cpassword)) {
            setError("Enter all fields");
            return;
        }

        if (password !== cpassword) {
            setError(val => "Password does not match");
            return;
        }

        let res = await addUser({ firstName: firstname, lastName: lastname, email, password });

        if (res.userExist) {
            setError("User already exist");
            return;
        }

        setFirstname("");
        setLastname("");
        setEmail("");
        setPassword("");
        setCpassword("");

        setError(val => "Account created");

        setTimeout(() => {
            setError(val => "");
        }, 2000);
    }

    return (
        <>
            <div className="outer-container">
                <div className="inner-container">
                    <div className="tab-contet">
                        <div className="tab-pane" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
                            <form onSubmit={handleFormSubmission}>
                                <div className="form-outline mb-4">
                                    <input type="text" id="fname" className="form-control" placeholder="First name" value={firstname}
                                        onChange={(e) => setFirstname(e.target.value)} />
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="text" id="lname" className="form-control" placeholder="Last name" value={lastname}
                                        onChange={(e) => setLastname(e.target.value)} />
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="email" id="email" className="form-control" placeholder="Email" value={email}
                                        onChange={(e) => setEmail(e.target.value)} />
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="password" id="password" className="form-control" placeholder="Password" value={password}
                                        onChange={(e) => setPassword(e.target.value)} />
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="password" id="registerRepeatPassword" className="form-control" placeholder="Confirm password" value={cpassword}
                                        onChange={(e) => setCpassword(e.target.value)} />
                                </div>

                                <p style={{ fontSize: "14px", color: "red", fontStyle: "italic" }}>{error}</p>

                                {/* <div className="form-check d-flex justify-content-center mb-4">
                                    <input className="form-check-input me-2" type="checkbox" value="" id="registerCheck" checked
                                        aria-describedby="registerCheckHelpText" />
                                    <label className="form-check-label" for="registerCheck">
                                        I have read and agree to the terms
                                    </label>
                                </div> */}

                                <button type="submit" className="w-100 btn btn-primary btn-block mb-3">Sign in</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;