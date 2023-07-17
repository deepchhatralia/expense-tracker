import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/login.css';

import { addUser, validateUser } from '../utils/fetchData';

const Login = () => {
    const navigate = useNavigate();

    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [error, setError] = useState("");

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        let data = await validateUser({ email, password });

        if (data.success) {
            document.cookie = "token=" + data.token;
            setError("");
            navigate('/dashboard');
        } else {
            setError(val => data.msg);
        }
    };

    const handleRegisterClick = () => {
        navigate('/signup');
    };

    return (
        <>
            <div className='outer-container'>
                <div className='inner-container'>
                    {/* <h2 style={{ textAlign: 'center' }}>Login</h2>
                    <form onSubmit={handleFormSubmit}>
                        <table className='login-input-fields'>
                            <tr>
                                <td>
                                    <input type='email' id='username' placeholder='Email address' />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type='password' id='password' placeholder='Password' />
                                </td>
                            </tr>
                        </table>
                        <div className='submit-field'>
                            <input type='submit' id='submit' />
                        </div>
                    </form> */}

                    <form onSubmit={handleFormSubmit}>
                        <div className="form-outline mb-4">
                            <input type="email" id="form2Example" className="form-control" placeholder='Email address' value={email} onChange={e => setEmail(e.target.value)} />
                        </div>

                        <div className="form-outline mb-4">
                            <input type="password" id="form2Example" className="form-control" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
                        </div>

                        <p style={{ fontSize: "14px", color: "red", fontStyle: "italic" }}>{error}</p>

                        {/* <div className="row mb-4">
                            <div className="col d-flex justify-content-center">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="form2Example31" checked />
                                    <label className="form-check-label" for="form2Example31"> Remember me </label>
                                </div>
                            </div>

                            <div className="col">
                                <a href="#!">Forgot password?</a>
                            </div>
                        </div> */}

                        <input type="submit" className="btn btn-primary btn-block mb-4 w-100" value="Login" />

                        <div className="text-center">
                            <p>Not a member? <a href="#!" onClick={handleRegisterClick}>Register</a></p>
                            {/* <p>or sign up with:</p>
                            <button type="button" className="btn btn-link btn-floating mx-1">
                                <i className="fab fa-facebook-f"></i>
                            </button>

                            <button type="button" className="btn btn-link btn-floating mx-1">
                                <i className="fab fa-google"></i>
                            </button>

                            <button type="button" className="btn btn-link btn-floating mx-1">
                                <i className="fab fa-twitter"></i>
                            </button>

                            <button type="button" className="btn btn-link btn-floating mx-1">
                                <i className="fab fa-github"></i>
                            </button> */}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;