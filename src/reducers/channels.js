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
const channels = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.channelSearch.request: {
      return Immutable(state).merge({
        fetching: true
      })
    }

    case actionTypes.channelSearch.success: {
      return Immutable(state).merge({
        all: action.payload,
        fetching: false,
      })
    }

    case actionTypes.channelSearch.error: {
      return Immutable(state).merge({
        error: action.error,
        fetching: false,
      })
    }

    case actionTypes.channelCreate.request: {
      return Immutable(state).merge({
      })
    }

    case actionTypes.channelCreate.success: {
      return Immutable(state).merge({
        all: _.uniqBy([...state.all, ...action.payload], data => data.id),
      })
    }

    case actionTypes.channelCreate.error: {
      return Immutable(state).merge({
        error: action.error,
      })
    }

    default: {
      return state
    }
  }
}

export default channels
