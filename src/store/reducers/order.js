import * as actionTypes from 'store/actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
  orders: [],
  loading: false,
  purchased: false
}

const fetchOrderSuccess = (state, action) => {
  const updatedOrders = {
    orders: action.payload.orders,
    loading: false
  }
  return updateObject(state, updatedOrders)
}

const purchaseBurgerSuccess = (state, action) => {
  const newOrder = updateObject(action.payload.orderData, { id: action.payload.id })
  const updateSuccess = {
    orders: [...state.orders, newOrder],
    loading: false,
    purchased: true
  }
  return updateObject(state, updateSuccess)
}

const order = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ORDERS_START: return updateObject(state, { loading: true })
    case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrderSuccess(state, action)
    case actionTypes.FETCH_ORDERS_FAILED: return updateObject(state, { loading: false })
    case actionTypes.PURCHASE_INIT: return updateObject(state, { purchased: false })
    case actionTypes.PURCHASE_BURGER_START: return updateObject(state, { loading: true })
    case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action)
    case actionTypes.PURCHASE_BURGER_FAILED: return updateObject(state, { loading: false })
    default:
      return state
  }
}

export default order
