import { actionTypes } from './'

/**
 * Requests an array of schools by their name query.
 *
 * @param {string} query
 * @returns {object} action
 */
export const schoolsSearch = (query, limit = 10) => ({
  type: actionTypes.schoolsSearch.request,
  query,
  limit,
})

/**
 * Requests the school data by its id
 *
 * @param {number} id
 * @returns {object} action
 */
export const schoolInfo = id => ({
  type: actionTypes.schoolInfo,
  id,
})


/**
 * Requests login by user's username, password, schoolid
 *
 * @param {string} username user's email.
 * @param {string} password user's password.
 * @param {number} schoolid user's school id.
 * @returns {object} action
 */
export const logIn = ({ username, password, schoolId }) => ({
  type: actionTypes.logIn.request,
  username,
  password,
  schoolId,
})

/**
 * Requests userCreate by user's username, email, password, schoolid
 *
 * @param {string} name user's name.
 * @param {string} email user's email.
 * @param {string} password user's password.
 * @param {number} schoolid user's school id.
 * @returns {object} action
 */
export const userCreate = ({ name, email, password, schoolId }) => ({
  type: actionTypes.userCreate.request,
  name,
  email,
  password,
  schoolId,
})

export const authClearError = () => ({
  type: actionTypes.authClearError.request
})

/**
 * Requests new Tokens by refresh token
 *
 * @param {string} token refresh token
 * @returns {object} action
 */
export const tokenRefresh = token => ({
  type: actionTypes.tokenRefresh.request,
  token,
})

/**
 * Requests new Tokens by refresh token
 *
 * @param {string} token refresh token
 * @returns {object} action
 */
export const hashtagAdd = ({ hashtags, accessToken, tagType }) => ({
  type: actionTypes.hashtagAdd.request,
  hashtags,
  accessToken,
  tagType,
})

/**
 * Requests new Tokens by refresh token
 *
 * @param {string} token refresh token
 * @returns {object} action
 */
export const userPictureUpdate = params => ({
  type: actionTypes.userPictureUpdate.request,
  ...params,
})


/**
 * Requests posts Search
 *
 * @param {object} params
 * @returns {object} action
 */
export const postsSearch = params => ({
  type: actionTypes.postsSearch.request,
  ...params,
})
