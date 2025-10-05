import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle login logic here
    console.log('Login attempted with:', formData)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-100">
      <div className="max-w-md w-full space-y-8">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate('/')}
            className="text-lime-600 hover:text-lime-700 font-medium"
          >
            ← Back
          </button>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-black mb-8">
            Access Your Account
          </h2>
        </div>

        <div className="mb-8">
          <img 
            src="/assets/placeholder.png" 
            alt="Open fridge" 
            className="w-full h-48 object-cover rounded-lg bg-gray-200"
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-600 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-black mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-600 focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-lime-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-lime-700 transition-colors"
          >
            Login
          </button>
        </form>

        <div className="text-center">
          <button
            onClick={() => navigate('/signup')}
            className="text-lime-600 hover:text-lime-700 font-medium"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage