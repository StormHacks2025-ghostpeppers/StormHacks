import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../styles/signuppage.css'

const BASE_URL = '/api' // Changed from 'http://127.0.0.1:3000'

function SignupPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    // Clear error when user starts typing
    if (error) setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    // Client-side validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }

    setIsLoading(true)

    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, {
        email: formData.email,
        password: formData.password
      }, {
        timeout: 10000, // 10 second timeout
        headers: {
          'Content-Type': 'application/json'
        }
      })

      // Registration successful
      console.log('Registration successful:', response.data)
      alert('Account created successfully! Please log in.')
      navigate('/login')
    } catch (error: any) {
      console.error('Registration error:', error)
      
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.data?.error === 'DUPLICATE_EMAIL') {
          setError('An account with this email already exists')
        } else if (error.response.data?.errors && Array.isArray(error.response.data.errors)) {
          // Validation errors from backend
          setError(error.response.data.errors.map((err: any) => err.msg).join(', '))
        } else {
          setError(error.response.data?.message || 'Registration failed. Please try again.')
        }
      } else if (error.request) {
        // The request was made but no response was received
        setError('Network error. Please check your connection and try again.')
      } else {
        // Something happened in setting up the request that triggered an Error
        setError('An unexpected error occurred. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignInClick = () => {
    navigate('/login')
  }

  return (
    <div className="v1_6">
      <div className="login-container">
        <div className="openfridge"></div>
        <div className="v14_413">
          <div className="v14_414 signup-active">
            <div className="v14_415" onClick={handleSignInClick}>
              <span className="v14_416">Sign In</span>
            </div>
            <div className="v14_417">
              <span className="v14_418">Sign Up</span>
            </div>
          </div>
          <div className="v14_419">
            <div className="v14_420">
              <span className="v14_438">Create your account</span>
              {error && (
                <div style={{ 
                  color: '#C62003', 
                  fontSize: '14px', 
                  marginTop: '10px',
                  padding: '8px',
                  backgroundColor: '#fef2f2',
                  borderRadius: '6px',
                  border: '1px solid #fecaca'
                }}>
                  {error}
                </div>
              )}
            </div>
            <form className="v14_422" onSubmit={handleSubmit}>
              <div className="v14_423">
                <div className="v14_424">
                  <span className="v14_425">Email</span>
                </div>
                <div className="v14_426">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="v14_427"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div className="v14_428">
                <div className="v14_429">
                  <span className="v14_430">Password</span>
                </div>
                <div className="v14_431">
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password (min 6 characters)"
                    className="v14_432"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div className="v14_428">
                <div className="v14_429">
                  <span className="v14_430">Confirm Password</span>
                </div>
                <div className="v14_431">
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="v14_432"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              <button 
                type="submit" 
                className="v14_433"
                disabled={isLoading}
                style={{ 
                  opacity: isLoading ? 0.7 : 1,
                  cursor: isLoading ? 'not-allowed' : 'pointer'
                }}
              >
                <span className="v14_434">
                  {isLoading ? 'Creating Account...' : 'Sign Up'}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="name"></div>
    </div>
  )
}

export default SignupPage