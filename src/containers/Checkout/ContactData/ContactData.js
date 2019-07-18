import React, { Component } from 'react'
import Button from 'components/UI/Button/Button'
import Spinner from 'components/UI/Spinner/Spinner'
import Input from 'components/UI/Input/Input'

import { connect } from 'react-redux'

import axios from 'axios-orders'
import widthErrorHandler from 'hoc/withErrorHandler/withErrorHandler'
import classes from './ContactData.module.scss'
import * as orderActions from 'store/actions'

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
          valid: false,
          errorMessage: 'Please enter a valid Name'
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
          minLength: 5,
          maxLength: 8,
          errorMessage: 'Please enter a valid Postcode'
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
          valid: false,
          errorMessage: 'Please enter a valid Street'
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
          valid: false,
          errorMessage: 'Please enter a valid Country'
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
          valid: false,
          errorMessage: 'Please enter a valid email address'
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
      }
    },
    isFormValid: false
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

    const formData = {};

    for (let formElementId in this.state.orderForm) {
      if (this.state.orderForm.hasOwnProperty(formElementId)) {
        formData[formElementId] = this.state.orderForm[formElementId].value
      }
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.total,
      orderData: formData
    }

    this.props.onOrderBurger(order)

  }

  inputChangedHandler = (event, formElementId) => {
    const updatedOrderForm = cloneDeep(this.state.orderForm)
    updatedOrderForm[formElementId].value = event.target.value
    updatedOrderForm[formElementId].validation.valid = ContactData.checkValidity(event.target.value, updatedOrderForm[formElementId].validation)
    updatedOrderForm[formElementId].touched = true

    const isFormValid = []

    for (let inputId in updatedOrderForm) {
      if (updatedOrderForm.hasOwnProperty(inputId)) {
        isFormValid.push(updatedOrderForm[inputId].validation.valid)
      }
    }

    this.setState({orderForm: updatedOrderForm, isFormValid: !isFormValid.includes(false) })
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
            {...(formElement.config.validation.required ? {errorMessage: formElement.config.validation.errorMessage} : undefined)}
            touched={formElement.config.touched}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
          />
        )}
        <Button btnType='success' disabled={!this.state.isFormValid}>ORDER</Button>
      </form>
    );

    if (this.props.loading) {
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

const mapStateToProps = state => ({
  ings: state.ingredients,
  total: state.totalPrice,
  loading: state.loading
})

const mapDispatchToProps = dispatch => ({
  onOrderBurger: (orderData) => dispatch(orderActions.purchaseBurger(orderData))
})

export default connect(mapStateToProps, mapDispatchToProps)(widthErrorHandler(ContactData, axios))

// Useful Resources & Links
// Validate.js (you may import its functionality into your React projects): https://validatejs.org/
//   Get more ideas about potential validation approaches: https://react.rocks/tag/Validation
//   Alternatives to the manual approach taken in this course:
//
//   react-validation package: https://www.npmjs.com/package/react-validation
//   formsy-react package: https://github.com/christianalfoni/formsy-react
