// src/pages/Signup.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../AuthForm.module.css';

function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError('');
    console.log("Form submitted");
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    // console.log('Signup Data:', { fullName, email, password });
    // alert('Signup successful (for demo purposes)!');
    const [first_name, ...rest] = fullName.trim().split(' ');
    const last_name = rest.join(' ') || '-';
    const username = email;

    try {
      const response = await fetch('http://127.0.0.1:8000/api/signup/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name,
          last_name,
          username,
          email,
          password,
          password2: confirmPassword,
        }),
      });
      const data = await response.json();
      console.log("Signup response status:", response.status);
      console.log("Signup response data:", data);
      if (response.status === 201) {
        navigate('/login');
      } else {
        setError(data.error || JSON.stringify(data));
      }
    } catch (err) {
      setError('Network error');
      console.log('Network error:', err);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.formCard}>
        <div className={styles.hotelBranding}>HOTEL 101</div>
        <form onSubmit={handleSubmit} className={styles.authForm}>
          <div className={styles.inputGroup}>
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className={styles.inputField}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.inputField}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={styles.inputField}
              />
              <button
                type="button"
                className={styles.togglePasswordButton}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className={styles.inputField}
              />
              <button
                type="button"
                className={styles.togglePasswordButton}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>


          {error && <div style={{ color: "red" }}>{error}</div>}
          <button type="submit" className={styles.submitButton}>
            Sign Up
          </button>
        </form>
        <p className={styles.formLink}>
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;