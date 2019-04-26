import React, { useState } from 'react'

import Modal from 'components/UI/Modal/Modal'

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, setError] = useState(null)

    // add interceptors before child components are rendered
    // clear the error at every new request
    axios.interceptors.request.use(req => {
      setError(null)
      return req
    })
    axios.interceptors.response.use(res => res, error => {
      setError(error)
    })

    const errorConfirmedHandler = () => {
      setError(null)
    }

    return (
      <>
        <Modal
          show={error}
          modalClosed={errorConfirmedHandler}>
          <p>{ error ? error.message : null }</p>
        </Modal>
        <WrappedComponent {...props} />
      </>
    )
  }
}

export default withErrorHandler
