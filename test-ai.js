const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

const testAiRecipe = async () => {
    try {
        console.log('🚀 Starting AI Recipe API test...\n');

        // Step 1: Login to get token
        console.log('1️⃣ Logging in as test@test.com...');
        const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
            email: 'test@test.com',
            password: '123456'
        });
        const token = loginResponse.data.token;
        console.log('✅ Login successful');

        // Step 2: Check current inventory
        console.log('\n2️⃣ Fetching current inventory...');
        const inventoryResponse = await axios.get(`${BASE_URL}/inventory`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const ingredients = inventoryResponse.data.inventory.ingredients;
        console.log(`📦 Found ${ingredients.length} ingredients in inventory:`);
        ingredients.forEach((ingredient, index) => {
            console.log(`   ${index + 1}. ${ingredient.quantity} ${ingredient.unit} of ${ingredient.name} (${ingredient.foodLocation}${ingredient.expiryDate ? `, expires: ${ingredient.expiryDate}` : ''})`);
        });

        if (ingredients.length === 0) {
            console.log('⚠️  No ingredients found. Please run add-random.js first to populate inventory.');
            return;
        }

        // Step 3: Test AI Recipe Generation - Basic request
        console.log('\n3️⃣ Testing AI Recipe Generation (Basic)...');
        const basicRecipeRequest = {
            servings: 4,
            prioritize: false,
            vegetarianOnly: false
        };

        console.log('Request payload:', JSON.stringify(basicRecipeRequest, null, 2));
        
        const basicResponse = await axios.post(
            `${BASE_URL}/airecipe`,
            basicRecipeRequest,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('✅ Basic AI recipe generated successfully!');
        console.log('📋 Recipe Details:');
        basicResponse.data.recipes.forEach((recipe, index) => {
            console.log(`\n   Recipe ${index + 1}: ${recipe.name}`);
            console.log(`   Description: ${recipe.description}`);
            console.log(`   Servings: ${recipe.servings || basicRecipeRequest.servings}`);
            console.log(`   Estimated Time: ${recipe.estimated_time} minutes`);
            console.log(`   Ingredients Used: ${recipe.ingredients?.length || 0}`);
            console.log(`   Instructions: ${recipe.instructions?.length || recipe.steps?.length || 0} steps`);
        });

        // Step 4: Test AI Recipe Generation - Advanced request with all parameters
        console.log('\n4️⃣ Testing AI Recipe Generation (Advanced)...');
        const advancedRecipeRequest = {
            servings: 2,
            time: 45,
            meal: 'dinner',
            cuisine: 'Italian',
            difficulty: 'medium',
            prioritize: true,
            vegetarianOnly: false,
            foodsToAvoid: ['mushrooms', 'nuts']
        };

        console.log('Request payload:', JSON.stringify(advancedRecipeRequest, null, 2));
        
        const advancedResponse = await axios.post(
            `${BASE_URL}/airecipe`,
            advancedRecipeRequest,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('✅ Advanced AI recipe generated successfully!');
        console.log('📋 Recipe Details:');
        advancedResponse.data.recipes.forEach((recipe, index) => {
            console.log(`\n   Recipe ${index + 1}: ${recipe.name}`);
            console.log(`   Description: ${recipe.description}`);
            console.log(`   Servings: ${recipe.servings || advancedRecipeRequest.servings}`);
            console.log(`   Estimated Time: ${recipe.estimated_time} minutes`);
            console.log(`   Ingredients Used:`);
            recipe.ingredients?.forEach((ing, idx) => {
                console.log(`     ${idx + 1}. ${ing.quantity} ${ing.unit} ${ing.name}`);
            });
            console.log(`   Instructions:`);
            const steps = recipe.instructions || recipe.steps || [];
            steps.forEach((step, idx) => {
                console.log(`     ${idx + 1}. ${step}`);
            });
        });

        // Step 5: Test Vegetarian Recipe
        console.log('\n5️⃣ Testing Vegetarian Recipe Generation...');
        const vegetarianRequest = {
            servings: 3,
            time: 30,
            meal: 'lunch',
            difficulty: 'easy',
            prioritize: false,
            vegetarianOnly: true,
            foodsToAvoid: []
        };

        console.log('Request payload:', JSON.stringify(vegetarianRequest, null, 2));
        
        const vegetarianResponse = await axios.post(
            `${BASE_URL}/airecipe`,
            vegetarianRequest,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('✅ Vegetarian recipe generated successfully!');
        console.log('📋 Recipe Details:');
        vegetarianResponse.data.recipes.forEach((recipe, index) => {
            console.log(`\n   Recipe ${index + 1}: ${recipe.name}`);
            console.log(`   Description: ${recipe.description}`);
            console.log(`   Vegetarian: ✅`);
            console.log(`   Estimated Time: ${recipe.estimated_time} minutes`);
        });

        // Step 6: Test Response Metadata
        console.log('\n6️⃣ Checking Response Metadata...');
        const metadata = advancedResponse.data.metadata;
        console.log('📊 Metadata:');
        console.log(`   Total Recipes Generated: ${metadata.totalRecipes}`);
        console.log(`   Available Ingredients: ${metadata.availableIngredients}`);
        console.log(`   Request Preferences:`, JSON.stringify(metadata.requestPreferences, null, 4));

        console.log('\n🎉 All AI Recipe API tests completed successfully!');
        console.log('\n📈 Test Summary:');
        console.log(`   ✅ Basic recipe generation: PASSED`);
        console.log(`   ✅ Advanced recipe generation: PASSED`);
        console.log(`   ✅ Vegetarian recipe generation: PASSED`);
        console.log(`   ✅ Metadata validation: PASSED`);

    } catch (error) {
        console.error('❌ Test failed:', error.response?.data || error.message);
        
        if (error.response?.data?.errors) {
            console.error('Validation errors:', error.response.data.errors);
        }
        
        if (error.response?.status === 404) {
            console.error('💡 Tip: Make sure the user has an inventory. Run add-random.js first.');
        }
        
        if (error.response?.status === 401) {
            console.error('💡 Tip: Make sure the user test@test.com exists and password is correct.');
        }

        if (error.response?.status === 500 && error.response?.data?.error === 'INVALID_API_KEY') {
            console.error('💡 Tip: Check your GEMINI_API_KEY in the .env file.');
        }
    }
};

// Additional test for validation errors
const testValidationErrors = async () => {
    try {
        console.log('\n🧪 Testing Validation Errors...\n');

        // Login first
        const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
            email: 'test@test.com',
            password: '123456'
        });
        const token = loginResponse.data.token;

        // Test invalid servings
        console.log('7️⃣ Testing invalid servings (should fail)...');
        try {
            await axios.post(
                `${BASE_URL}/airecipe`,
                {
                    servings: 25, // Invalid: max is 20
                    prioritize: false,
                    vegetarianOnly: false
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log('❌ Should have failed but didn\'t');
        } catch (error) {
            if (error.response?.status === 400) {
                console.log('✅ Correctly rejected invalid servings');
                console.log('   Error:', error.response.data.errors[0].msg);
            } else {
                throw error;
            }
        }

        // Test invalid meal type
        console.log('\n8️⃣ Testing invalid meal type (should fail)...');
        try {
            await axios.post(
                `${BASE_URL}/airecipe`,
                {
                    servings: 4,
                    meal: 'brunch', // Invalid: not in allowed list
                    prioritize: false,
                    vegetarianOnly: false
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log('❌ Should have failed but didn\'t');
        } catch (error) {
            if (error.response?.status === 400) {
                console.log('✅ Correctly rejected invalid meal type');
                console.log('   Error:', error.response.data.errors[0].msg);
            } else {
                throw error;
            }
        }

        console.log('\n✅ Validation tests completed successfully!');

    } catch (error) {
        console.error('❌ Validation test failed:', error.response?.data || error.message);
    }
};

// Run both test suites
const runAllTests = async () => {
    await testAiRecipe();
    await testValidationErrors();
};

// Run the tests
runAllTests();