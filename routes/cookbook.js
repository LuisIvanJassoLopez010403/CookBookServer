var express = require('express');
var router = express.Router();
const {authenticateToken} = require('../middlewares/auth.middleware');

const {
    signup,
    login,
    updateUser,
    deleteUser,
    getUserDetails,
    getUserById
} = require('../controllers/users.controller');

const {
    createIngredient,
    getAllIngredients,
    getAllIngredientsGroupedByCategory,
    getIngredientById,
    updateIngredient,
    deleteIngredient
} = require('../controllers/ingredients.controller');

const {
    createRecipe,
    updateRecipe,
    deleteRecipe,
    getRecipe,
    getAllRecipes,
    getAllRecipesByCategory,
    getRecipesByUser
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
    deleteCategory,
    getCategory,
    getAllCategories
} = require('../controllers/category.controller');

const {
    searchRecipes,
    searchSpecifiedRecipes
} = require('../controllers/search.controller');

const {
    viewHistory
} = require('../controllers/history.controller');


router.post('/signup',signup);
router.post('/login',login);
router.post('/update-user',authenticateToken,updateUser);
router.post('/delete-user',authenticateToken,deleteUser);
router.get('/get-user-details',getUserDetails)
router.get('/get-user',getUserById)


router.post('/create-recipe',authenticateToken,createRecipe);
router.get('/get-all-recipes', getAllRecipes);
router.get('/get-all-recipes-by-category', getAllRecipesByCategory);
router.get('/get-recipe', authenticateToken, getRecipe);
router.post('/update-recipe', updateRecipe);
router.post('/delete-recipe', authenticateToken, deleteRecipe);
router.get('/get-user-recipes', getRecipesByUser)

router.post('/create-ingredient', createIngredient);
router.get('/get-all-ingredients', getAllIngredients);
router.get('/get-all-ingredients-by-category', getAllIngredientsGroupedByCategory);
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
router.get('/get-category', getCategory);
router.get('/get-all-categories', getAllCategories);

router.post('/search-recipe',searchRecipes)
router.post('/search-specified-recipe',searchSpecifiedRecipes);

router.post('/view-history',authenticateToken,viewHistory);

module.exports = router;
