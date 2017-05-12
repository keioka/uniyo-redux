import { schoolsSearchSaga, schoolInfoSaga } from './schools'
import { logInSaga, userCreateSaga, tokenRefreshSaga, currentUserSaga } from './auth'
import { addUserTagsSaga, hashtagDeleteSaga, hashtagsUserSaga, updateUserProfilePicSaga } from './profile'
import { postInfoSaga, postsSearchSaga, postCreateSaga, answerSearchSaga, answerCreateSaga } from './post'
import { commentsSearchSaga, commentCreateSaga } from './comment'
import { userInfoSaga, userInfoAsync, userSearchSaga } from './user'
import { messageSearchSaga, messageCreateSaga } from './message'
import { channelSearchSaga, channelCreateSaga } from './channel'
import { hashtagTrendingSearchSaga } from './hashtag'

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
  hashtagDeleteSaga,
  hashtagsUserSaga,
  updateUserProfilePicSaga,

  // hashtag
  hashtagTrendingSearchSaga,

  // post
  postInfoSaga,
  postsSearchSaga,
  postCreateSaga,
  answerSearchSaga,
  answerCreateSaga,

  // comment
  commentsSearchSaga,
  commentCreateSaga,

  // user
  userInfoAsync,
  userInfoSaga,
  userSearchSaga,

  // message
  messageSearchSaga,
  messageCreateSaga,

  // channel
  channelSearchSaga,
  channelCreateSaga,
}
