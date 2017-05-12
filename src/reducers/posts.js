import Immutable from 'seamless-immutable'
import _ from 'lodash'
import { actionTypes } from '../actions'


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
const posts = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.postInfo.request: {
      return Immutable(state).merge({
        fetching: true,
      })
    }

    case actionTypes.postInfo.success: {
      return Immutable(state).merge({
        all: _.uniqBy([action.result.data, ...state.all], data => data.id),
        fetching: false,
      })
    }

    case actionTypes.postInfo.error: {
      return Immutable(state).merge({
        error: action.error,
        fetching: false,
      })
    }

    case actionTypes.postsSearch.request: {
      return Immutable(state).merge({
        fetching: true,
      })
    }

    case actionTypes.postsSearch.success: {
      return Immutable(state).merge({
        all: _.uniqBy([...state.all, ...action.result.data], data => data.id),
        fetching: false,
      })
    }

    case actionTypes.postsSearch.error: {
      return Immutable(state).merge({
        error: action.error,
        fetching: false,
      })
    }

    case actionTypes.postCreate.request: {
      return Immutable(state).merge({
      })
    }

    case actionTypes.postCreate.success: {
      return Immutable(state).merge({
        all: _.uniqBy([action.result.data, ...state.all], data => data.id),
      })
    }

    case actionTypes.postCreate.error: {
      return Immutable(state).merge({
        error: action.error,
      })
    }

    default: {
      return state
    }
  }
}

export default posts
