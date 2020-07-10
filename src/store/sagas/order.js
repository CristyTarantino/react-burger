import {put} from 'redux-saga/effects'
import * as actions from 'store/actions'
import axios from 'axios-orders'

export function* purchaseBurger(action) {
  yield put(actions.purchaseBurgerStart())

  try {
    const response = yield axios.post(`/orders.json`, action.payload.orderData)
    yield put(actions.purchaseBurgerSuccess(response.data, action.payload.orderData))
  } catch (error) {
    yield put(actions.purchaseBurgerFailed(error))
  }
}

export function* fetchOrders(action) {
  try {
    yield put(actions.fetchOrdersStart())
    const queryParams = yield `?auth=${action.payload.token}&orderBy="userId"&equalTo="${action.payload.userId}"`
    const response = yield axios.get(`orders.json${queryParams}`)
    const fetchedOrders = []
    for (const key in response.data) {
      if (response.data.hasOwnProperty(key)) {
        fetchedOrders.push({
          ...response.data[key],
          id: key,
        })
      }
    }

    yield put(actions.fetchOrdersSuccess(fetchedOrders))
  } catch (error) {
    yield put(actions.fetchOrdersFailed(error))
  }
}
