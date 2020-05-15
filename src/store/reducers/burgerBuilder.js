import * as actionTypes from 'store/actions/actionTypes'
import {updateObject} from '../utility'

const initialState = {
  ingredients: null,
  totalPrice: 0,
  error: false,
}

const INGREDIENTS_PRICE_LIST = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
}

const addIngredient = (state, action) => {
  const addIngredient = {
    [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] + 1,
  }
  const addIngredients = updateObject(state.ingredients, addIngredient)
  const updatedAddState = {
    ingredients: addIngredients,
    totalPrice: state.totalPrice + INGREDIENTS_PRICE_LIST[action.payload.ingredientName],
  }
  return updateObject(state, updatedAddState)
}

const removeIngredient = (state, action) => {
  const removeIngredient = {
    [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] - 1,
  }
  const removeIngredients = updateObject(state.ingredients, removeIngredient)
  const updatedRemoveState = {
    ingredients: removeIngredients,
    totalPrice: state.totalPrice - INGREDIENTS_PRICE_LIST[action.payload.ingredientName],
  }
  return updateObject(state, updatedRemoveState)
}

const setIngredients = (state, action) => {
  const updatedState = {
    ingredients: action.payload.ingredients,
    totalPrice: 0,
    error: false,
  }
  return updateObject(state, updatedState)
}

const burgerBuilder = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action)
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action)
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action)
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, {error: true})
    default:
      return state
  }
}

export default burgerBuilder
