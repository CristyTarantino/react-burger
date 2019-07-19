import * as actionTypes from 'store/actions/actionTypes'
import axios from 'axios'

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
    const authData = {
      email,
      password,
      returnSecureToken: true
    }
    console.log(authData)
    axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC8Dj7x7yd6k65rq9ghjSEi-rn8W-iiIMQ', authData)
      .then(response => {
        console.log(response)
        dispatch(authSuccess(response.data))
      })
      .catch(error => {
        console.log(error)
        dispatch(authFailed(error))
      })
  }
}
