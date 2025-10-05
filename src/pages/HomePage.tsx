import { useNavigate } from 'react-router-dom'
import '../styles/homepage.css'

function HomePage() {
  const navigate = useNavigate()

  const handleButtonClick = () => {
    navigate('/login')
  }

  return (
    <div className="v1_4">
      <div className="text-content">
        <span className="v9_2">
          Hippos organize your fridge, so recipes are just one chomp away!
        </span>
        <div className="v14_2" onClick={handleButtonClick}>
          <div className="v6_195"></div>
          <span className="v6_199">Click for your hippo fridge</span>
        </div>
      </div>
      
      <div className="image-content">
        <div className="v6_188">
          <div className="fridge"></div>
          <div className="hippo_apple"></div>
        </div>
      </div>
    </div>
  )
}

export default HomePage