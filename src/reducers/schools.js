import Immutable from 'seamless-immutable'
import { actionTypes } from '../actions'

const initialState = Immutable({
  data: [],
  error: {},
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
      return state

    case actionTypes.schoolsSearch.success:
      return Immutable(state).merge({
        data: action.data,
      })

    case actionTypes.schoolsSearch.error:
      return Immutable(state).merge({
        error: action.error,
      })

    default:
      return state
  }
}

export default schools
