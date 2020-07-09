import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import * as actions from 'store/actions'
import {Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'

const Logout = ({onLogout}) => {
  useEffect(() => {
    onLogout()
  }, [onLogout])

  return <Redirect to="/" />
}

const mapDispatchToProp = (dispatch) => ({
  onLogout: () => dispatch(actions.logout()),
})

export default connect(null, mapDispatchToProp)(Logout)

Logout.propTypes = {
  onLogout: PropTypes.func.isRequired,
}
