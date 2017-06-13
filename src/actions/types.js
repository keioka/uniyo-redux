import actionCreator from '../helpers/actionCreator'

// Action types that will be used by client apps as well

export const logIn = actionCreator('LOG_IN')
export const tokenRefresh = actionCreator('TOKEN_REFRESH')
export const authClearError = actionCreator('AUTH_CLEAR_ERROR')
export const currentUser = actionCreator('CURRENT_USER')
export const currentUserDonuts = actionCreator('CURRENT_USER_DONUTS')
export const addDevice = actionCreator('ADD_DEVICE')

export const schoolInfo = actionCreator('SCHOOL_INFO')
export const schoolsSearch = actionCreator('SCHOOLS_SEARCH')

export const userCreate = actionCreator('USER_CREATE')
export const userInfo = actionCreator('USER_INFO')
export const userUpdate = actionCreator('USER_UPDATE')
export const userSearch = actionCreator('USER_SEARCH')
export const userPictureUpdate = actionCreator('USER_PICTURE_UPDATE')
export const userGiveDonuts = actionCreator('USER_GIVE_DONUTS')
export const userReceivedDonutsFetch = actionCreator('USER_RECEIVED_DONUTS_FETCH')
export const userSpentDonutsFetch = actionCreator('USER_SPENT_DONUTS_FETCH')
export const userOnlineStatusUpdate = actionCreator('USER_ONLINE_STATUS_UPDATE')
export const otherUserReceivedDonutsFetch = actionCreator('OTHER_USER_RECEIVED_DONUTS_FETCH')

export const hashtagsUser = actionCreator('HASHTAGS_USER')
export const hashtagAdd = actionCreator('HASHTAG_CREATE')
export const hashtagTrendingSearch = actionCreator('HASHTAG_TRENDING')
export const hashtagDelete = actionCreator('HASHTAG_DELETE')

export const postInfo = actionCreator('POST_SINGLE')
export const postsSearch = actionCreator('POSTS_SEARCH')
export const postCreate = actionCreator('POST_CREATE')
export const postDelete = actionCreator('POST_DELETE')
export const postsTrendingSearch = actionCreator('POSTS_TRENDING_SEARCH')
export const postsRelevantSearch = actionCreator('POSTS_RELEVANT_SEARCH')

export const postGiveDonuts = actionCreator('POST_GIVE_DONUTS')
export const postDonutsCountFetch = actionCreator('POST_DONUTS_COUNT_FETCH')

export const answerSearch = actionCreator('ANSWER_SEARCH')
export const answerCreate = actionCreator('ANSWER_CREATE')

export const commentCreate = actionCreator('COMMENT_CREATE')
export const commentFetch = actionCreator('COMMENT_FETCH')
export const commentsSearch = actionCreator('COMMENTS_SEARCH')
export const commentGiveDonuts = actionCreator('COMMENT_GIVE_DONUTS')
export const commentLike = actionCreator('COMMENT_LIKE')
export const commentUnlike = actionCreator('COMMENT_UNLIKE')
export const commentReceivedDonutsFetch = actionCreator('COMMENT_DONUTS_COUNT_FETCH')

export const channelSearch = actionCreator('CHANNEL_SEARCH')
export const channelCreate = actionCreator('CHANNEL_CREATE')

export const messageFetch = actionCreator('MESSAGE_FETCH')
export const messageSearch = actionCreator('MESSAGE_SEARCH')
export const messageCreate = actionCreator('MESSAGE_CREATE')

export const notificationFetch = actionCreator('NOTIFICATION_FETCH')
export const notificationSearch = actionCreator('NOTIFICATION_SEARCH')
export const notificationReadMark = actionCreator('NOTIFICATION_READ_MARK')
