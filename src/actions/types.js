import actionCreator from '../helpers/actionCreator'

// Action types that will be used by client apps as well

export const logIn = actionCreator('LOG_IN')
export const tokenRefresh = actionCreator('TOKEN_REFRESH')
export const authClearError = actionCreator('AUTH_CLEAR_ERROR')

export const schoolInfo = actionCreator('SCHOOL_INFO')
export const schoolsSearch = actionCreator('SCHOOLS_SEARCH')

export const userCreate = actionCreator('USER_CREATE')
export const userInfo = actionCreator('USER_INFO')
export const userUpdate = actionCreator('USER_UPDATE')
export const userSearch = actionCreator('USER_SEARCH')
export const userPictureUpdate = actionCreator('USER_PICTURE_UPDATE')

export const hashtagsUser = actionCreator('HASHTAGS_USER')
export const hashtagAdd = actionCreator('HASHTAG_CREATE')
export const hashtagDelete = actionCreator('HASHTAG_DELETE')

export const postInfo = actionCreator('POST_SINGLE')
export const postsSearch = actionCreator('POSTS_SEARCH')
export const postCreate = actionCreator('POST_CREATE')
export const postDelete = actionCreator('POST_DELETE')
export const postLike = actionCreator('POST_LIKE')
export const postUnlike = actionCreator('POST_UNLIKE')

export const commentCreate = actionCreator('COMMENT_CREATE')
export const commentsSearch = actionCreator('COMMENTS_SEARCH')
export const commentLike = actionCreator('COMMENT_LIKE')
export const commentUnlike = actionCreator('COMMENT_UNLIKE')
