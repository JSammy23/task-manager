import React, { useState } from "react";
import app from "../firebase";
import auth, { login, createUser } from "../services/auth";
import db from "../services/storage";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import './LoginPage.Styles.css';        

// TODO:
// 1. Handle Forgotten Password

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

    const handleSignUp = async (event) => {
        event.preventDefault();

        try {
            const { user } = await createUser(email, password);
            console.log('User created successfully!');

            const userRef = collection(db, 'users');
            const userDoc = await addDoc(userRef, {
                uid: user.uid,
                email: user.email,
                createdAt: new Date(),
            });

            // Create the 'tasks' sub=collection for the new user
            const tasksRef = collection(userDoc, 'tasks');

            // Add a sample task to 'tasks' sub-collection
            const taskDoc = await addDoc(tasksRef, {
                title: 'Sample task',
                completed: false,
                userId: user.uid,
            });

            navigate('/');
        } catch (error) {
            setError(error.message)
        }
    };


  return (
    <div>
        <div className="login-box">
            <form onSubmit={handleLogin}>
                <div className="user-box">
                    <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={handleInputChange} onFocus={handleInputChange} />
                    <label htmlFor="email" >Email</label>
                </div>
                <div className="user-box">
                    <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} onBlur={handleInputChange} onFocus={handleInputChange} />
                    <label htmlFor="password" >Password</label>
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