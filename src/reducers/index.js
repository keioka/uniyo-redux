import { combineReducers } from 'redux'
import schools from './schools'
import auth from './auth'
import users from './users'
import posts from './posts'
import comments from './comments'

export default combineReducers({
  schools,
  auth,
  users,
  posts,
  comments,
  // more later
})
