import React, {useState, useEffect} from 'react'

export default (httpClient) => {
  const [error, setError] = useState(null)

  // add interceptors before child components are rendered
  // clear the error at every new request
  const reqInterceptor = httpClient.interceptors.request.use((req) => {
    setError(null)
    return req
  })
  const resInterceptor = httpClient.interceptors.response.use(
    (res) => res,
    (err) => {
      setError(err)
    }
  )

  const errorConfirmedHandler = () => {
    setError(null)
  }

  useEffect(() => {
    // componentWillUnmount
    return () => {
      httpClient.interceptors.request.eject(reqInterceptor)
      httpClient.interceptors.response.eject(resInterceptor)
    }
  }, [reqInterceptor, resInterceptor]) // Only re-run the effect if count changes

  return [error, errorConfirmedHandler]
}
