import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

function Login() {
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [isSignup, setIsSignup] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')

    try {
      // Replace with your actual login API endpoint
      const response = await fetch('YOUR_LOGIN_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: user, password }),
      })

      if (!response.ok) {
        throw new Error('Login failed')
      }

      // Store login state
      localStorage.setItem('isLoggedIn', 'true')
      // Navigate to home page
      navigate('/home')
    } catch (err) {
      setError('Invalid username or password')
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setError('')

    try {
      // Replace with your actual signup API endpoint
      const response = await fetch('YOUR_SIGNUP_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: user, email, password }),
      })

      if (!response.ok) {
        throw new Error('Signup failed')
      }

      // Switch to login form after successful signup
      setIsSignup(false)
      setUser('')
      setPassword('')
      setEmail('')
    } catch (err) {
      setError('Failed to create account')
    }
  }

  const toggleForm = () => {
    setIsSignup(!isSignup)
    setError('')
    setUser('')
    setPassword('')
    setEmail('')
  }

  return (
    <div className="login-container">
      <div className="welcome-section">
        <h1>Welcome to Kavach.ai</h1>
      </div>

      <div className="form-container">
        {!isSignup ? (
          // Login Form
          <div className="form-section">
            <h2>Login</h2>
            <form onSubmit={handleLogin} className="input-group">
              <input 
                type="text"
                placeholder="Enter your username"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
              />
              <input 
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error && <div className="error-message">{error}</div>}
              <button type="submit" className="button">Login</button>
              <p className="form-switch">
                Don't have an account?{' '}
                <button type="button" className="link-button" onClick={toggleForm}>
                  Sign Up
                </button>
              </p>
            </form>
          </div>
        ) : (
          // Signup Form
          <div className="form-section">
            <h2>Create Account</h2>
            <form onSubmit={handleSignup} className="input-group">
              <input 
                type="text"
                placeholder="Enter your username"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
              />
              <input 
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input 
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error && <div className="error-message">{error}</div>}
              <button type="submit" className="button">Sign Up</button>
              <p className="form-switch">
                Already have an account?{' '}
                <button type="button" className="link-button" onClick={toggleForm}>
                  Login
                </button>
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default Login;
