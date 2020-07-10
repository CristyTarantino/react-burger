import {put} from 'redux-saga/effects'
import * as actions from 'store/actions'
import axios from 'axios-orders'

export function* initIngredients() {
  try {
    const response = yield axios.get('ingredients.json')
    yield put(actions.setIngredients(response.data))
  } catch (error) {
    yield put(actions.fetchIngredientsFailed())
  }
}
