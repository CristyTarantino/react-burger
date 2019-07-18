import * as actionTypes from 'store/actions/actionTypes'
import axios from 'axios-orders'

const purchaseBurgerSuccess = (id, orderData) => ({
  type: actionTypes.PURCHASE_BURGER_SUCCESS,
  payload: {
    id: id,
    orderData: orderData
  }
})

const purchaseBurgerFailed = (error) => ({
  type: actionTypes.PURCHASE_BURGER_FAILED,
  payload: {
    error: error
  }
})

export const purchaseBurgerStart = () => ({
  type: actionTypes.PURCHASE_BURGER_START
})

export const purchaseBurger = (orderData) => {
  return dispatch => {
    dispatch(purchaseBurgerStart())
    axios.post('/orders.json', orderData)
      .then(response => {
        console.log(response.data.name)
        dispatch(purchaseBurgerSuccess(response.data, orderData))
      })
      .catch(error => {
        dispatch(purchaseBurgerFailed(error))
      })
  }
}

export const purchaseInit = () => ({
  type: actionTypes.PURCHASE_INIT
})

const fetchOrdersSuccess = (orders) => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  payload: {
    orders: orders
  }
})

const fetchOrdersFailed = (error) => ({
  type: actionTypes.FETCH_ORDERS_FAILED,
  payload: {
    error: error
  }
})

export const fetchOrdersStart = () => ({
  type: actionTypes.FETCH_ORDERS_START
})

export const fetchOrders = () => {
  return dispatch => {
    dispatch(fetchOrdersStart())
    axios.get('orders.json')
      .then(response => {
        const fetchedOrders = []
        for (let key in response.data) {
          if (response.data.hasOwnProperty(key)) {
            fetchedOrders.push({
              ...response.data[key],
              id: key
            })
          }
        }

        dispatch(fetchOrdersSuccess(fetchedOrders))
      })
      .catch(error => {
        dispatch(fetchOrdersFailed(error))
      })
  }
}

export const fetchOrdersInit = () => ({
  type: actionTypes.FETCH_ORDERS_INIT
})
