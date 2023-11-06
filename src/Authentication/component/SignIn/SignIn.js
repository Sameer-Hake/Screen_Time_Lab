import '../../css/SignIn.css';
import React, { useEffect, useRef, useState } from 'react';
import logo from '../../utils/signin-logo.svg';
import google from '../../utils/google.svg';
import facebook from '../../utils/facebook.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

const SignIn = () => {
    const navigate = useNavigate("");

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const emailLabel = useRef(null);
    const passwordLabel = useRef(null);

    const { loginWithRedirect } = useAuth0();
    let allUserData = [];

    useEffect(() => {
        emailLabel.current.style.visibility = 'hidden';
        passwordLabel.current.style.visibility = 'hidden';
    }, []);
    useEffect(() => {
        allUserData = JSON.parse(localStorage.getItem("user_data"));
        console.log("allUserData");
        console.log(allUserData);
    });

    const handleEmail = (e) => {
        setEmail(e.target.value);
        if (e.target.value.length > 0) {
            emailLabel.current.style.visibility = 'visible';
        } else {
            emailLabel.current.style.visibility = 'hidden';
        }
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
        if (e.target.value.length > 0) {
            passwordLabel.current.style.visibility = 'visible';
        } else {
            passwordLabel.current.style.visibility = 'hidden';
        }
    }
    const handleLogin = () => {
        for (let i=0;i<allUserData.length;i++) {
            if (email == allUserData[i].email && password == allUserData[i].password) {
                navigate("/app", { replace: true });
            }
        }
    }

    return (
        <div className='sign-body-container'>
            <div className='signin-container'>
                <div className='logo-card'>
                    <img src={logo} alt='Sign In Logo' className='sign-in-logo' />
                </div>

                <div className='signin-items'>
                    <h1 className='login-text'>Log In</h1>

                    <div className="log-with-facebook signin-item">
                        <img src={facebook} alt='Facebook Logo' className='logo-item' />
                        Log in with Facebook
                    </div>

                    <div className="log-with-google signin-item" onClick={() => loginWithRedirect()}>
                        <img src={google} alt='Google Logo' className='logo-item' />
                        Log in with Google
                    </div>

                </div>

                <div className='signin-items-or'>
                    <div className="sign-divider"> </div>
                    <div className="sign-or">or</div>
                    <div className="sign-divider"></div>
                </div>

                <div className='email-field login-field'>
                    <label htmlFor="email" className='field-label email-label'
                        ref={emailLabel}>Email address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        placeholder='Email address'
                        className="sign-in-email"
                        onChange={handleEmail}
                    />
                </div>

                <div className='password-field login-field'>
                    <label htmlFor="sign-password" className='field-label password-label'
                        ref={passwordLabel}>Password</label>
                    <input
                        type="password"
                        id="sign-password"
                        name="sign-password"
                        value={password}
                        placeholder='Password'
                        className="sign-in-email"
                        onChange={handlePassword}
                    />
                </div>

                <div className="remaimber-pass">
                    <div className='checkbox-field'>
                        <input type="checkbox" name="sign-checkbox" />
                        <label className="keep-logged">Keep me logged in</label>
                    </div>
                    <a href='#' className='forgot-password-text'>Forgot password?</a>
                </div>
                <div className="login-button-container">
                    <button className='login-btn' onClick={handleLogin}>Login</button>
                    <label className="have-account after-login-text">Don't have an account? <Link to={"/sign-up"} className='link-text'>Sign Up</Link></label>
                    <label className="after-login-text">Click here to view <a className='link-text' >Privacy Policy</a></label>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
