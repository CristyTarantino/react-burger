import React, {Component} from 'react'
import axios from 'axios-orders'
import withErrorHandler from 'hoc/withErrorHandler/withErrorHandler'
import {connect} from 'react-redux'
import * as actions from 'store/actions'
import Order from 'components/Order/Order'
import Spinner from 'components/UI/Spinner/Spinner'

class Orders extends Component {

  componentDidMount() {
    this.props.onFetchOrders()
  }

  render() {
    let orders = <Spinner/>
    if (!this.props.loading) {
      orders = <>
        {this.props.orders.map(order =>
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={+order.price}
            customer={order.hasOwnProperty('orderData') ? order.orderData.name : ''}
          />)}
      </>
    }

    return orders
  }
}

const mapStateToProps = state => ({
  orders: state.order.orders,
  loading: state.order.loading
})

const mapDispatchToProps = dispatch => ({
  onFetchOrders: () => dispatch(actions.fetchOrders())
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))
