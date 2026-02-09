// src/pages/auth/signup.tsx
import React, { useState } from 'react';
import { useHistory } from '@docusaurus/router';
import { useAuth } from 'better-auth/react';

const SignUpPage = () => {
  const history = useHistory();
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await signUp.email({
        email,
        password,
        firstName,
        lastName,
        callbackURL: '/onboarding' // Redirect to onboarding after signup
      });

      if (response?.error) {
        setError(response.error.message);
      } else {
        // Successfully signed up, redirect to onboarding
        history.push('/onboarding');
      }
    } catch (err) {
      setError('An error occurred during sign up');
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>Create Account</h1>
        <p>Join our Physical AI & Humanoid Robotics learning community</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="btn-primary">Sign Up</button>
        </form>
        
        <div className="auth-footer">
          <p>Already have an account? <a href="/auth/signin">Sign In</a></p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;