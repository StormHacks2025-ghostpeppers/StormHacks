const { body, validationResult } = require('express-validator');

const registerValidation = [
    body('email').isEmail().withMessage('Please enter a valid email address.'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
];

const loginValidation = [
    body('email').isEmail().withMessage('Please enter a valid email address.'),
    body('password').notEmpty().withMessage('Password is required.'),
];

const ingredientValidation = [
    body('ingredient.name').notEmpty().withMessage('Ingredient name is required.'),
    body('ingredient.quantity').optional().isNumeric().withMessage('Quantity must be a number.'),
    body('ingredient.unit').optional().isString().withMessage('Unit must be a string.'),
    body('ingredient.foodLocation').notEmpty().withMessage('Food location is required.'),
];

const inventoryValidation = [
    body('ingredients').isArray().withMessage('Ingredients must be an array.'),
    body('ingredients.*.name').notEmpty().withMessage('Each ingredient must have a name.'),
    body('ingredients.*.foodLocation').notEmpty().withMessage('Each ingredient must have a food location.'),
];

const aiRecipeValidation = [
    body('servings').isInt({ min: 1, max: 20 }).withMessage('Servings must be a number between 1 and 20.'),
    body('time').optional().isInt({ min: 5, max: 480 }).withMessage('Time must be a number between 5 and 480 minutes.'),
    body('meal').optional().isIn(['breakfast', 'lunch', 'dinner', 'snack', 'dessert']).withMessage('Meal must be one of: breakfast, lunch, dinner, snack, dessert.'),
    body('cuisine').optional().isString().trim().isLength({ min: 1 }).withMessage('Cuisine must be a non-empty string.'),
    body('difficulty').optional().isIn(['easy', 'medium', 'hard']).withMessage('Difficulty must be one of: easy, medium, hard.'),
    body('prioritize').isBoolean().withMessage('Prioritize must be a boolean value.'),
    body('vegetarianOnly').isBoolean().withMessage('Vegetarian only must be a boolean value.'),
    body('foodsToAvoid').optional().isArray().withMessage('Foods to avoid must be an array.'),
    body('foodsToAvoid.*').optional().isString().trim().withMessage('Each food to avoid must be a string.'),
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    registerValidation,
    loginValidation,
    ingredientValidation,
    inventoryValidation,
    aiRecipeValidation,
    validate,
};