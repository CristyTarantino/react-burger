import React, { useState, useEffect } from 'react'

import Modal from 'components/UI/Modal/Modal'

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, setError] = useState(null)

    // add interceptors before child components are rendered
    // clear the error at every new request
    const reqInterceptor = axios.interceptors.request.use(req => {
      setError(null)
      return req
    })
    const resInterceptor = axios.interceptors.response.use(res => res, error => {
      setError(error)
    })

    const errorConfirmedHandler = () => {
      setError(null)
    }

    useEffect(() => {
      // componentWillUnmount
      return () => {
        axios.interceptors.request.eject(reqInterceptor)
        axios.interceptors.response.eject(resInterceptor)
      }
    }, [error, reqInterceptor, resInterceptor]) // Only re-run the effect if count changes

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
