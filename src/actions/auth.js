import * as actionTypes from './types'

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

/**
 * Requests current user info by user id * if endpoint is ready, get rid of user id
 *
 * @param {object} params
 *    @param {string} accessToken
 *    @param {integer} userId
 * @returns {object} action
 */
export const currentUser = params => ({
  type: actionTypes.currentUser.request,
  ...params,
})

/**
 * Requests current user info by user id * if endpoint is ready, get rid of user id
 *
 * @param {object} params
 *    @param {string} accessToken
 * @returns {object} action
 */
export const currentUserDonuts = params => ({
  type: actionTypes.currentUserDonuts.request,
  ...params,
})

/**
 * Requests clearing error message
 *
 * @returns {object} action
 */
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
 * Requests hashtags user
 *
 * @param {string} accessToken
 * @returns {object} action
 */

export const hashtagsUser = params => ({
  type: actionTypes.hashtagsUser.request,
  ...params,
})

/**
 * Requests hashtags delete
 *
 * @param {object} params
 * @returns {object} action
 */

export const hashtagDelete = params => ({
  type: actionTypes.hashtagDelete.request,
  ...params,
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
 * Requests new Tokens by refresh token
 *
 * @param {string} token refresh token
 * @returns {object} action
 */
export const addDevice = params => ({
  type: actionTypes.userPictureUpdate.request,
  ...params,
})
