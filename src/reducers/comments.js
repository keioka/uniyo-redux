import Immutable from 'seamless-immutable'
import { actionTypes } from '../actions'
import _ from 'lodash'

const initialState = Immutable({
  all: [],
  error: {},
  fetching: false,
})

/**
 * Post reducer
 *
 * @param {object} [state={}]
 * @param {any} action
 */
const comments = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.commentsSearch.request: {
      return Immutable(state).merge({
        fetching: true
      })
    }

    case actionTypes.commentsSearch.success: {
      return Immutable(state).merge({
        all: _.uniqBy([...state.all, ...action.result.data], data => data.id),
        fetching: false,
      })
    }

    case actionTypes.commentsSearch.error: {
      return Immutable(state).merge({
        error: action.error,
        fetching: false,
      })
    }

    case actionTypes.commentCreate.request: {
      return Immutable(state).merge({
      })
    }

    case actionTypes.commentCreate.success: {
      return Immutable(state).merge({
        all: _.uniqBy([...state.all, action.result.data], data => data.id),
      })
    }

    case actionTypes.commentCreate.error: {
      return Immutable(state).merge({
        error: action.error,
      })
    }

    default: {
      return state
    }
  }
}

export default comments
