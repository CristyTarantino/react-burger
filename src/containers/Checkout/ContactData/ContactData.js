import React, { Component } from 'react'
import Button from 'components/UI/Button/Button'
import Spinner from 'components/UI/Spinner/Spinner'

import axios from 'axios-orders'
import classes from './ContactData.module.scss'

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postcode: ''
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true})

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: 'Cristina Tarantino',
        address: {
          postcode: 'OX?? ???',
          address: '123 Test Road'
        },
        email: 'cristina@tarantino.io'
      },
      deliveryMethod: 'fastest'
    }

    axios.post('/orders.json', order)
      .then(response => {
        console.log(response)
        this.props.history.push('/');
      })
      .catch(error => {
        console.log(error)
      })
      .then(() => {
        this.setState({loading: false})
      })
  }

  render() {
    let form = (
      <form>
        <input type='text' name='name' placeholder='Your Name' />
        <input type='text' name='email' placeholder='Your Mail' />
        <input type='text' name='street' placeholder='Street' />
        <input type='text' name='postcode' placeholder='Postcode' />
        <Button btnType='success' clicked={this.orderHandler}>ORDER</Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner/>
    }

    return (
      <div className={classes['contact-data']}>
        <h4>Enter your contact data</h4>
        { form }
      </div>
    )
  }
}

export default ContactData
