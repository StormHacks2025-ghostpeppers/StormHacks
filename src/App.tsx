import { useState } from "react";
import { MainPage } from "./components/MainPage";
import { AuthScreen } from "./components/AuthScreen";
import { FridgeInventory } from "./components/FridgeInventory";
import { RecipesPage } from "./components/RecipesPage";

type CurrentPage = "main" | "fridge" | "recipes" | "account";

export default function App() {
  const [currentPage, setCurrentPage] = useState<CurrentPage>("main");

  const handleNavigation = (page: CurrentPage) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "fridge":
        return <FridgeInventory onNavigate={handleNavigation} />;
      case "recipes":
        return <RecipesPage onNavigate={handleNavigation} />;
      case "account":
        return <AuthScreen onNavigate={handleNavigation} />;
      default:
        return <MainPage onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="size-full min-h-screen bg-gray-50">
      {renderCurrentPage()}
    </div>
  );
}