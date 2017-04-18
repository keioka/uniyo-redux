import Immutable from 'seamless-immutable'
import { actionTypes } from '../actions'

const initialState = Immutable({
  all: [],
  error: {},
})

/**
 * Post reducer
 *
 * @param {object} [state={}]
 * @param {any} action
 */
const post = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.postsSearch.request: {
      return Immutable(state).merge({
        fetching: true
      })
    }

    case actionTypes.postsSearch.success: {
      return Immutable(state).merge({
        all: [...state.all, ...action.result.data],
        fetching: false,
      })
    }

    case actionTypes.postsSearch.error: {
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

export default post
