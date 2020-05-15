import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from 'store/actions'
import {Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'

class Logout extends Component {
  componentDidMount() {
    this.props.onLogout()
  }

  render() {
    return <Redirect to="/" />
  }
}

const mapDispatchToProp = (dispatch) => ({
  onLogout: () => dispatch(actions.logout()),
})

export default connect(null, mapDispatchToProp)(Logout)

Logout.propTypes = {
  onLogout: PropTypes.func.isRequired,
}
