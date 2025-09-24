// src/components/signup-view/signup-view.jsx

import React, { useState } from 'react';

export const SignupView = ({ onBackToLogin }) => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    birthday: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('https://boiling-beach-61559.herokuapp.com/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
      .then((res) => {
        if (!res.ok) throw new Error('Signup failed');
        return res.json();
      })
      .then(() => {
        alert('Signup successful! You can now log in.');
        onBackToLogin();
      })
      .catch((err) => setError(err.message));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <input name="username" placeholder="Username" onChange={handleChange} required /><br />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required /><br />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required /><br />
      <input name="birthday" type="date" onChange={handleChange} /><br />
      <button type="submit">Sign Up</button>
      <button type="button" onClick={onBackToLogin}>Back to Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};
