import React, { useState, useEffect } from 'react'

import Modal from 'components/UI/Modal/Modal'

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, setError] = useState(null)

    useEffect(() => {
      // clear the error at every new request
      axios.interceptors.request.use(req => {
        setError(null)
        return req
      })
      axios.interceptors.response.use(res => res, error => {
        setError(error)
      })
    }, [error]) // Only re-run the effect if error changes

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
