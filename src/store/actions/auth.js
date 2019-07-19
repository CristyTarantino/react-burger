import * as actionTypes from 'store/actions/actionTypes'
import axios from 'axios-orders'

export const authStart = () => ({
  type: actionTypes.AUTH_START
})

export const authSuccess = (authData) => ({
  type: actionTypes.AUTH_SUCCESS,
  payload: authData
})

export const authFailed = (error) => ({
  type: actionTypes.AUTH_FAILED,
  payload: {
    error: error
  }
})

export const auth = (email, password) => {
  return dispatch => {
    axios.get('ingredients.json')
      .then(response => {
        dispatch(authStart())
      })
      .catch(error => {
        dispatch(authFailed(error))
      })
  }
}
