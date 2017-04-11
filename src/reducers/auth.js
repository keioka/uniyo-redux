import Immutable from 'seamless-immutable'
import { actionTypes } from '../actions'

const initialState = Immutable({
  fetching: false,
  currentUser: {},
  token: {},
  isLogin: false,
  isNewUser: false
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
      const { user, access_token, expires_in, refresh_token, token_type } = action.result.data
      return Immutable(state).merge({
        token: {
          accessToken: access_token,
          expiresIn: expires_in,
          refreshToken: refresh_token,
          tokenType: token_type
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
      const { user, access_token, expires_in, refresh_token, token_type } = action.result.data
      return Immutable(state).merge({
        token: {
          accessToken: access_token,
          expiresIn: expires_in,
          refreshToken: refresh_token,
          tokenType: token_type
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

    default: {
      return state
    }
  }
}

export default auth
