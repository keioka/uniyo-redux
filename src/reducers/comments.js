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

    // Used for new comment comming through webSocket
    case actionTypes.commentFetch.success: {
      return Immutable(state).merge({
        all: _.uniqBy([action.result.data, ...state.all], data => data.id),
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

    case actionTypes.commentReceivedDonutsFetch.success: {
      const { commentId, amount } = action.result.data

      const newComments = Immutable.asMutable([ ...state.all ], { deep: true })

      newComments.forEach(comment => {
        if (comment.id === commentId) {
          comment.donutsCount += amount
        }
      })

      return Immutable(state).merge({
        all: newComments,
      })
    }

    default: {
      return state
    }
  }
}

export default comments
