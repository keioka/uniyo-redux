import Immutable from 'seamless-immutable'
import { actionTypes } from '../actions'

const initialState = Immutable({
  fetching: false,
  currentUser: {}
})

/**
 * Auth reducer
 *
 * @param {object} [state={}]
 * @param {any} action
 */
const auth = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.logIn.request:
      return Immutable(state).merge({
        fetching: true
      })

    case actionTypes.logIn.success:
      return Immutable(state).merge({
        currentUser: action.data,
        fetching: false,
      })

    case actionTypes.logIn.error:
      return Immutable(state).merge({
        error: action.error,
        fetching: false,
      })

    default:
      return state
  }
}

export default auth
