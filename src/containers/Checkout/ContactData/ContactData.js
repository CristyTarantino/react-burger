import React, { Component } from 'react'
import Button from 'components/UI/Button/Button'
import Spinner from 'components/UI/Spinner/Spinner'
import Input from 'components/UI/Input/Input'

import axios from 'axios-orders'
import classes from './ContactData.module.scss'

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name',
        },
        value: ''
      },
      postcode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Postcode',
        },
        value: ''
      },
      address: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        value: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your email address',
        },
        value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {
              value: 'fastest',
              displayValue: 'Fastest'
            },
            {
              value: 'cheapest',
              displayValue: 'Cheapest'
            }
          ]
        },
        value: ''
      },
    },
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
    }

    axios.post('/orders.json', order)
      .then(response => {
        console.log(response)
        this.props.history.push('/');
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        this.setState({loading: false})
      })
  }

  render() {
    const formElements = [];
    for (let key in this.state.orderForm) {
      if (this.state.orderForm.hasOwnProperty(key)) {
        formElements.push({
          id: key,
          config: this.state.orderForm[key]
        })
      }
    }

    let form = (
      <form>
        {formElements.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.values}
          />
        ))}
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
