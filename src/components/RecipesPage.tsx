import { useState } from "react";
import { Header } from "./Header";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Progress } from "./ui/progress";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";
import {
  Search,
  Clock,
  Users,
  ChefHat,
  Star,
  Heart,
  Sparkles,
  Plus,
  History,
  RefreshCw,
  BookPlus,
} from "lucide-react";
import hippoImage from "figma:asset/4bd14b305a485c40b997d6a69ae5ae1bf3d58009.png";
import { Checkbox } from "./ui/checkbox";

interface Recipe {
  id: number;
  name: string;
  description: string;
  cookTime: string;
  servings: number;
  difficulty: string;
  rating: number;
  ingredients: string[];
  instructions: string[];
  category: string;
  tags: string[];
  isFavorite: boolean;
  canMake?: boolean;
  missingIngredients?: string[];
  isGenerated?: boolean;
  generatedAt?: Date;
}

interface GeneratedRecipe extends Recipe {
  isGenerated: true;
  generatedAt: Date;
}

interface RecipeQuestionnaire {
  servings: string;
  cookTime: string;
  mealType: string;
  dietaryRestrictions: string;
  cuisine: string;
  difficulty: string;
  useExpiring?: boolean;
  vegetarian?: boolean;
  allergies: string[];
}

interface RecipesPageProps {
  onNavigate: (
    page: "main" | "fridge" | "recipes" | "account",
  ) => void;
}

