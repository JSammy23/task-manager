import React, { useState } from "react";
import app from "../firebase";
import { login } from "../services/auth";
import './LoginPage.Styles.css';        



const LoginPage = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleLogin = (event) => {
        event.preventDefault();

        login(email, password)
            .then(() => {
                console.log('Logged in successfully!')
                // Redirect to dashboard
            })
            .catch((error) => {
                setError(error.message)
            }) ;
    };

    const handleInputChange = (e) => {
        if (e.target.value !== '') {
            e.target.parentElement.classList.add('has-value');
        } else {
            e.target.parentElement.classList.remove('has-value');
        }
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
                <button className="login-button" type="submit">Log In</button>
                {error && <div>{error}</div>}
            </form>
        </div>
    </div>
  )
}

export default LoginPage