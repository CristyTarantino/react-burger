import * as actionTypes from 'store/actions/actionTypes'

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
  return {
    type: actionTypes.AUTH_INITIATE_LOGOUT,
  }
}

export const logoutSuccess = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  }
}

export const checkAuthTimeout = (expirationTime) => {
  return {
    type: actionTypes.AUTH_CHECK_TIMOUT,
    payload: {
      expirationTime: expirationTime,
    },
  }
}

export const auth = (email, password, isSignUp) => {
  return {
    type: actionTypes.AUTH_USER,
    payload: {
      email: email,
      password: password,
      isSignUp: isSignUp,
    },
  }
}

export const authCheckState = () => {
  return {
    type: actionTypes.AUTH_CHECK_STATE,
  }
}
