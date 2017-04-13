import Immutable from 'seamless-immutable'
import { actionTypes } from '../actions'

const initialState = Immutable({
  fetching: false,
  currentUser: {},
  token: {},
  isLogin: false,
  isNewUser: false,
  refreshingToken: false
})

/**
 * Auth reducer
 *
 * @param {object} [state={}]
 * @param {any} action
 */
const auth = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.logIn.request: {
      return Immutable(state).merge({
        fetching: true
      })
    }

    case actionTypes.logIn.success: {
      const { user, accessToken, expiresIn, refreshToken, tokenType } = action.result.data
      return Immutable(state).merge({
        token: {
          accessToken,
          expiresIn,
          refreshToken,
          tokenType,
        },
        currentUser: user,
        isLogin: true,
        fetching: false,
      })
    }

    case actionTypes.logIn.error: {
      return Immutable(state).merge({
        error: action.error,
        fetching: false,
      })
    }

    case actionTypes.userCreate.request: {
      return Immutable(state).merge({
        fetching: true
      })
    }

    case actionTypes.userCreate.success: {
      const { user, accessToken, expiresIn, refreshToken, tokenType } = action.result.data
      return Immutable(state).merge({
        token: {
          accessToken,
          expiresIn,
          refreshToken,
          tokenType,
        },
        currentUser: user,
        isLogin: true,
        isNewUser: true,
        fetching: false,
      })
    }

    case actionTypes.userCreate.error: {
      return Immutable(state).merge({
        error: action.error,
        fetching: false,
      })
    }

    case actionTypes.tokenRefresh.request: {
      return Immutable(state).merge({
        refreshingToken: true
      })
    }

    case actionTypes.tokenRefresh.success: {
      const { accessToken, expiresIn, refreshToken, tokenType } = action.result.data
      return Immutable(state).merge({
        refreshingToken: false,
        token: {
          accessToken,
          expiresIn,
          refreshToken,
          tokenType,
        }
      })
    }

    case actionTypes.tokenRefresh.error: {
      return Immutable(state).merge({
        refreshingToken: false,
        error: action.error,
      })
    }

    default: {
      return state
    }
  }
}

export default auth
