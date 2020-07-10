import {put, delay} from 'redux-saga/effects'
import * as actions from 'store/actions'
import axios from 'axios'

// REMINDER: dispatch = put

// generator - function that can be executed incrementally
export function* logoutSaga() {
  // yield - this step will execute and wait for it to finish
  yield localStorage.removeItem('token')
  yield localStorage.removeItem('expirationDate')
  yield localStorage.removeItem('userId')
  yield put(actions.logoutSuccess())
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.payload.expirationTime * 1000)
  yield put(actions.logout())
}

export function* authUserSaga(action) {
  yield put(actions.authStart())

  const authData = {
    email: action.payload.email,
    password: action.payload.password,
    returnSecureToken: true,
  }

  const endpoint = yield action.payload.isSignUp
    ? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC8Dj7x7yd6k65rq9ghjSEi-rn8W-iiIMQ'
    : 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC8Dj7x7yd6k65rq9ghjSEi-rn8W-iiIMQ'

  try {
    const response = yield axios.post(endpoint, authData)
    const expiresIn = yield response.data.expiresIn
    const token = yield response.data.idToken
    const userId = yield response.data.localId
    const expirationDate = yield new Date(new Date().getTime() + expiresIn * 1000)

    yield localStorage.setItem('token', token)
    yield localStorage.setItem('expirationDate', expirationDate)
    yield localStorage.setItem('userId', userId)

    yield put(actions.authSuccess(token, userId))
    yield put(actions.checkAuthTimeout(expiresIn))
  } catch (error) {
    yield put(actions.authFailed(error.response.data.error.message))
  }
}

export function* authCheckStateSaga() {
  const token = yield localStorage.getItem('token')
  if (!token) {
    yield put(actions.logout())
  } else {
    const expirationDate = yield new Date(localStorage.getItem('expirationDate'))

    // if expirationDate is in the future (so not now)
    if (expirationDate <= new Date()) {
      // logout as expiration Date is not valid
      yield put(actions.logout())
    } else {
      const userId = yield localStorage.getItem('userId')
      yield put(actions.authSuccess(token, userId))
      yield put(
        actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000)
      )
    }
  }
}
