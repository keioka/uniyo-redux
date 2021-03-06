import Immutable from 'seamless-immutable'
import { actionTypes } from '../actions'

const initialState = Immutable({
  fetching: false,
  currentUser: {
    donutsHistory: [],
  },
  token: {},
  isLogin: false,
  isNewUser: false,
  isUploadingPicture: false,
  isResetSuccess: null,
  isUpdateNewPasswordSuccess: null,
  isSuccessResendVerificationEmail: null,
  refreshingToken: false,
  error: {},
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
        currentUser: {
          ...user,
          donutsHistory: state.currentUser.donutsHistory,
        },
        isLogin: true,
        fetching: false,
        error: {}
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
        currentUser: {
          ...user,
          donutsHistory: state.currentUser.donutsHistory,
        },
        isLogin: true,
        isNewUser: true,
        fetching: false,
        error: {},
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
        isResetSuccess: false,
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

    case actionTypes.userPictureUpdate.error: {
      return Immutable(state).merge({
        isUploadingPicture: false,
        error: action.error.response.data.error,
      })
    }


    case actionTypes.currentUser.success: {
      return Immutable(state).merge({
        currentUser: {
          ...action.result.data,
          donutsHistory: state.currentUser.donutsHistory,
        },
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
      const hashtags = [...state.currentUser.hashtags]
      const index = hashtags.findIndex(hashtag => hashtag.hashtag == action.result.data.hashtag)
      if (index >= 0) {
        hashtags.splice(index, 1)
      }
      return Immutable(state).merge({
        ...state,
        currentUser: {
          ...state.currentUser,
          hashtags: [...hashtags],
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

    case actionTypes.userReceivedDonutsFetch.success: {
      const { fromUser } = action.result.data

      return Immutable(state).merge({
        ...state,
        currentUser: {
          ...state.currentUser,
          receivedDonutsCount: state.currentUser.receivedDonutsCount + 1,
          donutsHistory: [ { fromUser }, ...state.currentUser.donutsHistory ],
        }
      })
    }

    case actionTypes.userSpentDonutsFetch.success: {
      const { amount } = action.result.data

      return Immutable(state).merge({
        ...state,
        currentUser: {
          ...state.currentUser,
          availableDonutsCount: state.currentUser.availableDonutsCount - amount,
        }
      })
    }

    case actionTypes.currentUserDonuts.success: {
      const { data } = action.result
      return Immutable(state).merge({
        ...state,
        currentUser: {
          ...state.currentUser,
          donutsHistory: [...state.currentUser.donutsHistory, ...data],
        },
      })
    }

    case actionTypes.resetPassword.success: {
      return Immutable(state).merge({
        isResetSuccess: true,
      })
    }

    case actionTypes.resetPassword.error: {
      return Immutable(state).merge({
        isResetSuccess: false,
      })
    }

    case actionTypes.newPasswordUpdate.success: {
      return Immutable(state).merge({
        isUpdateNewPasswordSuccess: true,
      })
    }

    case actionTypes.newPasswordUpdate.error: {
      const { error } = action
      return Immutable(state).merge({
        isUpdateNewPasswordSuccess: false,
        error,
      })
    }

    case actionTypes.resendVerificationEmail.success: {
      return Immutable(state).merge({
        isSuccessResendVerificationEmail: true,
      })
    }

    case actionTypes.currentUserDonuts.request: {

    }

    case actionTypes.currentUserDonuts.error: {

    }

    default: {
      return state
    }
  }
}

export default auth
