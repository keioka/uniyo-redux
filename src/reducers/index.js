import { combineReducers } from 'redux'
import schools from './schools'
import auth from './auth'
import users from './users'
import posts from './posts'
import comments from './comments'
import channels from './channels'
import messages from './messages'
import hashtags from './hashtags'
import answers from './answers'

export default combineReducers({
  schools,
  auth,
  users,
  posts,
  comments,
  channels,
  messages,
  hashtags,
  answers,
  // more later
})
