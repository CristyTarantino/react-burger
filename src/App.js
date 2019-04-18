import React from 'react'

import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'

const app = () => (
  // React.Fragment https://reactjs.org/docs/fragments.html
  <>
    <Layout>
      <BurgerBuilder />
    </Layout>
  </>
)

export default app
