import React, { Fragment } from 'react'
// @ts-ignore
import { Route } from 'vtex.my-account-commons/Router'

import Wrapper from './components/MyAccountProfile/Wrapper'

const MyAccountProfile = () => (
  <Fragment>
    <Route exact path='/my-profile' component={Wrapper} />
  </Fragment>
)

export default MyAccountProfile