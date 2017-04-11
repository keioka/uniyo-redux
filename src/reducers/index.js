import { combineReducers } from 'redux'
import schools from './schools'
import auth from './auth'

export default combineReducers({
  schools,
  auth
  // more later
})
