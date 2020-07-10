import * as actionTypes from 'store/actions/actionTypes'

export const purchaseBurgerSuccess = (id, orderData) => ({
  type: actionTypes.PURCHASE_BURGER_SUCCESS,
  payload: {
    id: id,
    orderData: orderData,
  },
})

export const purchaseBurgerFailed = (error) => ({
  type: actionTypes.PURCHASE_BURGER_FAILED,
  payload: {
    error: error,
  },
})

export const purchaseBurgerStart = () => ({
  type: actionTypes.PURCHASE_BURGER_START,
})

export const purchaseBurger = (orderData) => ({
  type: actionTypes.PURCHASE_BURGER,
  payload: {
    orderData: orderData,
  },
})

export const purchaseInit = () => ({
  type: actionTypes.PURCHASE_INIT,
})

export const fetchOrdersSuccess = (orders) => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  payload: {
    orders: orders,
  },
})

export const fetchOrdersFailed = (error) => ({
  type: actionTypes.FETCH_ORDERS_FAILED,
  payload: {
    error: error,
  },
})

export const fetchOrdersStart = () => ({
  type: actionTypes.FETCH_ORDERS_START,
})

export const fetchOrders = (token, userId) => ({
  type: actionTypes.FETCH_ORDERS,
  payload: {
    token: token,
    userId: userId,
  },
})
