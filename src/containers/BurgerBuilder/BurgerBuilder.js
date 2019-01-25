import React, { Component } from 'react'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

const INGREDIENTS_PRICE_LIST = {
  salad: 0.5,
  cheese: 0.4,
  meet: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ingredients: {
        salad: 1,
        bacon: 1,
        cheese: 2,
        meat: 2
      },
      totalPrice: 4
    }
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
    undatedIngredients[type] = updateCounted;
    this.setState({
      totalPrice: newPrice,
      ingredients: undatedIngredients
    })
  }

  // addIngredientHandler = (type) => {}

  render () {
    return (
      <>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}/>
      </>
    )
  }
}

export default BurgerBuilder
