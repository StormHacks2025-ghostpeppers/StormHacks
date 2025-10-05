const { PrismaClient } = require('@prisma/client');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const prisma = new PrismaClient();

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

const SYSTEM_PROMPT = `
You are a professional recipe generator AI. Your goal is to create realistic, easy-to-follow recipes based on given user preferences and available ingredients.

Rules:
- Use only ingredients from the provided list unless absolutely necessary.
- Take into account: servings, cooking time, meal type, cuisine, difficulty, and dietary restrictions.
- If 'prioritize' is true, prioritize ingredients that expire soon.
- If 'vegetarianOnly' is true, exclude all meat, fish, and animal-based ingredients except dairy/eggs.
- Avoid all items listed in 'foodsToAvoid'.
- Each recipe must include: name, description, ingredients used (subset of given ones), step-by-step instructions, and estimated cooking time.

Respond in JSON format and do not give any greetings or confirmations, only json:
{
  "recipes": [
    {
      "name": "...",
      "description": "...",
        "servings": 0,
      "ingredients": [
        {"name": "...", "quantity": "...", "unit": "..."}
      ],
      "instructions": ["...", "..."],
      "estimated_time": 0
    }
  ]
}
`;

const generateAiRecipe = async (req, res) => {
    const userId = req.userId; // From auth middleware
    const { 
        servings, 
        time, 
        meal, 
        cuisine, 
        difficulty, 
        prioritize, 
        vegetarianOnly, 
        foodsToAvoid 
    } = req.body;

    try {
        // Fetch user's inventory
        const inventory = await prisma.foodInventory.findUnique({
            where: { userId: parseInt(userId) }
        });

        if (!inventory || !inventory.ingredients) {
            return res.status(404).json({ 
                message: 'No inventory found for user. Please add some ingredients first.',
                success: false
            });
        }

        const userIngredients = JSON.parse(inventory.ingredients);
        
        if (userIngredients.length === 0) {
            return res.status(400).json({ 
                message: 'Your inventory is empty. Please add some ingredients first.',
                success: false
            });
        }

        // Sort ingredients by expiry date if prioritize is true
        let sortedIngredients = [...userIngredients];
        if (prioritize) {
            sortedIngredients.sort((a, b) => {
                if (!a.expiryDate && !b.expiryDate) return 0;
                if (!a.expiryDate) return 1;
                if (!b.expiryDate) return -1;
                return new Date(a.expiryDate) - new Date(b.expiryDate);
            });
        }

        // Prepare the prompt for Gemini
        const userPrompt = `
Available ingredients:
${sortedIngredients.map(ing => 
    `- ${ing.name}: ${ing.quantity} ${ing.unit} (location: ${ing.foodLocation}${ing.expiryDate ? `, expires: ${ing.expiryDate}` : ''})`
).join('\n')}

Recipe preferences:
- Servings: ${servings}
- Cooking time: ${time ? `${time} minutes` : 'flexible'}
- Meal type: ${meal || 'any'}
- Cuisine: ${cuisine || 'any'}
- Difficulty: ${difficulty || 'medium'}
- Prioritize expiring ingredients: ${prioritize ? 'yes' : 'no'}
- Vegetarian only: ${vegetarianOnly ? 'yes' : 'no'}
- Foods to avoid: ${foodsToAvoid && foodsToAvoid.length > 0 ? foodsToAvoid.join(', ') : 'none'}

Generate 1-2 recipe options based on these available ingredients and preferences.
        `;

        console.log(`Generating AI recipe for user ${userId} with ${sortedIngredients.length} ingredients`);

        // Call Gemini API
        const result = await model.generateContent([
            { text: SYSTEM_PROMPT },
            { text: userPrompt }
        ]);

        const response = await result.response;
        const aiResponse = response.text();

        // Parse the JSON response
        let parsedRecipes;
        try {
            // Clean the response (remove markdown code blocks if present)
            const cleanedResponse = aiResponse.replace(/```json\n?|\n?```/g, '').trim();
            parsedRecipes = JSON.parse(cleanedResponse);
        } catch (parseError) {
            console.error('Failed to parse AI response:', parseError);
            console.error('Raw AI response:', aiResponse);
            
            // Fallback to mock recipe if parsing fails
            return res.status(500).json({
                success: false,
                message: 'AI service returned invalid response format',
                error: 'Failed to parse recipe data',
                fallback: {
                    recipe: {
                        id: Date.now().toString(),
                        title: `Custom ${cuisine || 'Recipe'} for ${servings} people`,
                        description: `A delicious ${meal || 'meal'} using your available ingredients`,
                        servings,
                        cookTime: time || 30,
                        difficulty: difficulty || 'medium',
                        ingredients: sortedIngredients.slice(0, 5).map(ing => ({
                            name: ing.name,
                            quantity: Math.ceil(ing.quantity / 2),
                            unit: ing.unit,
                            fromInventory: true
                        })),
                        instructions: [
                            "Prepare ingredients from your inventory",
                            "Follow basic cooking principles for your chosen cuisine",
                            "Adjust seasoning to taste",
                            "Serve and enjoy!"
                        ],
                        generatedAt: new Date().toISOString()
                    }
                }
            });
        }

        // Validate the response structure
        if (!parsedRecipes.recipes || !Array.isArray(parsedRecipes.recipes)) {
            console.error('Invalid recipe structure from AI:', parsedRecipes);
            return res.status(500).json({
                success: false,
                message: 'AI service returned invalid recipe structure',
                error: 'No recipes array found'
            });
        }

        // Enhance the recipes with additional metadata
        const enhancedRecipes = parsedRecipes.recipes.map(recipe => ({
            ...recipe,
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            servings,
            generatedAt: new Date().toISOString(),
            usedIngredients: recipe.ingredients?.length || 0,
            availableIngredients: sortedIngredients.length,
            preferences: {
                servings,
                time: time || null,
                meal: meal || null,
                cuisine: cuisine || null,
                difficulty: difficulty || 'medium',
                prioritize,
                vegetarianOnly,
                foodsToAvoid: foodsToAvoid || []
            }
        }));

        console.log(`Successfully generated ${enhancedRecipes.length} recipe(s) for user ${userId}`);

        res.status(200).json({
            success: true,
            message: 'AI recipes generated successfully',
            recipes: enhancedRecipes,
            metadata: {
                totalRecipes: enhancedRecipes.length,
                availableIngredients: sortedIngredients.length,
                requestPreferences: {
                    servings,
                    time: time || 'flexible',
                    meal: meal || 'any',
                    cuisine: cuisine || 'any',
                    difficulty: difficulty || 'medium',
                    prioritize,
                    vegetarianOnly,
                    foodsToAvoid: foodsToAvoid || []
                }
            }
        });

    } catch (error) {
        console.error('AI recipe generation error:', error);
        
        // Handle specific Gemini API errors
        if (error.message?.includes('API key')) {
            return res.status(500).json({ 
                message: 'AI service configuration error. Please check API key.', 
                success: false,
                error: 'INVALID_API_KEY'
            });
        }
        
        if (error.message?.includes('quota') || error.message?.includes('limit')) {
            return res.status(429).json({ 
                message: 'AI service rate limit exceeded. Please try again later.', 
                success: false,
                error: 'RATE_LIMIT_EXCEEDED'
            });
        }

        res.status(500).json({ 
            message: 'Server error while generating recipe', 
            error: error.message,
            success: false
        });
    }
};

module.exports = {
    generateAiRecipe,
};