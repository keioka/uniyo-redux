import Immutable from 'seamless-immutable'
import { actionTypes } from '../actions'
import _ from 'lodash'

const initialState = Immutable({
  all: [],
  trending: [],
  error: {},
  fetching: false,
})

/**
 * Post reducer
 *
 * @param {object} [state={}]
 * @param {any} action
 */
const hashtags = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.hashtagSearch.request: {
      return Immutable(state).merge({
        fetching: true
      })
    }

    case actionTypes.hashtagSearch.success: {
      return Immutable(state).merge({
        all: action.result.data,
        fetching: true
      })
    }

    case actionTypes.hashtagSearch.error: {
      return Immutable(state).merge({
        all: [],
        fetching: true
      })
    }

    case actionTypes.hashtagTrendingSearch.request: {
      return Immutable(state).merge({
        fetching: true
      })
    }

    case actionTypes.hashtagTrendingSearch.success: {
      return Immutable(state).merge({
        trending: action.result.data,
        fetching: false,
      })
    }

    case actionTypes.hashtagTrendingSearch.error: {
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

export default hashtags
