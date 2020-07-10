import {takeEvery} from 'redux-saga/effects'
import {
  logoutSaga,
  checkAuthTimeoutSaga,
  authUserSaga,
  authCheckStateSaga,
} from 'store/sagas/auth'
import * as actionTypes from 'store/actions/actionTypes'

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga)
  yield takeEvery(actionTypes.AUTH_CHECK_TIMOUT, checkAuthTimeoutSaga)
  yield takeEvery(actionTypes.AUTH_USER, authUserSaga)
  yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
}