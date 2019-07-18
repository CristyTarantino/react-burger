import * as actionTypes from 'store/actions/actionTypes'
import axios from 'axios-orders'

export const addIngredient = (ingName) => ({
  type: actionTypes.ADD_INGREDIENT,
  payload: {
    ingredientName: ingName
  }
})

export const removeIngredient = (ingName) => ({
  type: actionTypes.REMOVE_INGREDIENT,
  payload: {
    ingredientName: ingName
  }
})

const setIngredients = (ingredients) => ({
  type: actionTypes.SET_INGREDIENTS,
  payload: {
    ingredients: ingredients
  }
})

const fetchIngredientsFailed = () => ({
  type: actionTypes.FETCH_INGREDIENTS_FAILED
})

export const initIngredients = () => {
  return dispatch => {
    axios.get('ingredients.json')
      .then(response => {
        dispatch(setIngredients(response.data))
      })
      .catch(error => {
        dispatch(fetchIngredientsFailed())
      })
  }
}
