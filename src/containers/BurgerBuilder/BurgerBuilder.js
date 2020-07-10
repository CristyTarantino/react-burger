import React, {useState, useEffect, useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import Burger from 'components/Burger/Burger'
import BuildControlList from 'components/Burger/BuildControlList/BuildControlList'

import Modal from 'components/UI/Modal/Modal'
import Spinner from 'components/UI/Spinner/Spinner'
import OrderSummary from 'components/Burger/OrderSummary/OrderSummary'

import axios from 'axios-orders'
import withErrorHandler from 'hoc/withErrorHandler/withErrorHandler'

import * as actions from 'store/actions'

const BurgerBuilder = ({history}) => {
  const [isPurchasing, setIsPurchasing] = useState(false)

  const dispatch = useDispatch()

  const ings = useSelector((state) => state.burgerBuilder.ingredients)
  const total = useSelector((state) => state.burgerBuilder.totalPrice)
  const error = useSelector((state) => state.burgerBuilder.error)
  const isAuthenticated = useSelector((state) => state.auth.token !== null)

  const onIngredientAdded = (ingName) => dispatch(actions.addIngredient(ingName))
  const onIngredientRemoved = (ingName) => dispatch(actions.removeIngredient(ingName))
  const onInitPurchase = () => dispatch(actions.purchaseInit())
  const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path))

  // avoid recreating the onInitIngredients at every component reload creating an infinite look
  const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), [
    dispatch,
  ])

  useEffect(() => {
    onInitIngredients()
  }, [onInitIngredients])

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey]
      })
      .reduce((sum, el) => {
        return sum + el
      }, 0)
    return sum > 0
  }

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setIsPurchasing(true)
    } else {
      onSetAuthRedirectPath('/checkout')
      history.push('/auth')
    }
  }

  const purchaseCancelHandler = () => {
    setIsPurchasing(false)
  }

  const purchaseContinueHandler = () => {
    onInitPurchase()
    history.push('/checkout')
  }

  const disabledInfo = {
    ...ings,
  }

  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0
  }
  // e.g. { salad: true, meat: false, ...}

  let orderSummary = null
  let burger = error ? <p>Ingredients can't be loaded!</p> : <Spinner />

  if (ings) {
    burger = (
      <>
        <Burger ingredients={ings} />
        <BuildControlList
          ingredientAdded={onIngredientAdded}
          ingredientRemoved={onIngredientRemoved}
          disabled={disabledInfo}
          total={total}
          purchasable={updatePurchaseState(ings)}
          ordered={purchaseHandler}
          isAuth={isAuthenticated}
        />
      </>
    )

    orderSummary = (
      <OrderSummary
        ingredients={ings}
        price={total}
        purchaseCancelled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
      />
    )
  }

  return (
    <>
      {burger}
      <Modal show={isPurchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
    </>
  )
}

export default withErrorHandler(BurgerBuilder, axios)
