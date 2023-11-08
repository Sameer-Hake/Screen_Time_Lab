import '../../css/SignUP.css';
import React, { useEffect, useRef, useState } from 'react';
import logo from '../../utils/signin-logo.svg';
import google from '../../utils/google.svg';
import facebook from '../../utils/facebook.svg';
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import useValideUser from '../../utils/useValideUser';

const SignUP = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const emailLabel = useRef(null);
    const passwordLabel = useRef(null);
    const nameLabel = useRef(null);

    const { loginWithRedirect } = useAuth0();
    let allUser = [];

    useEffect(() => {
        nameLabel.current.style.visibility = 'hidden';
        emailLabel.current.style.visibility = 'hidden';
        passwordLabel.current.style.visibility = 'hidden';
    }, []);

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
    const handleName = (e) => {
        setName(e.target.value);
        if (e.target.value.length > 0) {
            nameLabel.current.style.visibility = 'visible';
        } else {
            nameLabel.current.style.visibility = 'hidden';
        }
    }
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const user = useValideUser({ name, email, password });
    const handleSignUp = (e) => {
        allUser = JSON.parse(localStorage.getItem("user_data"));
        let flag = true;
        if (user === null) {
            alert("User is invalide");
        }
        else {
            for (let i = 0; i < allUser.length; i++) {
                if (allUser[i].email === email) {
                    alert("user allready exist");
                    flag = false;
                }
            }
            if (flag || allUser.length === 0) {
                allUser.push(user);
                localStorage.setItem("user_data", JSON.stringify(allUser));
                alert("user Created successfully");
            }
        }
    }

    return (
        <div className='sign-body-container'>
            <div className='signin-container sign-up-conatiner'>
                <div className='logo-card'>
                    <img src={logo} alt='Sign In Logo' className='sign-in-logo' />
                </div>

                <div className='signin-items'>
                    <h1 className='login-text'>Sign up</h1>

                    <div className="log-with-facebook signin-item" >
                        <img src={facebook} alt='Facebook Logo' className='logo-item' />
                        Sign up with Facebook
                    </div>

                    <div className="log-with-google signin-item" onClick={() => loginWithRedirect()} >
                        <img src={google} alt='Google Logo' className='logo-item' />
                        Sign up with Google
                    </div>

                </div>

                <div className='signin-items-or'>
                    <div className="sign-divider"> </div>
                    <div className="sign-or">or</div>
                    <div className="sign-divider"></div>
                </div>

                <div className='name-field login-field'>
                    <label htmlFor="name" className='field-label name-label'
                        ref={nameLabel}>Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        placeholder='Name'
                        className="sign-in-email"
                        onChange={handleName}
                    />
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
                        type={showPassword ? "text" : "password"}
                        id="sign-password"
                        name="sign-password"
                        value={password}
                        placeholder='Password'
                        className="sign-in-email"
                        onChange={handlePassword}
                    />
                    <div className="password-toggle" onClick={togglePasswordVisibility}>
                        {
                            showPassword ? (
                                <i className="fas fa-eye-slash"></i>
                            ) : (
                                <i className="fas fa-eye"></i>
                            )
                        }
                    </div>
                </div>

                <div className="remaimber-pass">
                    <a href='#' className='forgot-password-text'>Have a referral code?</a>
                </div>
                <div className="login-button-container">
                    <button className='sign-up-btn' onClick={() => { handleSignUp() }} >Sign up</button>
                    <label className="have-account after-login-text">ALREADY HAVE AN ACCOUNT? <Link to={"/"} className='link-text'>LOG IN</Link></label>
                    <label className="after-login-text">Click here to view <a className='link-text' >Privacy Policy</a></label>
                </div>
            </div>
        </div>
    );
}

export default SignUP;
