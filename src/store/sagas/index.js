import {takeEvery, all} from 'redux-saga/effects'
import {
  logoutSaga,
  checkAuthTimeoutSaga,
  authUserSaga,
  authCheckStateSaga,
} from 'store/sagas/auth'

import {initIngredients} from 'store/sagas/burgerBuilder'
import {purchaseBurger, fetchOrders} from 'store/sagas/order'
import * as actionTypes from 'store/actions/actionTypes'

export function* watchAuth() {
  yield all([
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_CHECK_TIMOUT, checkAuthTimeoutSaga),
    takeEvery(actionTypes.AUTH_USER, authUserSaga),
    takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
  ])
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredients)
}

export function* watchOrder() {
  yield all([
    takeEvery(actionTypes.PURCHASE_BURGER, purchaseBurger),
    takeEvery(actionTypes.FETCH_ORDERS, fetchOrders),
  ])
}
