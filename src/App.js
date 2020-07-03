import React, {Suspense, useEffect} from 'react'
import {Redirect, Route, Switch, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import Layout from 'hoc/Layout/Layout'
import BurgerBuilder from 'containers/BurgerBuilder/BurgerBuilder'
import Logout from 'containers/Auth/Logout/Logout'
import * as actions from './store/actions/index'

const Checkout = React.lazy(() => {
  return import('containers/Checkout/Checkout')
})

const Orders = React.lazy(() => {
  return import('containers/Orders/Orders')
})

const Auth = React.lazy(() => {
  return import('containers/Auth/Auth')
})

const App = (props) => {
  const {onTryAutoSignUp} = props

  useEffect(() => {
    onTryAutoSignUp()
  }, [onTryAutoSignUp])

  let routes = (
    <Switch>
      <Route path="/auth" render={() => <Auth />} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  )

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" render={() => <Checkout />} />
        <Route path="/orders" render={() => <Orders />} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" render={() => <Auth />} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    )
  }
  return (
    // React Fragment
    <>
      <Layout>
        {/* The lazy component should then be rendered inside a Suspense component,
            which allows us to show some fallback content (such as a loading indicator)
            while we’re waiting for the lazy component to load. */}
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  }
}

const mapDispatchToProps = (dispatch) => ({
  onTryAutoSignUp: () => dispatch(actions.authCheckState()),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
