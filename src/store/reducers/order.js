import * as actionTypes from 'store/actions/actionTypes'

const initialState = {
  orders: [],
  loading: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
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
        loading: false
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

export default reducer
