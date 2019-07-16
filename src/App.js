import React from 'react'

import Layout from 'hoc/Layout/Layout'
import BurgerBuilder from 'containers/BurgerBuilder/BurgerBuilder'
import Checkout from 'containers/Checkout/Checkout'

const app = () => (
  // React.Fragment https://reactjs.org/docs/fragments.html
  <>
    <Layout>
      <BurgerBuilder />
      <Checkout />
    </Layout>
  </>
)

export default app
