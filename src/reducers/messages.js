import Immutable from 'seamless-immutable'
import { actionTypes } from '../actions'
import _ from 'lodash'
import moment from 'moment'

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
      const newMessages = _.uniqBy(Immutable.asMutable([...state.all, ...action.result.data], { deep: true }), data => data.id)
      newMessages.sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt))
      return Immutable(state).merge({
        all: newMessages,
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
      const newMessages = _.uniqBy(Immutable.asMutable([...state.all, action.result.data], { deep: true }), data => data.id)
      newMessages.sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt))
      return Immutable(state).merge({
        all: newMessages,
        fetching: false,
      })
    }

    case actionTypes.messageCreate.request: {
      return Immutable(state).merge({
      })
    }

    case actionTypes.messageCreate.success: {
      const newMessages = _.uniqBy(Immutable.asMutable([...state.all, action.result.data], { deep: true }), data => data.id)
      newMessages.sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt))
      return Immutable(state).merge({
        all: newMessages,
        fetching: false,
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
