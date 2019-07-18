import * as actionTypes from 'store/actions/actionTypes'

const initialState = {
  orders: [],
  loading: false,
  purchased: false
}

const order = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ORDERS_START:
      return {
        ...state,
        loading: true
      }
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload.orders,
        loading: false
      }
    case actionTypes.FETCH_ORDERS_FAILED:
      return {
        ...state,
        loading: false
      }
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false
      }
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true
      }
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        id: action.payload.id,
        ...action.payload.orderData
      }
      return {
        ...state,
        orders: [...state.orders, newOrder],
        loading: false,
        purchased: true
      }
    case actionTypes.PURCHASE_BURGER_FAILED:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}

export default order
