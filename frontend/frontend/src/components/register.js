// components/RegisterForm.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import bcrypt from 'bcryptjs';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleRegister = async () => {
    // Hash and salt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Here you can send a POST request to your backend to register the user
    // For example:
    // fetch('/api/register', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ username, password: hashedPassword })
    // }).then(response => {
    //   if (response.ok) {
    //     history.push('/login');
    //   }
    // });

    // Redirect to login page after successful registration
    history.push('/login');
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <a href="/login">Login here</a>.</p>
    </div>
  );
}

export default RegisterForm;


