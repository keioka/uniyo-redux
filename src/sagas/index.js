import { schoolsSearchSaga, schoolInfoSaga } from './schools'
import { logInSaga, userCreateSaga, tokenRefreshSaga, currentUserSaga, currentUserDonutsSaga } from './auth'
import { addUserTagsSaga, hashtagDeleteSaga, hashtagsUserSaga, updateUserProfilePicSaga } from './profile'
import { postInfoSaga, postsSearchSaga, postCreateSaga, postGiveDonutsSaga, answerSearchSaga, answerCreateSaga } from './post'
import { commentsSearchSaga, commentCreateSaga, commentGiveDonutsSaga } from './comment'
import { userInfoSaga, userInfoAsync, userSearchSaga, userGiveDonutsSaga } from './user'
import { messageSearchSaga, messageCreateSaga } from './message'
import { channelSearchSaga, channelCreateSaga } from './channel'
import { hashtagTrendingSearchSaga } from './hashtag'
import { notificationSearchSaga, notificationReadMarkSaga } from './notification'

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
  currentUserDonutsSaga,

  // hashtag
  hashtagTrendingSearchSaga,

  // post
  postInfoSaga,
  postsSearchSaga,
  postCreateSaga,
  postGiveDonutsSaga,
  answerSearchSaga,
  answerCreateSaga,

  // comment
  commentsSearchSaga,
  commentGiveDonutsSaga,
  commentCreateSaga,

  // user
  userInfoAsync,
  userInfoSaga,
  userSearchSaga,
  userGiveDonutsSaga,

  // message
  messageSearchSaga,
  messageCreateSaga,

  // channel
  channelSearchSaga,
  channelCreateSaga,

  // notification
  notificationSearchSaga,
  notificationReadMarkSaga,
}
