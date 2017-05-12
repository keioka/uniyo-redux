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
const answers = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.answerSearch.request: {
      return Immutable(state).merge({
        fetching: true
      })
    }

    case actionTypes.answerSearch.success: {
      return Immutable(state).merge({
        all: _.uniqBy([...state.all, ...action.result.data], data => data.id),
        fetching: false,
      })
    }

    case actionTypes.answerSearch.error: {
      return Immutable(state).merge({
        error: action.error,
        fetching: false,
      })
    }

    case actionTypes.answerCreate.request: {
      return Immutable(state).merge({
        fetching: true
      })
    }

    case actionTypes.answerCreate.success: {
      return Immutable(state).merge({
        all: _.uniqBy([...state.all, action.result.data], data => data.id),
        fetching: false,
      })
    }

    case actionTypes.answerCreate.error: {
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

export default answers
