const express = require('express');
const router = express.Router();
const aiRecipeController = require('../controllers/aiRecipeController');
const authenticate = require('../middleware/auth');
const { aiRecipeValidation, validate } = require('../middleware/validation');

// POST /airecipe - Generate AI recipe based on user inventory and preferences
router.post('/', authenticate, aiRecipeValidation, validate, aiRecipeController.generateAiRecipe);

module.exports = router;