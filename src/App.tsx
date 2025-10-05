import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import MainPage from './pages/MainPage'
import Inventory from './pages/Inventory'
import RecipesPage from './pages/RecipesPage'
import { ProtectedRoute } from './components/ProtectedRoute'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route 
          path="/mainpage" 
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/inventory" 
          element={
            <ProtectedRoute>
              <Inventory />
            </ProtectedRoute>
          
          } 
        />
        <Route 
          path="/recipes" 
          element={
            <ProtectedRoute>
              <RecipesPage />
            </ProtectedRoute>
          
          } 
        />
      </Routes>
    </div>
  )
}

export default App