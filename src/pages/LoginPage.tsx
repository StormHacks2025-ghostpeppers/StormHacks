import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/loginpage.css'

function LoginPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/login', { // Changed from 'http://127.0.0.1:3000/auth/login'
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      })

      const data = await response.json()

      if (response.ok) {
        // Login successful
        console.log('Login successful:', data)
        
        // Store the JWT token in localStorage
        localStorage.setItem('authToken', data.token)
        
        // Navigate to home page or dashboard
        navigate('/')
      } else {
        // Handle login errors
        if (response.status === 401) {
          setError('Invalid email or password')
        } else if (data.errors && Array.isArray(data.errors)) {
          // Validation errors from backend
          setError(data.errors.map((err: any) => err.msg).join(', '))
        } else {
          setError(data.message || 'Login failed. Please try again.')
        }
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('Network error. Please check your connection and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignUpClick = () => {
    navigate('/signup')
  }

  return (
    <div className="v1_6">
      <div className="login-container">
        <div className="openfridge"></div>
        <div className="v14_413">
          <div className="v14_414">
            <div className="v14_415">
              <span className="v14_416">Sign In</span>
            </div>
            <div className="v14_417" onClick={handleSignUpClick}>
              <span className="v14_418">Sign Up</span>
            </div>
          </div>
          <div className="v14_419">
            <div className="v14_420">
              <span className="v14_438">Access your account</span>
              <span className="v14_436">Hippos can't make recipes alone; lend a hand (and your password)</span>
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
                    placeholder="Enter your password"
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
                  {isLoading ? 'Logging In...' : 'Log In'}
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

export default LoginPage