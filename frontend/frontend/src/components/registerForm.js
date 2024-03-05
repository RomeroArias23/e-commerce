// components/RegisterForm.js

import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';

const RegisterForm = () => {
  const [password, setPassword] = useState('');
  const navigate = Navigate(); // Initialize the useNavigate hook

  const handleRegister = async () => {
    // Hash and salt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Assuming successful registration, redirect to login page
    navigate('/login'); // Use navigate to redirect
  };

  return (
    <div>
      {/* Your registration form */}
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default RegisterForm;
