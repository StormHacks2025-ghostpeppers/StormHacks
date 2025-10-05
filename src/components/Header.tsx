import imgChatGptImage20251041358321 from "figma:asset/4bd14b305a485c40b997d6a69ae5ae1bf3d58009.png";

interface HeaderProps {
  currentPage: "main" | "fridge" | "recipes" | "account";
  onNavigate: (
    page: "main" | "fridge" | "recipes" | "account",
  ) => void;
}

function FridgeButton({
  isActive,
  onNavigate,
}: {
  isActive: boolean;
  onNavigate: (
    page: "main" | "fridge" | "recipes" | "account",
  ) => void;
}) {
  return (
    <button
      onClick={() => onNavigate("fridge")}
      className={`h-[65px] w-[150px] overflow-clip rounded-[100px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] transition-colors ${
        isActive
          ? "bg-[#769802]"
          : "bg-[#769802] hover:bg-[#8BC34A]"
      }`}
    >
      <p
        className="font-['Fraunces:Regular',_sans-serif] font-normal leading-[18px] text-[20px] text-white tracking-[-0.5px] text-center"
        style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
      >
        Fridge
      </p>
    </button>
  );
}

function RecipesButton({
  isActive,
  onNavigate,
}: {
  isActive: boolean;
  onNavigate: (
    page: "main" | "fridge" | "recipes" | "account",
  ) => void;
}) {
  return (
    <button
      onClick={() => onNavigate("recipes")}
      className={`h-[65px] w-[150px] overflow-clip rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] transition-colors ${
        isActive
          ? "bg-[#c62003]"
          : "bg-[#c62003] hover:bg-[#a01802]"
      }`}
    >
      <p
        className="font-['Fraunces:Regular',_sans-serif] font-normal leading-[18px] text-[20px] text-white tracking-[-0.5px] text-center"
        style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
      >
        Recipes
      </p>
    </button>
  );
}

function AccountButton({
  isActive,
  onNavigate,
}: {
  isActive: boolean;
  onNavigate: (
    page: "main" | "fridge" | "recipes" | "account",
  ) => void;
}) {
  return (
    <button
      onClick={() => onNavigate("account")}
      className={`h-[64px] w-[150px] overflow-clip rounded-[5px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] transition-colors ${
        isActive ? "bg-black" : "bg-black hover:bg-gray-800"
      }`}
    >
      <p
        className="font-['Fraunces:Regular',_sans-serif] font-normal leading-[18px] text-[20px] text-white tracking-[-0.5px] text-center"
        style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
      >
        Account
      </p>
    </button>
  );
}

export function Header({
  currentPage,
  onNavigate,
}: HeaderProps) {
  return (
    <header className="bg-neutral-100 h-[130px] w-full relative">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center gap-4">
          <div className="h-[83px] w-[87px]">
            <img
              alt="Hungry Hungry Hippos Logo"
              className="w-full h-full object-cover"
              src={imgChatGptImage20251041358321}
            />
          </div>
          <button
            onClick={() => onNavigate("main")}
            className="font-['Fraunces:SemiBold_Italic',_sans-serif] font-semibold italic text-[36px] text-black tracking-[-0.5px] hover:text-gray-700 transition-colors cursor-pointer"
            style={{
              fontVariationSettings: "'SOFT' 0, 'WONK' 1",
            }}
          >
            Hungry Hungry Hippos
          </button>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-6 items-center">
          <FridgeButton
            isActive={currentPage === "fridge"}
            onNavigate={onNavigate}
          />
          <RecipesButton
            isActive={currentPage === "recipes"}
            onNavigate={onNavigate}
          />
          <AccountButton
            isActive={currentPage === "account"}
            onNavigate={onNavigate}
          />
        </div>
      </div>
    </header>
  );
}