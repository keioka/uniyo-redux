import { actionTypes } from '../actions'

/**
 * Schools reducer
 *
 * @param {object} [state={}]
 * @param {any} action
 */
const schools = (state = {}, action) => {
  switch (action.type) {

    //
    // @igorlem
    //
    // not sure that we need this case, but anyway it'll stay there
    // until i realize I'm a total retard
    //
    case actionTypes.schoolsSearch.request:
      return {
        schools: {
          ...action.payload,
        },
      }

    case actionTypes.schoolsSearch.success:
      return {
        schools: {
          schoolsSearch: action.result,
        },
      }

    case actionTypes.schoolsSearch.error:
      return {
        schools: {
          errorData: action.error,
        },
      }

    default:
      return state
  }
}

export default schools
