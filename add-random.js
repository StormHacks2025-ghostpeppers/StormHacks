const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

// Sample data for random ingredients
const ingredientNames = [
    'Tomatoes', 'Chicken Breast', 'Rice', 'Onions', 'Garlic', 
    'Bell Peppers', 'Carrots', 'Potatoes', 'Milk', 'Eggs',
    'Bread', 'Cheese', 'Spinach', 'Ground Beef', 'Pasta',
    'Olive Oil', 'Salt', 'Black Pepper', 'Broccoli', 'Bananas'
];

const units = ['pieces', 'lbs', 'cups', 'oz', 'kg', 'grams', 'liters', 'ml', 'cloves', 'bunch'];
const foodLocations = ['fridge', 'pantry', 'freezer', 'counter', 'spice rack', 'wine cellar'];

// Helper function to get random item from array
const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

// Helper function to get random quantity between 1-10
const getRandomQuantity = () => Math.floor(Math.random() * 10) + 1;

// Helper function to shuffle array and get subset
const getRandomIngredients = (count) => {
    const shuffled = [...ingredientNames].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

// Helper function to generate random expiry date (1-30 days from now)
const getRandomExpiryDate = () => {
    const today = new Date();
    const daysToAdd = Math.floor(Math.random() * 30) + 1; // 1-30 days
    const expiryDate = new Date(today);
    expiryDate.setDate(today.getDate() + daysToAdd);
    return expiryDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
};

const runTest = async () => {
    try {
        console.log('🚀 Starting test script...\n');

        // Step 1: Register user
        console.log('1️⃣ Registering user test@test.com...');
        const registerResponse = await axios.post(`${BASE_URL}/auth/register`, {
            email: 'test@test.com',
            password: '123456'
        });
        console.log('✅ User registered successfully:', registerResponse.data.message);
        console.log('   User ID:', registerResponse.data.userId);

        // Step 2: Login to get token
        console.log('\n2️⃣ Logging in to get authentication token...');
        const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
            email: 'test@test.com',
            password: '123456'
        });
        const token = loginResponse.data.token;
        console.log('✅ Login successful');

        // Step 3: Generate and add 10 random ingredients
        console.log('\n3️⃣ Adding 10 random ingredients to inventory...');
        const randomIngredientNames = getRandomIngredients(10);
        
        for (let i = 0; i < 10; i++) {
            const ingredient = {
                name: randomIngredientNames[i],
                quantity: getRandomQuantity(),
                unit: getRandomItem(units),
                foodLocation: getRandomItem(foodLocations),
                expiryDate: getRandomExpiryDate()
            };

            console.log(`   Adding ingredient ${i + 1}/10: ${ingredient.name}`);
            
            const addResponse = await axios.post(
                `${BASE_URL}/inventory/ingredient`,
                { ingredient },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            
            console.log(`   ✅ Added: ${ingredient.quantity} ${ingredient.unit} of ${ingredient.name} (${ingredient.foodLocation}, expires: ${ingredient.expiryDate})`);
        }

        // Step 4: Fetch and display the complete inventory
        console.log('\n4️⃣ Fetching complete inventory...');
        const inventoryResponse = await axios.get(`${BASE_URL}/inventory`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        console.log('\n📦 Final Inventory:');
        console.log('===================');
        inventoryResponse.data.inventory.ingredients.forEach((ingredient, index) => {
            console.log(`${index + 1}. ${ingredient.quantity} ${ingredient.unit} of ${ingredient.name} (${ingredient.foodLocation}, expires: ${ingredient.expiryDate})`);
        });

        console.log('\n🎉 Test completed successfully!');
        console.log(`Total ingredients in inventory: ${inventoryResponse.data.inventory.ingredients.length}`);

    } catch (error) {
        console.error('❌ Test failed:', error.response?.data || error.message);
        if (error.response?.data?.errors) {
            console.error('Validation errors:', error.response.data.errors);
        }
    }
};

// Run the test
runTest();