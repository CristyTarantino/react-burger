import React, {Component} from 'react'

import Burger from 'components/Burger/Burger'
import BuildControlList from 'components/Burger/BuildControlList/BuildControlList'

import Modal from 'components/UI/Modal/Modal'
import Spinner from 'components/UI/Spinner/Spinner'
import OrderSummary from 'components/Burger/OrderSummary/OrderSummary'

import axios from 'axios-orders'
import withErrorHandler from 'hoc/withErrorHandler/withErrorHandler'

const INGREDIENTS_PRICE_LIST = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3
}

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 0,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    axios.get('ingredients.json')
      .then(response => {
        this.setState({ingredients: response.data})
      })
      .catch(error => this.setState({ error }))
  }

  updatePurchaseState = (undatedIngredients) => {
    this.setState(prevState => {
      const ingredients = {
        ...prevState.ingredients
      }

      const sum = Object.keys(ingredients).map(ingKey => {
        return ingredients[ingKey]
      }).reduce((sum, el) => {
        return sum + el;
      }, 0)

      return {
        purchasable: sum > 0
      }
    })
  }

  addIngredientHandler = (type) => {
    this.setState(prevState => {
      const oldCount = prevState.ingredients[type]

      const updateCounted = oldCount + 1

      const undatedIngredients = {
        ...prevState.ingredients
      }

      undatedIngredients[type] = updateCounted

      return {
        // this is to avoid situation where 0.4 + 0.2 = 0.6000000000000001
        // and then you get a -0.00 in the frontend
        totalPrice: +(prevState.totalPrice + INGREDIENTS_PRICE_LIST[type]).toFixed(2),
        ingredients: undatedIngredients
      }
    }, () => this.updatePurchaseState())
  }

  removeIngredientHandler = (type) => {
    this.setState(prevState => {
      const oldCount = prevState.ingredients[type]

      if (oldCount <= 0) {
        return {
          totalPrice: 0
        }
      }

      const updateCounted = oldCount - 1

      const undatedIngredients = {
        ...prevState.ingredients
      }

      undatedIngredients[type] = updateCounted

      console.log(prevState, prevState.totalPrice, INGREDIENTS_PRICE_LIST[type], type)
      return {
        // this is to avoid situation where 0.3 - 0.2 = 0.09999999999999998
        // and then you get a -0.00 in the frontend
        totalPrice: +(prevState.totalPrice - INGREDIENTS_PRICE_LIST[type]).toFixed(2),
        ingredients: undatedIngredients
      }
    }, () => this.updatePurchaseState());
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
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    }

    queryParams.push('price=' + this.state.totalPrice)

    const queryString = '?' + queryParams.join('&')

    this.props.history.push({
      pathname: '/checkout',
      search: queryString
    });
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    // e.g. { salad: true, meat: false, ...}

    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />

    if (this.state.ingredients) {
      burger = <>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControlList
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          total={this.state.totalPrice}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
        />
      </>

      orderSummary = <OrderSummary
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
      />
    }

    if (this.state.loading) {
      orderSummary = <Spinner/>
    }

    return (
      <>
        { burger }
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}>
          { orderSummary }
        </Modal>
      </>
    )
  }
}

export default withErrorHandler(BurgerBuilder, axios)
