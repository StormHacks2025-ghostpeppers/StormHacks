import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/signuppage.css'

function SignupPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle signup logic here
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!')
      return
    }
    console.log('Signup attempted with:', formData)
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
                  />
                </div>
              </div>
              <button type="submit" className="v14_433">
                <span className="v14_434">Sign Up</span>
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