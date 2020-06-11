import reducer from './auth'
import * as actionTypes from '../actions/actionTypes'

describe('auth reducer', () => {
  const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
  }

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should store the token upon login', () => {
    expect(
      reducer(initialState, {
        type: actionTypes.AUTH_SUCCESS,
        payload: {
          idToken: 'idTokenTest',
          userId: 'userIdTest',
        },
      })
    ).toEqual({
      token: 'idTokenTest',
      userId: 'userIdTest',
      error: null,
      loading: false,
    })
  })
})
