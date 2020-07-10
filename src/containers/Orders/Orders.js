import React, {useEffect} from 'react'
import axios from 'axios-orders'
import withErrorHandler from 'hoc/withErrorHandler/withErrorHandler'
import {connect} from 'react-redux'
import * as actions from 'store/actions'
import Order from 'components/Order/Order'
import Spinner from 'components/UI/Spinner/Spinner'

const Orders = ({onFetchOrders, loading, orders, token, userId}) => {
  useEffect(() => {
    onFetchOrders(token, userId)
  }, [onFetchOrders, token, userId])

  let orderListView = <Spinner />

  if (!loading) {
    orderListView = (
      <>
        {orders.map((order) => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={+order.price}
            customer={order.hasOwnProperty('orderData') ? order.orderData.name : ''}
          />
        ))}
      </>
    )
  }

  return orderListView
}

const mapStateToProps = (state) => ({
  orders: state.order.orders,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId,
})

const mapDispatchToProps = (dispatch) => ({
  onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios))
