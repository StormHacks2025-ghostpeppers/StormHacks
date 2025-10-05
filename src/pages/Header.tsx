import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

interface HeaderProps {
  currentPage: "main" | "kitchen" | "recipes";
  onNavigate: (page: "main" | "kitchen" | "recipes") => void;
}

function FridgeButton({ isActive, onNavigate }: { isActive: boolean; onNavigate: (page: "main" | "kitchen" | "recipes") => void }) {
  return (
    <button
      onClick={() => onNavigate("kitchen")}
      className={`h-[65px] w-[150px] overflow-clip rounded-[100px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] transition-colors ${
        isActive ? "bg-[#769802]" : "bg-[#769802] hover:bg-[#8BC34A]"
      }`}
    >
      <p className="font-['Fraunces:Regular',_sans-serif] font-normal leading-[18px] text-[20px] text-white tracking-[-0.5px] text-center" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
        Fridge
      </p>
    </button>
  );
}

function RecipesButton({ isActive, onNavigate }: { isActive: boolean; onNavigate: (page: "main" | "kitchen" | "recipes" | "account") => void }) {
  return (
    <button
      onClick={() => onNavigate("recipes")}
      className={`h-[65px] w-[150px] overflow-clip rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] transition-colors ${
        isActive ? "bg-[#c62003]" : "bg-[#c62003] hover:bg-[#a01802]"
      }`}
    >
      <p className="font-['Fraunces:Regular',_sans-serif] font-normal leading-[18px] text-[20px] text-white tracking-[-0.5px] text-center" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
        Recipes
      </p>
    </button>
  );
}

function LogoutButton() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <button
      onClick={handleLogout}
      className="h-[64px] w-[150px] overflow-clip rounded-[5px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] transition-colors bg-red-600 hover:bg-red-700"
    >
      <p className="font-['Fraunces:Regular',_sans-serif] font-normal leading-[18px] text-[20px] text-white tracking-[-0.5px] text-center" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
        Logout
      </p>
    </button>
  );
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  return (
    <header className="bg-neutral-100 h-[130px] w-full relative">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center gap-4">
          <div className="h-[83px] w-[87px]">
            <img 
              alt="Hungry Hungry Hippos Logo" 
              className="w-full h-full object-cover" 
              src={logo} 
            />
          </div>
          <button
            onClick={() => onNavigate("main")}
            className="font-['Fraunces:SemiBold_Italic',_sans-serif] font-semibold italic text-[36px] text-black tracking-[-0.5px] hover:text-gray-700 transition-colors cursor-pointer" 
            style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
          >
            Hungry Hungry Hippos
          </button>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-6 items-center">
          <FridgeButton isActive={currentPage === "kitchen"} onNavigate={onNavigate} />
          <RecipesButton isActive={currentPage === "recipes"} onNavigate={onNavigate} />
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}