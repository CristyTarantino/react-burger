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
        console.log(response.data)
        dispatch(purchaseBurgerSuccess(response.data, orderData))
      })
      .catch(error => {
        dispatch(purchaseBurgerFailed(error))
      })
  }
}
