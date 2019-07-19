import * as actionTypes from 'store/actions/actionTypes'
import axios from 'axios'

export const authStart = () => ({
  type: actionTypes.AUTH_START
})

export const authSuccess = (token, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  payload: {
    idToken: token,
    userId
  }
})

export const authFailed = (error) => ({
  type: actionTypes.AUTH_FAILED,
  payload: {
    error: error
  }
})

export const auth = (email, password, isSignUp) => {
  return dispatch => {
    const authData = {
      email,
      password,
      returnSecureToken: true
    }

    let endpoint = isSignUp
      ? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC8Dj7x7yd6k65rq9ghjSEi-rn8W-iiIMQ'
      : 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC8Dj7x7yd6k65rq9ghjSEi-rn8W-iiIMQ'

    dispatch(authStart())
    axios.post(endpoint, authData)
      .then(response => {
        dispatch(authSuccess(response.data.idToken, response.data.localId))
      })
      .catch(error => {
        console.log(error.response.data)
        dispatch(authFailed(error.response.data.error.message))
      })
  }
}
