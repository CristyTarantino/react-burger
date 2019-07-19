import React, { Component } from 'react'
import Input from 'components/UI/Input/Input'
import Button from 'components/UI/Button/Button'
import Spinner from 'components/UI/Spinner/Spinner'
import {cloneDeep} from 'lodash';
import { Redirect } from 'react-router-dom'

import * as actions from 'store/actions'
import { connect } from 'react-redux'
import classes from './Auth.module.scss'

class Auth extends Component {
  state = {
    authForm: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your email address',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
          valid: false,
          errorMessage: 'Please enter a valid email address'
        },
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
        },
        value: '',
        validation: {
          required: true,
          // minLength: 6,
          valid: false,
          errorMessage: 'Please enter a valid email address'
        },
        touched: false
      }
    },
    isFormValid: false,
    isSignUp: true
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

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid.push(pattern.test(value))
    }

    return !isValid.includes(false)
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.authForm.email.value, this.state.authForm.password.value, this.state.isSignUp)
  }

  inputChangedHandler = (event, formElementId) => {
    const updatedAuthForm = cloneDeep(this.state.authForm)
    updatedAuthForm[formElementId].value = event.target.value
    updatedAuthForm[formElementId].validation.valid = Auth.checkValidity(event.target.value, updatedAuthForm[formElementId].validation)
    updatedAuthForm[formElementId].touched = true

    const isFormValid = []

    for (let inputId in updatedAuthForm) {
      if (updatedAuthForm.hasOwnProperty(inputId)) {
        isFormValid.push(updatedAuthForm[inputId].validation.valid)
      }
    }

    this.setState({authForm: updatedAuthForm, isFormValid: !isFormValid.includes(false) })
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => ({
        isSignUp: !prevState.isSignUp
      })
    )
  }

  render () {
    const formElementList = [];
    for (let key in this.state.authForm) {
      if (this.state.authForm.hasOwnProperty(key)) {
        formElementList.push({
          id: key,
          config: this.state.authForm[key]
        })
      }
    }

    let form = formElementList.map(formElementsArray =>
      <Input
        key={formElementsArray.id}
        elementType={formElementsArray.config.elementType}
        elementConfig={formElementsArray.config.elementConfig}
        value={formElementsArray.config.value}
        {...(formElementsArray.config.validation.required ? {valid: formElementsArray.config.validation.valid} : undefined)}
        {...(formElementsArray.config.validation.required ? {errorMessage: formElementsArray.config.validation.errorMessage} : undefined)}
        touched={formElementsArray.config.touched}
        changed={(event) => this.inputChangedHandler(event, formElementsArray.id)}
      />
    )

    if (this.props.loading) {
      form = <Spinner />
    }

    let errorMessage = null

    if (this.props.error) {
      errorMessage = (<p>{this.props.error}</p>)
    }

    let authRedirect = null

    if (this.props.isAuth) {
      authRedirect = <Redirect to='' />
    }

    return (
      <div className={classes.auth}>
        { authRedirect }
        { errorMessage }
        <form onSubmit={this.submitHandler}>
          { form }
          <Button btnType='success' disabled={!this.state.isFormValid}>SUBMIT</Button>
          <Button btnType='danger' clicked={this.switchAuthModeHandler}>{this.state.isSignUp ? 'SWITCH TO SIGN IN' : 'SIGN IN'}</Button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuth: state.auth.token !== null
})

const mapDispatchToProps = dispatch => ({
  onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth)

