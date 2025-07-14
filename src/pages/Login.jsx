 
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiLock, FiUser } from 'react-icons/fi';
import './styles/Login.css';

function Login() {
  const [role, setRole] = useState('ADMIN');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const loginUrl =
      role === 'STUDENT'
        ? 'http://localhost:9090/api/students/login'
        : role === 'FACULTY'
        ? 'http://localhost:9090/api/faculty/login'
        : 'http://localhost:9090/api/auth/login';

    try {
      const response = await axios.post(loginUrl, {
        email: username,  // for STUDENT and FACULTY
        username,         // for ADMIN
        password,
      });

      localStorage.setItem('user', JSON.stringify(response.data));
      const loggedInRole = response.data.role;

      if (loggedInRole === 'STUDENT') {
        navigate('/student/profile');
      } else if (loggedInRole === 'FACULTY') {
        navigate('/faculty');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      alert('Login failed: Invalid username or password.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Back Button */}
      <button className="back-button" onClick={() => window.history.back()}>
        <FiArrowLeft size={20} /> Back
      </button>

      <div className="login-card">
        <div className="login-header">
          <div className="logo">
            <FiLock size={28} className="logo-icon" />
            <h1>Secure Login</h1>
          </div>
          <p className="subtitle">Access your {role.toLowerCase()} portal</p>
        </div>

        <div className="role-tabs">
          {['ADMIN', 'FACULTY', 'STUDENT'].map((r) => (
            <button
              key={r}
              className={`role-tab ${role === r ? 'active' : ''}`}
              onClick={() => setRole(r)}
            >
              {r.charAt(0) + r.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <FiUser className="input-icon" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={`${role === 'ADMIN' ? 'Username' : 'Email'}`}
              required
            />
          </div>

          <div className="input-group">
            <FiLock className="input-icon" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>

          <button className="login-button" type="submit" disabled={isLoading}>
            {isLoading ? 'Authenticating...' : 'Login'}
          </button>
        </form>

        <div className="login-footer">
          <p>Need help? <a href="#">Contact support</a></p>
        </div>
      </div>
    </div>
  );
}

export default Login;