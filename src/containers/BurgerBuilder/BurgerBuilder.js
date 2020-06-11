import React, {Component} from 'react'
import {connect} from 'react-redux'

import Burger from 'components/Burger/Burger'
import BuildControlList from 'components/Burger/BuildControlList/BuildControlList'

import Modal from 'components/UI/Modal/Modal'
import Spinner from 'components/UI/Spinner/Spinner'
import OrderSummary from 'components/Burger/OrderSummary/OrderSummary'

import axios from 'axios-orders'
import withErrorHandler from 'hoc/withErrorHandler/withErrorHandler'

import * as actions from 'store/actions'

export class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  }

  componentDidMount() {
    this.props.onInitIngredients()
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey]
      })
      .reduce((sum, el) => {
        return sum + el
      }, 0)
    return sum > 0
  }

  purchaseHandler = () => {
    this.setState({
      purchasing: true,
    })
  }

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false,
    })
  }

  purchaseContinueHandler = () => {
    this.props.onInitPurchase()
    this.props.history.push('/checkout')
  }

  render() {
    const disabledInfo = {
      ...this.props.ings,
    }

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    // e.g. { salad: true, meat: false, ...}

    let orderSummary = null
    let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />

    if (this.props.ings) {
      burger = (
        <>
          <Burger ingredients={this.props.ings} />
          <BuildControlList
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            total={this.props.total}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
          />
        </>
      )

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          price={this.props.total}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      )
    }

    return (
      <>
        {burger}
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
      </>
    )
  }
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
