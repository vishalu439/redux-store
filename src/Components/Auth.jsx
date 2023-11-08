import React, { useState } from 'react';
import { app, auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import './Auth.css';
import { useNavigate } from 'react-router-dom';

const Auth = ({ setIsLoggedIn }) => { // Receive setIsLoggedIn as a prop
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        setShowSuccessMessage(true);
        setIsLoggedIn(true); // Set isLoggedIn to true on successful signup
        setTimeout(() => {
          setShowSuccessMessage(false);
          navigate('/home');
        }, 3000);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setShowSuccessMessage(true);
        setIsLoggedIn(true); // Set isLoggedIn to true on successful login
        setTimeout(() => {
          setShowSuccessMessage(false);
          navigate('/home');
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      setShowErrorMessage(true);
      setTimeout(() => {
        setShowErrorMessage(false);
      }, 3000);
    }
  };

  return (
    <div className="auth-container">
      {showSuccessMessage && (
        <div className="success-message">
          {isSignUp ? 'Signup successful! You can now log in.' : 'Login successful.'}
        </div>
      )}
      {showErrorMessage && (
        <div className="error-message">
          {isSignUp ? 'Signup failed. Please try again.' : 'Login failed. Please check your credentials.'}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="auth-input"
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="auth-input"
        />
        <br />
        <button type="submit" className="auth-button">
          {isSignUp ? 'Sign up' : 'Log in'}
        </button>
      </form>
      <button onClick={() => setIsSignUp(!isSignUp)} className="auth-toggle-button">
        {isSignUp ? "Already have an account? Log in" : "Don't have an account? Sign up"}
      </button>
    </div>
  );
};

export default Auth;