export function RecipesPage({ onNavigate }: RecipesPageProps) {
  // Get fridge inventory from localStorage or use mock data
  const getFridgeInventory = () => {
    // Mock fridge data for demonstration
    return [
      "milk",
      "eggs",
      "butter",
      "flour",
      "sugar",
      "tomatoes",
      "chicken breast",
      "cheese",
      "pasta",
      "olive oil",
      "garlic",
      "onions",
      "bell peppers",
    ];
  };

  const [fridgeInventory] = useState<string[]>(
    getFridgeInventory(),
  );
  const [recipes, setRecipes] = useState<Recipe[]>([
    {
      id: 1,
      name: "Quick Pasta Carbonara",
      description:
        "Creamy pasta dish with eggs, cheese, and bacon",
      cookTime: "15 mins",
      servings: 4,
      difficulty: "Easy",
      rating: 4.8,
      ingredients: [
        "pasta",
        "bacon",
        "eggs",
        "cheese",
        "black pepper",
        "salt",
      ],
      instructions: [
        "Cook pasta according to package instructions",
        "Fry bacon until crispy",
        "Beat eggs with cheese and pepper",
        "Combine hot pasta with egg mixture",
        "Add bacon and serve immediately",
      ],
      category: "Italian",
      tags: ["Quick", "Comfort Food", "Pasta"],
      isFavorite: true,
      canMake: false,
      missingIngredients: ["bacon", "black pepper", "salt"],
    },
    {
      id: 2,
      name: "Grilled Chicken Salad",
      description:
        "Healthy salad with seasoned grilled chicken breast",
      cookTime: "25 mins",
      servings: 2,
      difficulty: "Medium",
      rating: 4.5,
      ingredients: [
        "chicken breast",
        "mixed greens",
        "tomatoes",
        "cucumber",
        "olive oil",
        "lemon",
        "herbs",
      ],
      instructions: [
        "Season and grill chicken breasts",
        "Prepare salad vegetables",
        "Make dressing with oil and lemon",
        "Slice chicken and arrange on salad",
        "Drizzle with dressing and serve",
      ],
      category: "Healthy",
      tags: ["Protein", "Low Carb", "Fresh"],
      isFavorite: false,
      canMake: false,
      missingIngredients: [
        "mixed greens",
        "cucumber",
        "lemon",
        "herbs",
      ],
    },
    {
      id: 3,
      name: "Chocolate Chip Cookies",
      description:
        "Classic homemade cookies with chocolate chips",
      cookTime: "30 mins",
      servings: 24,
      difficulty: "Easy",
      rating: 4.9,
      ingredients: [
        "flour",
        "butter",
        "sugar",
        "eggs",
        "vanilla",
        "chocolate chips",
      ],
      instructions: [
        "Preheat oven to 375°F",
        "Cream butter and sugar",
        "Beat in eggs and vanilla",
        "Mix in flour gradually",
        "Fold in chocolate chips",
        "Bake for 9-11 minutes",
      ],
      category: "Dessert",
      tags: ["Sweet", "Baking", "Classic"],
      isFavorite: true,
      canMake: false,
      missingIngredients: ["vanilla", "chocolate chips"],
    },
    {
      id: 4,
      name: "Vegetable Stir Fry",
      description:
        "Colorful mix of fresh vegetables in savory sauce",
      cookTime: "20 mins",
      servings: 3,
      difficulty: "Easy",
      rating: 4.3,
      ingredients: [
        "bell peppers",
        "onions",
        "soy sauce",
        "garlic",
        "ginger",
        "olive oil",
        "sesame seeds",
      ],
      instructions: [
        "Heat oil in wok or large pan",
        "Add garlic and ginger",
        "Add vegetables in order of cooking time",
        "Stir fry until tender-crisp",
        "Add sauce and toss",
        "Garnish with sesame seeds",
      ],
      category: "Asian",
      tags: ["Vegetarian", "Quick", "Healthy"],
      isFavorite: false,
      canMake: false,
      missingIngredients: [
        "soy sauce",
        "ginger",
        "sesame seeds",
      ],
    },
    {
      id: 5,
      name: "Simple Scrambled Eggs",
      description: "Fluffy scrambled eggs with butter",
      cookTime: "5 mins",
      servings: 2,
      difficulty: "Easy",
      rating: 4.7,
      ingredients: ["eggs", "butter", "milk"],
      instructions: [
        "Beat eggs with a splash of milk",
        "Heat butter in non-stick pan",
        "Pour in eggs and gently scramble",
        "Cook until just set and fluffy",
        "Season with salt and pepper",
      ],
      category: "Breakfast",
      tags: ["Quick", "Protein", "Simple"],
      isFavorite: true,
      canMake: true,
      missingIngredients: [],
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecipe, setSelectedRecipe] =
    useState<Recipe | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  // Recipe generation states
  const [showQuestionnaire, setShowQuestionnaire] =
    useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedRecipes, setGeneratedRecipes] = useState<
    GeneratedRecipe[]
  >([]);
  const [showGeneratedRecipes, setShowGeneratedRecipes] =
    useState(false);
  const [recipeHistory, setRecipeHistory] = useState<
    GeneratedRecipe[]
  >([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showAddRecipe, setShowAddRecipe] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Questionnaire states
  const [questionnaire, setQuestionnaire] =
    useState<RecipeQuestionnaire>({
      servings: "8",
      cookTime: "120 mins",
      mealType: "",
      dietaryRestrictions: "",
      cuisine: "",
      difficulty: "",
      useExpiring: false,
      vegetarian: false,
      allergies: [],
    });

  // New recipe form
  const [newRecipe, setNewRecipe] = useState({
    name: "",
    description: "",
    cookTime: "",
    servings: "",
    difficulty: "Easy",
    ingredients: "",
    instructions: "",
    tags: "",
  });

  const categories = [
    "All",
    "Italian",
    "Healthy",
    "Dessert",
    "Asian",
    "Breakfast",
  ];

  // Helper functions
  const checkCanMakeRecipe = (
    recipe: Recipe,
  ): { canMake: boolean; missingIngredients: string[] } => {
    const missing = recipe.ingredients.filter((ingredient) => {
      const ingredientLower = ingredient.toLowerCase();
      return !fridgeInventory.some(
        (fridgeItem) =>
          fridgeItem.toLowerCase().includes(ingredientLower) ||
          ingredientLower.includes(fridgeItem.toLowerCase()),
      );
    });
    return {
      canMake: missing.length === 0,
      missingIngredients: missing,
    };
  };

  const generateRecipes = async () => {
    setIsGenerating(true);
    setLoadingProgress(0);
    setShowQuestionnaire(false);

    // Simulate loading with progress
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + Math.random() * 20;
      });
    }, 200);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 3000));

    clearInterval(progressInterval);
    setLoadingProgress(100);

    // Generate mock recipes based on questionnaire
    const mockGeneratedRecipes: GeneratedRecipe[] = [
      {
        id: Date.now() + 1,
        name: `${questionnaire.mealType} Delight`,
        description: `A delicious ${questionnaire.mealType.toLowerCase()} recipe perfect for ${questionnaire.servings} people`,
        cookTime: questionnaire.cookTime,
        servings: parseInt(questionnaire.servings) || 2,
        difficulty: questionnaire.difficulty,
        rating: 4.5 + Math.random() * 0.5,
        ingredients: [
          "eggs",
          "butter",
          "flour",
          "milk",
          "sugar",
          "tomatoes",
        ],
        instructions: [
          "Prepare all ingredients",
          "Mix wet ingredients together",
          "Combine with dry ingredients",
          "Cook according to method",
          "Serve hot and enjoy",
        ],
        category: questionnaire.cuisine || "Custom",
        tags: [
          questionnaire.mealType,
          questionnaire.difficulty,
          "Generated",
        ],
        isFavorite: false,
        isGenerated: true,
        generatedAt: new Date(),
        ...checkCanMakeRecipe({
          ingredients: [
            "eggs",
            "butter",
            "flour",
            "milk",
            "sugar",
            "tomatoes",
          ],
        } as Recipe),
      },
      {
        id: Date.now() + 2,
        name: `Quick ${questionnaire.cuisine} Bowl`,
        description: `Fast and easy ${questionnaire.cuisine.toLowerCase()} inspired dish`,
        cookTime: questionnaire.cookTime,
        servings: parseInt(questionnaire.servings) || 2,
        difficulty: questionnaire.difficulty,
        rating: 4.3 + Math.random() * 0.7,
        ingredients: [
          "chicken breast",
          "garlic",
          "onions",
          "olive oil",
          "tomatoes",
        ],
        instructions: [
          "Heat oil in pan",
          "Add aromatics and cook",
          "Add protein and vegetables",
          "Season and cook through",
          "Plate and garnish",
        ],
        category: questionnaire.cuisine || "Custom",
        tags: [questionnaire.mealType, "Quick", "Generated"],
        isFavorite: false,
        isGenerated: true,
        generatedAt: new Date(),
        ...checkCanMakeRecipe({
          ingredients: [
            "chicken breast",
            "garlic",
            "onions",
            "olive oil",
            "tomatoes",
          ],
        } as Recipe),
      },
      {
        id: Date.now() + 3,
        name: `Healthy ${questionnaire.mealType} Option`,
        description: `Nutritious and balanced meal for ${questionnaire.servings} servings`,
        cookTime: questionnaire.cookTime,
        servings: parseInt(questionnaire.servings) || 2,
        difficulty: questionnaire.difficulty,
        rating: 4.6 + Math.random() * 0.4,
        ingredients: [
          "bell peppers",
          "cheese",
          "eggs",
          "milk",
          "flour",
        ],
        instructions: [
          "Prep all vegetables",
          "Create base mixture",
          "Combine ingredients slowly",
          "Cook until golden",
          "Rest and serve",
        ],
        category: "Healthy",
        tags: ["Healthy", questionnaire.mealType, "Generated"],
        isFavorite: false,
        isGenerated: true,
        generatedAt: new Date(),
        ...checkCanMakeRecipe({
          ingredients: [
            "bell peppers",
            "cheese",
            "eggs",
            "milk",
            "flour",
          ],
        } as Recipe),
      },
    ];

    setGeneratedRecipes(mockGeneratedRecipes);
    setRecipeHistory((prev) => [
      ...prev,
      ...mockGeneratedRecipes,
    ]);
    setIsGenerating(false);
    setShowGeneratedRecipes(true);
  };

  const saveGeneratedRecipe = (recipe: GeneratedRecipe) => {
    const savedRecipe = {
      ...recipe,
      isFavorite: true,
      isGenerated: false,
    };
    setRecipes((prev) => [...prev, savedRecipe]);
    setGeneratedRecipes((prev) =>
      prev.filter((r) => r.id !== recipe.id),
    );
  };

  const addCustomRecipe = () => {
    if (!newRecipe.name) return;

    const recipe: Recipe = {
      id: Date.now(),
      name: newRecipe.name,
      description: newRecipe.description,
      cookTime: newRecipe.cookTime,
      servings: parseInt(newRecipe.servings) || 1,
      difficulty: newRecipe.difficulty,
      rating: 0,
      ingredients: newRecipe.ingredients
        .split(",")
        .map((i) => i.trim()),
      instructions: newRecipe.instructions
        .split("\n")
        .filter((i) => i.trim()),
      category: "Custom",
      tags: newRecipe.tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t),
      isFavorite: true,
      ...checkCanMakeRecipe({
        ingredients: newRecipe.ingredients
          .split(",")
          .map((i) => i.trim()),
      } as Recipe),
    };

    setRecipes((prev) => [...prev, recipe]);
    setShowAddRecipe(false);
    setNewRecipe({
      name: "",
      description: "",
      cookTime: "",
      servings: "",
      difficulty: "Easy",
      ingredients: "",
      instructions: "",
      tags: "",
    });
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch =
      recipe.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      recipe.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      recipe.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    const matchesCategory =
      selectedCategory === "All" ||
      recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const favoriteRecipes = recipes.filter(
    (recipe) => recipe.isFavorite,
  );
  const canMakeRecipes = favoriteRecipes.filter(
    (recipe) => recipe.canMake,
  );
  const cannotMakeRecipes = favoriteRecipes.filter(
    (recipe) => !recipe.canMake,
  );

  // Clean up old history (past week)
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const recentHistory = recipeHistory.filter(
    (recipe) =>
      recipe.generatedAt && recipe.generatedAt > oneWeekAgo,
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="recipes" onNavigate={onNavigate} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Recipe Collection
          </h1>
          <p className="text-xl text-gray-600">
            Chomp into tasty recipes for every craving
          </p>
        </div>

        {/* Search Section */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search recipes, ingredients, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between gap-8 mb-8">
          <Button
            onClick={() => setShowQuestionnaire(true)}
            className="bg-[#8BC34A] hover:bg-[#7CB342] text-white flex-1 py-6 px-10 "
          >
            <Sparkles className="h-6 w-6 mr-3" />
            Generate New Recipes
          </Button>

          <Button
            onClick={() => setShowAddRecipe(true)}
            variant="outline"
            className="flex-1 py-6 px-10"
          >
            <Plus className="h-6 w-6 mr-3" />
            Add Your Own Recipe
          </Button>

          {recentHistory.length > 0 && (
            <Button
              onClick={() => setShowHistory(true)}
              variant="outline"
            >
              <History className="h-6 w-4 mr-2" />
              Recipe History ({recentHistory.length})
            </Button>
          )}
        </div>

        {/* Favorites Section */}
        {favoriteRecipes.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Your Favorite Recipes
            </h2>

            {canMakeRecipes.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium text-green-700 mb-3">
                  ✓ You can make these now!
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {canMakeRecipes.slice(0, 3).map((recipe) => (
                    <Card
                      key={recipe.id}
                      className="p-4 border-green-200 bg-green-50"
                    >
                      <h4 className="font-semibold text-gray-900">
                        {recipe.name}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {recipe.description}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-green-700">
                        <Clock className="h-4 w-4" />
                        {recipe.cookTime}
                        <Users className="h-4 w-4 ml-2" />
                        {recipe.servings} servings
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {cannotMakeRecipes.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-500 mb-3">
                  Missing ingredients for these:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cannotMakeRecipes
                    .slice(0, 3)
                    .map((recipe) => (
                      <Card
                        key={recipe.id}
                        className="p-4 opacity-60 border-gray-200 bg-gray-50"
                      >
                        <h4 className="font-semibold text-gray-700">
                          {recipe.name}
                        </h4>
                        <p className="text-sm text-gray-500 mb-2">
                          {recipe.description}
                        </p>
                        <div className="text-sm text-red-600 mb-2">
                          <strong>Missing:</strong>{" "}
                          {recipe.missingIngredients?.join(
                            ", ",
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="h-4 w-4" />
                          {recipe.cookTime}
                          <Users className="h-4 w-4 ml-2" />
                          {recipe.servings} servings
                        </div>
                      </Card>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <Card
              key={recipe.id}
              className="p-4 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {recipe.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {recipe.description}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`ml-2 ${recipe.isFavorite ? "text-red-500" : "text-gray-400"}`}
                >
                  <Heart
                    className={`h-4 w-4 ${recipe.isFavorite ? "fill-current" : ""}`}
                  />
                </Button>
              </div>

              <div className="flex flex-wrap gap-1 mb-3">
                {recipe.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {recipe.cookTime}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {recipe.servings} servings
                </span>
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  {recipe.rating}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <Badge
                  className={getDifficultyColor(
                    recipe.difficulty,
                  )}
                >
                  {recipe.difficulty}
                </Badge>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      className="bg-[#c62003] hover:bg-[#a01802]"
                      onClick={() => setSelectedRecipe(recipe)}
                    >
                      <ChefHat className="h-4 w-4 mr-1" />
                      View Recipe
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    {selectedRecipe && (
                      <>
                        <DialogHeader>
                          <DialogTitle className="text-2xl">
                            {selectedRecipe.name}
                          </DialogTitle>
                          <DialogDescription>
                            View the complete recipe with
                            ingredients and cooking
                            instructions.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-6">
                          <p className="text-gray-600">
                            {selectedRecipe.description}
                          </p>

                          <div className="flex items-center gap-4 text-sm">
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {selectedRecipe.cookTime}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {selectedRecipe.servings} servings
                            </span>
                            <Badge
                              className={getDifficultyColor(
                                selectedRecipe.difficulty,
                              )}
                            >
                              {selectedRecipe.difficulty}
                            </Badge>
                          </div>

                          <div>
                            <h3 className="text-lg font-semibold mb-2">
                              Ingredients
                            </h3>
                            <ul className="space-y-1">
                              {selectedRecipe.ingredients.map(
                                (ingredient, index) => (
                                  <li
                                    key={index}
                                    className="flex items-center gap-2"
                                  >
                                    <div className="w-2 h-2 bg-[#c62003] rounded-full"></div>
                                    {ingredient}
                                  </li>
                                ),
                              )}
                            </ul>
                          </div>

                          <div>
                            <h3 className="text-lg font-semibold mb-2">
                              Instructions
                            </h3>
                            <ol className="space-y-2">
                              {selectedRecipe.instructions.map(
                                (instruction, index) => (
                                  <li
                                    key={index}
                                    className="flex gap-3"
                                  >
                                    <span className="flex-shrink-0 w-6 h-6 bg-[#c62003] text-white rounded-full flex items-center justify-center text-sm font-medium">
                                      {index + 1}
                                    </span>
                                    <span>{instruction}</span>
                                  </li>
                                ),
                              )}
                            </ol>
                          </div>
                        </div>
                      </>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </Card>
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <div className="text-center py-12">
            <ChefHat className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No recipes found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </main>

      {/* Recipe Generation Questionnaire */}
      {(() => {
        const [page, setPage] = useState<1 | 2>(1);
        const commonAllergens = [
          "Peanuts",
          "Tree Nuts",
          "Dairy",
          "Eggs",
          "Gluten/Wheat",
          "Soy",
          "Fish",
          "Shellfish",
          "Sesame",
        ];

        const servingsValue = Number(
          questionnaire.servings || 8,
        );
        const cookTimeMins = parseInt(
          (questionnaire.cookTime || "120").replace(
            /\D/g,
            "",
          ) || "120",
        );

        const canGoNext =
          !!questionnaire.servings &&
          !!questionnaire.cookTime &&
          !!questionnaire.mealType;
        const canGenerate =
          canGoNext &&
          !!questionnaire.cuisine &&
          !!questionnaire.difficulty;

        function toggleAllergy(a: string) {
          setQuestionnaire((p) => {
            const has = p.allergies.includes(a);
            return {
              ...p,
              allergies: has
                ? p.allergies.filter((x) => x !== a)
                : [...p.allergies, a],
            };
          });
        }

        return (
          <Dialog
            open={showQuestionnaire}
            onOpenChange={(open) => {
              setShowQuestionnaire(open);
              if (!open) setPage(1); // reset to page 1 when closing
            }}
          >
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>
                  Tell us what you’re craving!
                </DialogTitle>
                <DialogDescription>
                  Hippos are standing by — faster choices =
                  faster recipes 🦛
                </DialogDescription>
                <div className="mt-2 flex items-center gap-2 text-xs">
                  <span
                    className={
                      page === 1
                        ? "font-semibold"
                        : "text-muted-foreground"
                    }
                  >
                    1. Basics
                  </span>
                  <span className="text-muted-foreground">
                    /
                  </span>
                  <span
                    className={
                      page === 2
                        ? "font-semibold"
                        : "text-muted-foreground"
                    }
                  >
                    2. Preferences
                  </span>
                </div>
              </DialogHeader>

              <div className="space-y-6">
                {page === 1 && (
                  <>
                    {/* Servings (Slider + Quick Picks) */}
                    <div className="space-y-3">
                      <Label className="flex items-center justify-between">
                        <span>How many servings?</span>
                        <span className="text-sm text-muted-foreground">
                          {servingsValue}{" "}
                          {servingsValue === 1
                            ? "person"
                            : "people"}
                        </span>
                      </Label>
                      <Slider
                        min={1}
                        max={8}
                        step={1}
                        value={[servingsValue]}
                        onValueChange={([v]) =>
                          setQuestionnaire((p) => ({
                            ...p,
                            servings: String(v),
                          }))
                        }
                      />
                      <div className="flex gap-2">
                        {[1, 2, 4, 6, 8].map((n) => (
                          <button
                            key={n}
                            type="button"
                            onClick={() =>
                              setQuestionnaire((p) => ({
                                ...p,
                                servings: String(n),
                              }))
                            }
                            className={`px-3 py-1 rounded-md border text-sm
                        ${String(n) === questionnaire.servings ? "border-foreground bg-foreground/5" : "border-border hover:bg-muted"}
                      `}
                          >
                            {n}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Cook Time (Slider + Presets) */}
                    <div className="space-y-3">
                      <Label className="flex items-center justify-between">
                        <span>
                          How long do you have to cook?
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {cookTimeMins} mins
                        </span>
                      </Label>
                      <Slider
                        min={10}
                        max={120}
                        step={5}
                        value={[cookTimeMins]}
                        onValueChange={([v]) =>
                          setQuestionnaire((p) => ({
                            ...p,
                            cookTime: `${v} mins`,
                          }))
                        }
                      />
                      <div className="flex flex-wrap gap-2">
                        {[
                          "10 mins",
                          "15 mins",
                          "20 mins",
                          "30 mins",
                          "45 mins",
                          "60 mins",
                          "90 mins",
                          "120 mins",
                        ].map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() =>
                              setQuestionnaire((p) => ({
                                ...p,
                                cookTime: t,
                              }))
                            }
                            className={`px-3 py-1 rounded-md border text-sm
                        ${t === questionnaire.cookTime ? "border-foreground bg-foreground/5" : "border-border hover:bg-muted"}
                      `}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Meal Type */}
                    <div className="space-y-3">
                      <Label>What meal are you making?</Label>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Breakfast",
                          "Lunch",
                          "Dinner",
                          "Snack",
                          "Dessert",
                        ].map((m) => (
                          <button
                            key={m}
                            type="button"
                            onClick={() =>
                              setQuestionnaire((p) => ({
                                ...p,
                                mealType: m,
                              }))
                            }
                            className={`px-3 py-1 rounded-md border text-sm
                        ${m === questionnaire.mealType ? "border-foreground bg-foreground/5" : "border-border hover:bg-muted"}
                      `}
                            aria-pressed={
                              m === questionnaire.mealType
                            }
                          >
                            {m}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex gap-3 pt-2">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() =>
                          setShowQuestionnaire(false)
                        }
                      >
                        Cancel
                      </Button>
                      <Button
                        className="flex-1 bg-[#8BC34A] hover:bg-[#7CB342]"
                        onClick={() => setPage(2)}
                        disabled={!canGoNext}
                      >
                        Next
                      </Button>
                    </div>
                  </>
                )}

                {page === 2 && (
                  <>
                    {/* Cuisine */}
                    <div className="space-y-3">
                      <Label>What cuisine do you prefer?</Label>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Italian",
                          "Asian",
                          "Mexican",
                          "American",
                          "Mediterranean",
                          "Any",
                        ].map((c) => (
                          <button
                            key={c}
                            type="button"
                            onClick={() =>
                              setQuestionnaire((p) => ({
                                ...p,
                                cuisine: c,
                              }))
                            }
                            className={`px-3 py-1 rounded-md border text-sm
                        ${c === questionnaire.cuisine ? "border-foreground bg-foreground/5" : "border-border hover:bg-muted"}
                      `}
                            aria-pressed={
                              c === questionnaire.cuisine
                            }
                          >
                            {c === "Any" ? "Surprise me!" : c}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Difficulty */}
                    <div className="space-y-3">
                      <Label>Difficulty level?</Label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { k: "Easy", s: "Basic" },
                          { k: "Medium", s: "Some skill" },
                          { k: "Hard", s: "Advanced" },
                        ].map((d) => (
                          <button
                            key={d.k}
                            type="button"
                            onClick={() =>
                              setQuestionnaire((p) => ({
                                ...p,
                                difficulty: d.k,
                              }))
                            }
                            className={`px-3 py-2 rounded-md border text-sm text-left
                        ${d.k === questionnaire.difficulty ? "border-foreground bg-foreground/5" : "border-border hover:bg-muted"}
                      `}
                          >
                            <div className="font-medium">
                              {d.k}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {d.s}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Preferences */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <label className="flex items-center gap-2 text-sm">
                        <Switch
                          checked={!!questionnaire.useExpiring}
                          onCheckedChange={(v) =>
                            setQuestionnaire((p) => ({
                              ...p,
                              useExpiring: v,
                            }))
                          }
                        />
                        Prioritize expiring items
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <Switch
                          checked={!!questionnaire.vegetarian}
                          onCheckedChange={(v) =>
                            setQuestionnaire((p) => ({
                              ...p,
                              vegetarian: v,
                            }))
                          }
                        />
                        Vegetarian only
                      </label>
                    </div>

                    {/* Allergies */}
                    <div className="space-y-3">
                      <Label>Any food to avoid?</Label>

                      {/* Custom allergy input */}
                      <Input
                        placeholder="Note down what to avoid and press Enter"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            const v =
                              e.currentTarget.value.trim();
                            if (v) {
                              setQuestionnaire((p) =>
                                p.allergies.includes(v)
                                  ? p
                                  : {
                                      ...p,
                                      allergies: [
                                        ...p.allergies,
                                        v,
                                      ],
                                    },
                              );
                              e.currentTarget.value = "";
                            }
                          }
                        }}
                      />

                      {/* Show entered items as removable badges */}
                      <div className="flex flex-wrap gap-2">
                        {questionnaire.allergies.map((a) => (
                          <Badge
                            key={a}
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            {a}
                            <button
                              type="button"
                              onClick={() =>
                                setQuestionnaire((p) => ({
                                  ...p,
                                  allergies: p.allergies.filter(
                                    (x) => x !== a,
                                  ),
                                }))
                              }
                              className="ml-1 text-xs text-red-500"
                            >
                              ✕
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex gap-3 pt-2">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => setPage(1)}
                      >
                        Back
                      </Button>
                      <Button
                        className="flex-1 bg-[#8BC34A] hover:bg-[#7CB342]"
                        onClick={generateRecipes}
                        disabled={!canGenerate}
                      >
                        <Sparkles className="h-5 w-5 mr-2" />
                        Generate My Recipes
                      </Button>
                    </div>

                    {/* Micro reassurance */}
                    <p className="text-xs text-muted-foreground text-center">
                      Hippos will match what’s in your fridge
                      for quicker, easier cooking.
                    </p>
                  </>
                )}
              </div>
            </DialogContent>
          </Dialog>
        );
      })()}

      {/* Loading Screen */}
      <Dialog open={isGenerating} onOpenChange={() => {}}>
        <DialogContent className="max-w-md text-center">
          <DialogHeader>
            <DialogTitle>Generating Recipes</DialogTitle>
            <DialogDescription>
              Hippos are finding your recipes! Please wait while
              we create perfect recipes for you.
            </DialogDescription>
          </DialogHeader>
          <div className="py-8">
            <img
              src={hippoImage}
              alt="Hippo finding recipes"
              className="w-24 h-24 mx-auto mb-4 animate-bounce"
            />
            <Progress
              value={loadingProgress}
              className="w-full"
            />
            <p className="text-sm text-gray-500 mt-2">
              {Math.round(loadingProgress)}% complete
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Generated Recipes */}
      <Dialog
        open={showGeneratedRecipes}
        onOpenChange={setShowGeneratedRecipes}
      >
        <DialogContent className="max-w-10xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Your Generated Recipes</DialogTitle>
            <DialogDescription>
              Review and save the recipes generated based on
              your preferences.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            {generatedRecipes.map((recipe) => (
              <Card key={recipe.id} className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {recipe.name}
                    </h3>
                    <p className="text-gray-600">
                      {recipe.description}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() =>
                        saveGeneratedRecipe(recipe)
                      }
                      className="bg-[#8BC34A] hover:bg-[#7CB342]"
                    >
                      <BookPlus className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {recipe.cookTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {recipe.servings} servings
                  </span>
                  <Badge
                    className={getDifficultyColor(
                      recipe.difficulty,
                    )}
                  >
                    {recipe.difficulty}
                  </Badge>
                  {!recipe.canMake && (
                    <Badge variant="destructive">
                      Missing ingredients
                    </Badge>
                  )}
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {recipe.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">
                      Ingredients:
                    </h4>
                    <ul className="text-sm space-y-1">
                      {recipe.ingredients.map(
                        (ingredient, idx) => (
                          <li
                            key={idx}
                            className={`${!recipe.canMake && recipe.missingIngredients?.includes(ingredient) ? "text-red-600 font-medium" : "text-gray-600"}`}
                          >
                            • {ingredient}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">
                      Instructions:
                    </h4>
                    <ol className="text-sm space-y-1">
                      {recipe.instructions.map(
                        (instruction, idx) => (
                          <li
                            key={idx}
                            className="text-gray-600"
                          >
                            {idx + 1}. {instruction}
                          </li>
                        ),
                      )}
                    </ol>
                  </div>
                </div>
              </Card>
            ))}

            <div className="flex gap-2 pt-4">
              <Button
                onClick={generateRecipes}
                variant="outline"
                className="flex-1"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Generate New Ones
              </Button>
              <Button
                onClick={() => setShowGeneratedRecipes(false)}
                className="flex-1"
              >
                Done
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Recipe History */}
      <Dialog open={showHistory} onOpenChange={setShowHistory}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Recipe Generation History</DialogTitle>
            <DialogDescription>
              View your previously generated recipes from the
              past week.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {recentHistory.map((recipe) => (
              <Card key={recipe.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">
                      {recipe.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {recipe.description}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Generated{" "}
                      {recipe.generatedAt?.toLocaleDateString()}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => saveGeneratedRecipe(recipe)}
                    variant="outline"
                  >
                    Save Now
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Custom Recipe */}
      <Dialog
        open={showAddRecipe}
        onOpenChange={setShowAddRecipe}
      >
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Your Own Recipe</DialogTitle>
            <DialogDescription>
              Create and save your own custom recipe to your
              collection.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Recipe Name</Label>
                <Input
                  value={newRecipe.name}
                  onChange={(e) =>
                    setNewRecipe((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  placeholder="My delicious recipe"
                />
              </div>
              <div>
                <Label>Cook Time</Label>
                <Input
                  value={newRecipe.cookTime}
                  onChange={(e) =>
                    setNewRecipe((prev) => ({
                      ...prev,
                      cookTime: e.target.value,
                    }))
                  }
                  placeholder="30 mins"
                />
              </div>
            </div>

            <div>
              <Label>Description</Label>
              <Input
                value={newRecipe.description}
                onChange={(e) =>
                  setNewRecipe((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Brief description of your recipe"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Servings</Label>
                <Input
                  type="number"
                  value={newRecipe.servings}
                  onChange={(e) =>
                    setNewRecipe((prev) => ({
                      ...prev,
                      servings: e.target.value,
                    }))
                  }
                  placeholder="4"
                />
              </div>
              <div>
                <Label>Difficulty</Label>
                <Select
                  value={newRecipe.difficulty}
                  onValueChange={(value) =>
                    setNewRecipe((prev) => ({
                      ...prev,
                      difficulty: value,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">
                      Medium
                    </SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Ingredients (comma separated)</Label>
              <Textarea
                value={newRecipe.ingredients}
                onChange={(e) =>
                  setNewRecipe((prev) => ({
                    ...prev,
                    ingredients: e.target.value,
                  }))
                }
                placeholder="2 eggs, 1 cup flour, 1/2 cup milk"
                rows={3}
              />
            </div>

            <div>
              <Label>Instructions (one per line)</Label>
              <Textarea
                value={newRecipe.instructions}
                onChange={(e) =>
                  setNewRecipe((prev) => ({
                    ...prev,
                    instructions: e.target.value,
                  }))
                }
                placeholder="Beat the eggs&#10;Add flour gradually&#10;Cook until golden"
                rows={4}
              />
            </div>

            <div>
              <Label>Tags (comma separated)</Label>
              <Input
                value={newRecipe.tags}
                onChange={(e) =>
                  setNewRecipe((prev) => ({
                    ...prev,
                    tags: e.target.value,
                  }))
                }
                placeholder="quick, healthy, vegetarian"
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => setShowAddRecipe(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={addCustomRecipe}
                className="flex-1 bg-[#8BC34A] hover:bg-[#7CB342]"
                disabled={!newRecipe.name}
              >
                Add Recipe
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}