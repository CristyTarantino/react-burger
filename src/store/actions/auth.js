import * as actionTypes from 'store/actions/actionTypes'
import axios from 'axios'

export const authStart = () => ({
  type: actionTypes.AUTH_START,
})

export const authSuccess = (token, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  payload: {
    idToken: token,
    userId,
  },
})

export const authFailed = (error) => ({
  type: actionTypes.AUTH_FAILED,
  payload: {
    error: error,
  },
})

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    payload: {
      path: path,
    },
  }
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('expirationDate')
  localStorage.removeItem('userId')
  return {
    type: actionTypes.AUTH_LOGOUT,
  }
}

export const checkAuthTimeout = (exporationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout())
    }, exporationTime * 1000)
  }
}

export const auth = (email, password, isSignUp) => {
  return (dispatch) => {
    const authData = {
      email,
      password,
      returnSecureToken: true,
    }

    const endpoint = isSignUp
      ? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC8Dj7x7yd6k65rq9ghjSEi-rn8W-iiIMQ'
      : 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC8Dj7x7yd6k65rq9ghjSEi-rn8W-iiIMQ'

    dispatch(authStart())
    axios
      .post(endpoint, authData)
      .then((response) => {
        const expiresIn = response.data.expiresIn
        const token = response.data.idToken
        const userId = response.data.localId
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
        localStorage.setItem('token', token)
        localStorage.setItem('expirationDate', expirationDate)
        localStorage.setItem('userId', userId)
        dispatch(authSuccess(token, userId))
        dispatch(checkAuthTimeout(expiresIn))
      })
      .catch((error) => {
        console.log(error.response.data)
        dispatch(authFailed(error.response.data.error.message))
      })
  }
}

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token')
    if (!token) {
      dispatch(logout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))

      // if expirationDate is in the future (so not now)
      if (expirationDate <= new Date()) {
        dispatch(logout())
      } else {
        const userId = localStorage.getItem('userId')
        dispatch(authSuccess(token, userId))
        dispatch(
          checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000)
        )
      }
    }
  }
}
