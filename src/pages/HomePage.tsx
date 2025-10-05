import { useNavigate } from 'react-router-dom'
import fridgeImg from '../assets/fridge.png'
import hippoAppleImg from '../assets/hippo_apple.png'
import '../styles/main.css'

function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="v1_4">
      <div className="text-content">
        <span className="v9_2">
          Hippos organize your fridge, so recipes are just one chomp away!
        </span>
        <div className="v14_2">
          <div className="v6_195"></div>
          <span className="v6_199">Swipe to your hippo fridge</span>
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