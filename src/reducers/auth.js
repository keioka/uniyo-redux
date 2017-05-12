import Immutable from 'seamless-immutable'
import { actionTypes } from '../actions'

const initialState = Immutable({
  fetching: false,
  currentUser: {},
  token: {},
  isLogin: false,
  isNewUser: false,
  isUploadingPicture: false,
  refreshingToken: false,
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

    case actionTypes.authClearError.request: {
      return Immutable(state).merge({
        error: {},
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
        isLogin: true,
        refreshingToken: false,
        token: {
          accessToken,
          expiresIn,
          refreshToken,
          tokenType,
        },
      })
    }

    case actionTypes.tokenRefresh.error: {
      return Immutable(state).merge({
        refreshingToken: false,
        error: action.error,
      })
    }

    case actionTypes.userPictureUpdate.request: {
      return Immutable(state).merge({
        isUploadingPicture: true,
      })
    }

    case actionTypes.userPictureUpdate.success: {
      return Immutable(state).merge({
        isUploadingPicture: false,
        currentUser: action.result.data,
      })
    }

    case actionTypes.currentUser.success: {
      return Immutable(state).merge({
        currentUser: action.result.data,
      })
    }

    case actionTypes.hashtagAdd.success: {
      return Immutable(state).merge({
        ...state,
        currentUser: {
          ...state.currentUser,
          hashtags: [...state.currentUser.hashtags, action.result.data],
        }
      })
    }

    case actionTypes.hashtagDelete.success: {
      return Immutable(state).merge({
        currentUser: {
          hashtags: action.result.data,
        }
      })
    }

    case actionTypes.hashtagsUser.success: {
      return Immutable(state).merge({
        currentUser: {
          hashtags: action.result.data,
        }
      })
    }

    default: {
      return state
    }
  }
}

export default auth
