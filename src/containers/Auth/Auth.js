import React, {useState, useEffect} from 'react'
import Input from 'components/UI/Input/Input'
import Button from 'components/UI/Button/Button'
import Spinner from 'components/UI/Spinner/Spinner'
import {cloneDeep} from 'lodash'
import {Redirect} from 'react-router-dom'

import * as actions from 'store/actions'
import {connect} from 'react-redux'
import classes from './Auth.module.scss'

const checkValidity = (value, rules) => {
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
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    isValid.push(pattern.test(value))
  }

  return !isValid.includes(false)
}

const Auth = ({
  onAuth,
  loading,
  error,
  isAuth,
  buildingBurger,
  authRedirectPath,
  onSetAuthRedirectPath,
}) => {
  const [authForm, setAuthForm] = useState({
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
        errorMessage: 'Please enter a valid email address',
      },
      touched: false,
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
        errorMessage: 'Please enter a valid email address',
      },
      touched: false,
    },
  })
  const [isFormValid, setIsFormValid] = useState(false)
  const [isSignUp, setIsSignUp] = useState(true)

  useEffect(() => {
    if (!buildingBurger && authRedirectPath !== '/') {
      onSetAuthRedirectPath()
    }
  }, [])

  const inputChangedHandler = (event, formElementId) => {
    const updatedAuthForm = cloneDeep(authForm)
    updatedAuthForm[formElementId].value = event.target.value
    updatedAuthForm[formElementId].validation.valid = checkValidity(
      event.target.value,
      updatedAuthForm[formElementId].validation
    )
    updatedAuthForm[formElementId].touched = true

    const isFormValid = []

    for (let inputId in updatedAuthForm) {
      if (updatedAuthForm.hasOwnProperty(inputId)) {
        isFormValid.push(updatedAuthForm[inputId].validation.valid)
      }
    }

    setAuthForm(updatedAuthForm)
    setIsFormValid(!isFormValid.includes(false))
  }

  const submitHandler = (event) => {
    event.preventDefault()
    onAuth(authForm.email.value, authForm.password.value, isSignUp)
  }

  const switchAuthModeHandler = () => {
    setIsSignUp(!isSignUp)
  }

  const formElementList = []
  for (let key in authForm) {
    if (authForm.hasOwnProperty(key)) {
      formElementList.push({
        id: key,
        config: authForm[key],
      })
    }
  }

  let form = formElementList.map((formElementsArray) => (
    <Input
      key={formElementsArray.id}
      elementType={formElementsArray.config.elementType}
      elementConfig={formElementsArray.config.elementConfig}
      value={formElementsArray.config.value}
      {...(formElementsArray.config.validation.required
        ? {valid: formElementsArray.config.validation.valid}
        : undefined)}
      {...(formElementsArray.config.validation.required
        ? {errorMessage: formElementsArray.config.validation.errorMessage}
        : undefined)}
      touched={formElementsArray.config.touched}
      changed={(event) => inputChangedHandler(event, formElementsArray.id)}
    />
  ))

  if (loading) {
    form = <Spinner />
  }

  let errorMessage = null

  if (error) {
    errorMessage = <p>{error}</p>
  }

  let authRedirect = null

  if (isAuth) {
    authRedirect = <Redirect to={authRedirectPath} />
  }

  return (
    <div className={classes.auth}>
      {authRedirect}
      {errorMessage}
      <form onSubmit={submitHandler}>
        {form}
        <Button btnType="success" disabled={!isFormValid}>
          SUBMIT
        </Button>
        <Button btnType="danger" clicked={switchAuthModeHandler}>
          SWITCH TO {isSignUp ? 'SIGN IN' : 'SIGN UP'}
        </Button>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuth: state.auth.token !== null,
})

const mapDispatchToProps = (dispatch) => ({
  onAuth: (email, password, isSignUp) =>
    dispatch(actions.auth(email, password, isSignUp)),
  onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
