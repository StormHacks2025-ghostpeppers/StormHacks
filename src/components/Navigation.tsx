import { Button } from "./ui/button";
import { Plus, Search, User } from "lucide-react";

interface NavigationProps {
  currentPage: "main" | "fridge" | "recipes" | "account";
  onNavigate: (
    page: "main" | "fridge" | "recipes" | "account",
  ) => void;
}

export function Navigation({
  currentPage,
  onNavigate,
}: NavigationProps) {
  return (
    <div className="bg-gray-800 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => onNavigate("main")}
          >
            <div className="text-2xl">🦛</div>
            <h1 className="text-xl font-bold">
              Hungry Hungry Hippos
            </h1>
          </div>

          {/* Navigation Buttons - Smaller and cleaner */}
          <div className="flex gap-1">
            <Button
              variant={
                currentPage === "fridge" ? "default" : "ghost"
              }
              size="sm"
              className={`px-4 py-2 rounded-lg ${
                currentPage === "fridge"
                  ? "bg-[#8BC34A] hover:bg-[#7CB342] text-white"
                  : "text-white hover:bg-gray-700"
              }`}
              onClick={() => onNavigate("fridge")}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Ingredients
            </Button>

            <Button
              variant={
                currentPage === "recipes" ? "default" : "ghost"
              }
              size="sm"
              className={`px-4 py-2 rounded-lg ${
                currentPage === "recipes"
                  ? "bg-[#c62003] hover:bg-[#a01802] text-white"
                  : "text-white hover:bg-gray-700"
              }`}
              onClick={() => onNavigate("recipes")}
            >
              <Search className="h-4 w-4 mr-1" />
              Recipes
            </Button>

            <Button
              variant={
                currentPage === "account" ? "default" : "ghost"
              }
              size="sm"
              className={`px-4 py-2 rounded-lg ${
                currentPage === "account"
                  ? "bg-gray-900 text-white"
                  : "text-white hover:bg-gray-700"
              }`}
              onClick={() => onNavigate("account")}
            >
              <User className="h-4 w-4 mr-1" />
              Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}