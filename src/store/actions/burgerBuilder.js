import * as actionTypes from 'store/actions/actionTypes'

export const addIngredient = (ingName) => ({
  type: actionTypes.ADD_INGREDIENT,
  payload: {
    ingredientName: ingName,
  },
})

export const removeIngredient = (ingName) => ({
  type: actionTypes.REMOVE_INGREDIENT,
  payload: {
    ingredientName: ingName,
  },
})

export const setIngredients = (ingredients) => ({
  type: actionTypes.SET_INGREDIENTS,
  payload: {
    ingredients: ingredients,
  },
})

export const fetchIngredientsFailed = () => ({
  type: actionTypes.FETCH_INGREDIENTS_FAILED,
})

export const initIngredients = () => ({
  type: actionTypes.INIT_INGREDIENTS,
})
