var express = require('express');
var router = express.Router();
const {authenticateToken} = require('../middlewares/auth.middleware');

const {
    signup,
    login,
    updateUser,
    deleteUser,
    getUserLists,
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
    searchRecipes
} = require('../controllers/search.controller');

/*const {
    createList,
    getAllLists,
    getListById,
    updateList,
    deleteList
} = require('../controllers/list.controller');*/

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

router.get('/get-user-lists',authenticateToken,getUserLists);
router.post('/search-recipe',authenticateToken,searchRecipes);


module.exports = router;
