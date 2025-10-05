import { useNavigate } from 'react-router-dom'
import fridgeImg from '../assets/fridge.png'
import hippoAppleImg from '../assets/hippo_apple.png'

function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="w-full h-screen bg-gray-100 relative overflow-hidden">
      {/* Main heading */}
      <h1 
        className="absolute font-bold text-6xl leading-tight"
        style={{
          width: '557px',
          top: '275px',
          left: '163px',
          fontFamily: 'Fraunces, serif',
          color: 'rgba(30,30,30,1)' // Match original CSS color
        }}
      >
        Hippos organize your fridge,
        so recipes are just one chomp away!
      </h1>
      
      {/* Button */}
      <button
        onClick={() => navigate('/login')}
        className="absolute text-white font-semibold text-4xl hover:bg-lime-700 transition-colors"
        style={{
          width: '565px',
          height: '100px',
          top: '679px',
          left: '132px',
          fontFamily: 'Fraunces, serif',
          backgroundColor: 'rgba(118,152,2,1)' // Match original CSS color
        }}
      >
        Swipe to your hippo fridge
      </button>
      
      {/* Fridge and hippo container */}
      <div 
        className="absolute"
        style={{
          width: '744px',
          height: '887px',
          top: '69px',
          left: '636px'
        }}
      >
        {/* Fridge image */}
        <img 
          src={fridgeImg}
          alt="Refrigerator" 
          className="absolute"
          style={{
            width: '744px',
            height: '712px',
            top: '175px',
            left: '0px'
          }}
        />
        
        {/* Hippo with apple */}
        <img 
          src={hippoAppleImg}
          alt="Hippo with apple" 
          className="absolute"
          style={{
            width: '330px',
            height: '316px',
            top: '0px',
            left: '219px'
          }}
        />
      </div>
    </div>
  )
}

export default HomePage