// src/pages/auth/signin.tsx
import React, { useState } from 'react';
import { useHistory } from '@docusaurus/router';
import { useAuth } from 'better-auth/react';

const SignInPage = () => {
  const history = useHistory();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await signIn.email({
        email,
        password,
        callbackURL: '/dashboard' // Default redirect after sign in
      });

      if (response?.error) {
        setError(response.error.message);
      } else {
        // Check if user has completed onboarding
        // If not, redirect to onboarding; otherwise, to dashboard
        history.push('/dashboard');
      }
    } catch (err) {
      setError('An error occurred during sign in');
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>Welcome Back</h1>
        <p>Sign in to continue your Physical AI & Humanoid Robotics journey</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
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
            />
          </div>
          
          <button type="submit" className="btn-primary">Sign In</button>
        </form>
        
        <div className="auth-options">
          <a href="/auth/forgot-password">Forgot Password?</a>
          <p>Don't have an account? <a href="/auth/signup">Sign Up</a></p>
        </div>
        
        <div className="divider">OR</div>
        
        <div className="social-signin">
          <button className="social-btn google">Continue with Google</button>
          <button className="social-btn github">Continue with GitHub</button>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;