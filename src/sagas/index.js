import { schoolsSearchSaga, schoolInfoSaga } from './schools'
import { logInSaga, userCreateSaga, tokenRefreshSaga, currentUserSaga } from './auth'
import { addUserTagsSaga, updateUserProfilePicSaga } from './profile'
import { postsSearchSaga, postCreateSaga } from './post'
import { commentsSearchSaga, commentCreateSaga } from './comment'
import { userInfoSaga, userInfoAsync, userSearchSaga } from './user'

export default {
  // school search
  schoolsSearchSaga,
  schoolInfoSaga,

  // auth
  logInSaga,
  userCreateSaga,
  currentUserSaga,
  tokenRefreshSaga,
  addUserTagsSaga,
  updateUserProfilePicSaga,

  // post
  postsSearchSaga,
  postCreateSaga,

  // comment
  commentsSearchSaga,
  commentCreateSaga,

  // user
  userInfoAsync,
  userInfoSaga,
  userSearchSaga,
}
