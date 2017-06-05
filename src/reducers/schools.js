import Immutable from 'seamless-immutable'
import { actionTypes } from '../actions'

const initialState = Immutable({
  data: [],
  error: {},
  fetching: false,
})

/**
 * Schools reducer
 *
 * @param {object} [state={}]
 * @param {any} action
 */
const schools = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.schoolsSearch.request:
      return Immutable(state).merge({
        fetching: true,
      })

    case actionTypes.schoolsSearch.success:
      return Immutable(state).merge({
        data: action.data,
        fetching: false,
      })

    case actionTypes.schoolsSearch.error:
      return Immutable(state).merge({
        error: action.error,
        fetching: false,
      })

    case actionTypes.schoolInfo.request:
      return Immutable(state).merge({
        fetching: true,
      })

    case actionTypes.schoolInfo.success:
      return Immutable(state).merge({
        data: action.data,
        fetching: false,
      })

    case actionTypes.schoolInfo.error:
      return Immutable(state).merge({
        error: action.error,
        fetching: false,
      })

    default:
      return state
  }
}

export default schools
