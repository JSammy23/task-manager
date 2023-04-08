import React, { useState } from "react";
import app from "../firebase";
import { login, createUser } from "../services/auth";
import { useNavigate } from "react-router-dom";
import './LoginPage.Styles.css';        



const LoginPage = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();

        login(email, password)
            .then(() => {
                console.log('Logged in successfully!')
                // Redirect to dashboard
                navigate('/');
            })
            .catch((error) => {
                setError(error.message)
            });
    };

    const handleInputChange = (e) => {
        if (e.target.value !== '') {
            e.target.parentElement.classList.add('has-value');
        } else {
            e.target.parentElement.classList.remove('has-value');
        }
    };

    const handleSignUp = (event) => {
        event.preventDefault();

        createUser(email, password)
            .then(() => {
                console.log('User created successfully')
                // Console log user
                // redirect to dashboard
                navigate('/');
            })
            .catch((error) => {
                setError(error.message)
            });
    };


  return (
    <div>
        <div className="login-box">
            <form onSubmit={handleLogin}>
                <div className="user-box">
                    <input type="email" name="" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={handleInputChange} onFocus={handleInputChange} />
                    <label>Email</label>
                </div>
                <div className="user-box">
                    <input type="password" name="" value={password} onChange={(e) => setPassword(e.target.value)} onBlur={handleInputChange} onFocus={handleInputChange} />
                    <label>Password</label>
                </div>
                <div className="controls">
                    <button className="login-button" type="submit">Log In</button>
                    <button onClick={handleSignUp} className="sign-up-button" >Sign Up</button>
                </div>
                {error && <div>{error}</div>}
            </form>
        </div>
    </div>
  )
}

export default LoginPage