import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'

import Burger from 'components/Burger/Burger'
import BuildControlList from 'components/Burger/BuildControlList/BuildControlList'

import Modal from 'components/UI/Modal/Modal'
import Spinner from 'components/UI/Spinner/Spinner'
import OrderSummary from 'components/Burger/OrderSummary/OrderSummary'

import axios from 'axios-orders'
import withErrorHandler from 'hoc/withErrorHandler/withErrorHandler'

import * as actions from 'store/actions'

const BurgerBuilder = ({
  ings,
  total,
  error,
  onInitIngredients,
  onIngredientAdded,
  onIngredientRemoved,
  onInitPurchase,
  history,
}) => {
  const [isPurchasing, setIsPurchasing] = useState(false)

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
    setIsPurchasing(true)
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

const mapStateToProps = (state) => ({
  ings: state.burgerBuilder.ingredients,
  total: state.burgerBuilder.totalPrice,
  error: state.burgerBuilder.error,
})

const mapDispatchToProps = (dispatch) => ({
  onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
  onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
  onInitIngredients: () => dispatch(actions.initIngredients()),
  onInitPurchase: () => dispatch(actions.purchaseInit()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios))
