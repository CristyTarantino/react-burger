import React, { Component } from 'react'
import axios from 'axios-orders'
import withErrorHandler from 'hoc/withErrorHandler/withErrorHandler'

import Order from 'components/Order/Order'

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  }

  componentDidMount() {
    axios.get('orders.json')
      .then(res => {
        const fetchedOrders = [];
        for (let key in res.data) {
          if (res.data.hasOwnProperty(key)) {
            fetchedOrders.push({
              ...res.data[key],
              id: key
            })
          }
        }

        this.setState({orders: fetchedOrders})
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        this.setState({loading: false})
      })
  }

  render () {
    return (
      <div>
        <Order />
        <Order />
      </div>
    )
  }
}

export default withErrorHandler(Orders, axios)
