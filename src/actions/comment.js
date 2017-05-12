import * as actionTypes from './types'

/**
 * Requests Comments Search
 *
 * @param {object} params
 *    @param {number} postId
 *    @param {string} accessToken
 *
 * @returns {object} action
 */
export const commentsSearch = params => ({
  type: actionTypes.commentsSearch.request,
  ...params,
})

/**
 * Requests Comments Fetch
 *
 * @param {object} params
 *    @param {number} postId
 *    @param {string} accessToken
 *
 * @returns {object} action
 */

export const commentFetch = params => ({
  type: actionTypes.commentFetch.request,
  ...params,
})

/**
 * Requests Comments Create
 *
 * @param {object} params
 *    @param {number} postId
 *    @param {string} accessToken
 *
 * @returns {object} action
 */
export const commentCreate = params => ({
  type: actionTypes.commentCreate.request,
  ...params,
})
