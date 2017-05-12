import Immutable from 'seamless-immutable'
import { actionTypes } from '../actions'
import _ from 'lodash'

const initialState = Immutable({
  all: [],
  error: {},
  fetching: false,
})

/**
 * message reducer
 *
 * @param {object} [state={}]
 * @param {any} action
 */
const messages = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.messageSearch.request: {
      return Immutable(state).merge({
        fetching: true
      })
    }

    case actionTypes.messageSearch.success: {
      return Immutable(state).merge({
        all: _.uniqBy([...state.all, ...action.result.data], data => data.id),
        fetching: false,
      })
    }

    case actionTypes.messageSearch.error: {
      return Immutable(state).merge({
        error: action.error,
        fetching: false,
      })
    }

    // Used for new message comming through webSocket
    case actionTypes.messageFetch.success: {
      return Immutable(state).merge({
        all: _.uniqBy([...state.all, action.result.data], data => data.id),
        fetching: false,
      })
    }

    case actionTypes.messageCreate.request: {
      return Immutable(state).merge({
      })
    }

    case actionTypes.messageCreate.success: {
      return Immutable(state).merge({
        all: _.uniqBy([...state.all, action.result.data], data => data.id),
      })
    }

    case actionTypes.messageCreate.error: {
      return Immutable(state).merge({
        error: action.error,
      })
    }

    default: {
      return state
    }
  }
}

export default messages
