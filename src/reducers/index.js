import { combineReducers } from 'redux'
import schools from './schools'
import auth from './auth'
import post from './post'

export default combineReducers({
  schools,
  auth,
  post,
  // more later
})
