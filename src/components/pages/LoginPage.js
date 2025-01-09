import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 
import '../../App.css';

export default function SignInPage() {
    const [username, setUsername] = useState('');  // Change email to username
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 

    function handleSubmit(event) {
        event.preventDefault();

        // Sending POST request to backend with username and password
        axios.post('http://localhost:8082/login', { username, password })  // Make sure the URL matches your backend
            .then(res => {
                console.log(res, 'response');
                // You can add logic for redirection or state change after successful login
                navigate('/home'); 
            })
            .catch(err => {
                console.log(err, 'error');
                // Handle error such as showing a notification or message
            });
    }

    return (
        <div className="text-center m-5-auto">
            <h2>Sign in to us</h2>
            <form action="/home" onSubmit={handleSubmit}>
                <p>
                    <label>Username</label><br/>  {/* Label updated to reflect username */}
                    <input 
                        type="text" 
                        name="username"  // Change from 'first_name' to 'username'
                        required 
                        onChange={e => setUsername(e.target.value)}  // Update state to 'username'
                    />
                </p>
                <p>
                    <label>Password</label>
                    <Link to="/forget-password"><label className="right-label">Forget password?</label></Link>
                    <br/>
                    <input 
                        type="password" 
                        name="password" 
                        required 
                        onChange={e => setPassword(e.target.value)} 
                    />
                </p>
                <p>
                    <button id="sub_btn" type="submit">Login</button>
                </p>
            </form>
            <footer>
                <p>First time? <Link to="/register">Create an account</Link>.</p>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    );
}
