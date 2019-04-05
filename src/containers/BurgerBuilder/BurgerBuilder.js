import React, { Component } from 'react'

import Burger from '../../components/Burger/Burger'
import BuildControlList from '../../components/Burger/BuildControlList/BuildControlList'

import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENTS_PRICE_LIST = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 0,
    purchasable: false,
    purchasing: false
  }

  updatePurchaseState = (undatedIngredients) => {
    const ingredients = {
      ...undatedIngredients
    };

    const sum = Object.keys(ingredients).map(ingKey => {
      return ingredients[ingKey]
    }).reduce((sum, el) => {
      return sum + el;
    }, 0);

    this.setState({purchasable: sum > 0})
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type]
    const updateCounted = oldCount + 1;
    const undatedIngredients = {
      ...this.state.ingredients
    }
    const  priceAddition = INGREDIENTS_PRICE_LIST[type]
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice + priceAddition
    undatedIngredients[type] = updateCounted
    this.setState({
      totalPrice: newPrice,
      ingredients: undatedIngredients
    })

    this.updatePurchaseState(undatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type]

    if (oldCount <= 0) {
      return;
    }

    const updateCounted = oldCount - 1;
    const undatedIngredients = {
      ...this.state.ingredients
    }
    const  priceDeduction = INGREDIENTS_PRICE_LIST[type]
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice - priceDeduction
    undatedIngredients[type] = updateCounted
    this.setState({
      totalPrice: newPrice,
      ingredients: undatedIngredients
    })

    this.updatePurchaseState(undatedIngredients);
  }

  purchaseHandler = () => {
    this.setState({
      purchasing: true
    })
  }

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    })
  }

  purchaseContinueHandler = () => {
    alert('You continue!')
  }

  render () {
    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    // e.g. { salad: true, meat: false, ...}

    return (
      <>
        <Burger ingredients={this.state.ingredients} />
        <BuildControlList
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          total={this.state.totalPrice}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
        />
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}>
          <OrderSummary
            ingredients={this.state.ingredients}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
          />
        </Modal>
      </>
    )
  }
}

export default BurgerBuilder
