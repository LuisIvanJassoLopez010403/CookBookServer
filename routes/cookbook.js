var express = require('express');
var router = express.Router();
const {authenticateToken} = require('../middlewares/auth.middleware');

const {
    signup,
    login,
    updateUser,
    deleteUser
} = require('../controllers/users.controller');

const {
    createIngredient,
    getAllIngredients,
    getIngredientById,
    updateIngredient,
    deleteIngredient
} = require('../controllers/ingredients.controller');

const {
    createRecipe,
    updateRecipe,
    deleteRecipe,
    getRecipe,
    getAllRecipes
} = require('../controllers/recipe.controller');

const {
    createList,
    getAllLists,
    getListById,
    updateList,
    deleteList,
    getListsByUser
} = require('../controllers/lists.controller');

const {
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/category.controller');

const {
    searchRecipes
} = require('../controllers/search.controller');


router.post('/signup',signup);
router.post('/login',login);
router.post('/update-user',updateUser);
router.post('/delete-user',deleteUser);

router.post('/create-recipe',authenticateToken,createRecipe);
router.get('/get-all-recipes', getAllRecipes);
router.get('/get-recipe', authenticateToken, getRecipe);
router.post('/update-recipe', authenticateToken, updateRecipe);
router.post('/delete-recipe', authenticateToken, deleteRecipe);

router.post('/create-ingredient', createIngredient);
router.get('/get-all-ingredients', getAllIngredients);
router.get('/get-ingredient', getIngredientById);
router.post('/update-ingredient', updateIngredient);
router.post('/delete-ingredient', deleteIngredient);

router.post('/create-list', authenticateToken, createList);
router.get('/get-all-lists', getAllLists);
router.get('/get-list', authenticateToken, getListById);
router.post('/update-list', authenticateToken, updateList);
router.post('/delete-list', authenticateToken, deleteList);
router.post('/get-user-lists', authenticateToken, getListsByUser);

router.post('/create-category', createCategory);
router.post('/update-category', updateCategory);
router.post('/delete-category', deleteCategory);

router.post('/search-recipe',authenticateToken,searchRecipes);

module.exports = router;
