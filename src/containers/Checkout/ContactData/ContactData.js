import React, { Component } from 'react'
import Button from 'components/UI/Button/Button'
import Spinner from 'components/UI/Spinner/Spinner'
import Input from 'components/UI/Input/Input'

import axios from 'axios-orders'
import classes from './ContactData.module.scss'
import { cloneDeep } from 'lodash'

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name',
        },
        value: '',
        validation: {
          required: true,
          valid: false
        },
        touched: false
      },
      postcode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Postcode',
        },
        value: '',
        validation: {
          required: true,
          valid: false,
          minLength: 6,
          maxLength: 6
        },
        touched: false
      },
      address: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        value: '',
        validation: {
          required: true,
          valid: false
        }
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
        },
        value: '',
        validation: {
          required: true,
          valid: false
        },
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your email address',
        },
        value: '',
        validation: {
          required: true,
          valid: false
        },
        touched: false
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
        value: 'fastest',
        validation: {
          required: false
        },
        touched: false
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

  static checkValidity (value, rules) {
    let isValid = []

    if (rules.required) {
      isValid.push(value.trim() !== '')
    }

    if (rules.minLength) {
      isValid.push(value.length >= rules.minLength)
    }

    if (rules.maxLength) {
      isValid.push(value.length <= rules.maxLength)
    }

    return !isValid.includes(false)
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true})

    const formData = {};

    for (let formElementId in this.state.orderForm) {
      if (this.state.orderForm.hasOwnProperty(formElementId)) {
        formData[formElementId] = this.state.orderForm[formElementId].value
      }
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData
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

  inputChangedHandler = (event, formElementId) => {
    const updatedOrderForm = cloneDeep(this.state.orderForm)
    updatedOrderForm[formElementId].value = event.target.value
    updatedOrderForm[formElementId].validation.valid = ContactData.checkValidity(event.target.value, updatedOrderForm[formElementId].validation)
    updatedOrderForm[formElementId].touched = true
    this.setState({orderForm: updatedOrderForm})
  }

  render () {
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
      <form onSubmit={this.orderHandler}>
        {formElements.map(formElement =>
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            {...(formElement.config.validation.required ? {valid: formElement.config.validation.valid} : undefined)}
            touched={formElement.config.touched}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
          />
        )}
        <Button btnType='success'>ORDER</Button>
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
