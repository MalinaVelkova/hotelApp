// src/ForgotPasswordPage.js
import React, { useState } from 'react';
import styles from '../AuthForm.module.css'; // Import the CSS module

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sending reset link to:', email);
    alert(`A password reset link has been sent to ${email} (if an account exists).`);
    setEmail('');
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.formCard}>
        <h1 className={styles.hotelBranding}>HOTEL 101</h1>
        <p className={styles.darkerInstructionText}>Enter your email address to receive a password reset link.</p>
        <form onSubmit={handleSubmit} className={styles.authForm}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className="sr-only">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.inputField}
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>Send Reset Link</button>
        </form>
        <div className={styles.formLink}>
          <a href="/login">Back to Login</a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;