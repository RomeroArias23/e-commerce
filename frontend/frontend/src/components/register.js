import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

function Register() {
    const [ formData, setFromData] = useState({
        username: '',
        password: ''
    });
    
    const history = useHistory();

    const handleChange = (e) => {
        setFromData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                history.push('/dashboard');
            } else {
                const data = await response.json();
            }
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}/>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" value={formData.username} onChange={handleChange}/>
                </div>    
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={formData.username} onChange={handleChange}/>
                </div>
                <button type="submit">Register</button>
                <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
    );
}

export default Register;

