import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Layout from 'hoc/Layout/Layout'
import Orders from 'containers/Orders/Orders'
import BurgerBuilder from 'containers/BurgerBuilder/BurgerBuilder'
import Checkout from 'containers/Checkout/Checkout'
import Auth from 'containers/Auth/Auth'

const app = () => (
  // React.Fragment https://reactjs.org/docs/fragments.html
  <>
    <Layout>
      <Switch>
        <Route path='/checkout' component={Checkout} />
        <Route path='/orders' component={Orders} />
        <Route path='/auth' component={Auth} />
        <Route path='/' component={BurgerBuilder} />
      </Switch>
    </Layout>
  </>
)

export default app
