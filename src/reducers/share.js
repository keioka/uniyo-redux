import Immutable from 'seamless-immutable'
import { actionTypes } from '../actions'

const initialState = Immutable({
  post: {},
  error: {},
  fetching: false,
})

/**
 * Share reducer
 *
 * @param {object} [state={}]
 * @param {any} action
 */
const share = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.sharePostFetch.request:
      return Immutable(state).merge({
        fetching: true,
      })

    case actionTypes.sharePostFetch.success:
      return Immutable(state).merge({
        post: action.payload,
        fetching: false,
      })

    case actionTypes.sharePostFetch.error:
      return Immutable(state).merge({
        error: action.error,
        fetching: false,
      })

    default:
      return state
  }
}

export default share
