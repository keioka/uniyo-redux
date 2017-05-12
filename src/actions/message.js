import * as actionTypes from './types'

/**
 * Requests Messsage Search
 *
 * @param {object} params
 *   @param {number} postId
 *   @param {string} accessToken
 *
 * @returns {object} action
 */
export const messageSearch = params => ({
  type: actionTypes.messageSearch.request,
  ...params,
})

/**
 * Requests Messsage Fetch
 *
 * @param {object} params
 *   @param {number} postId
 *   @param {string} accessToken
 *
 * @returns {object} action
 */
export const messageFetch = params => ({
  type: actionTypes.messageFetch.request,
  ...params,
})

/**
 * Requests Message Create
 *
 * @param {object} params
 *   @param {number} postId
 *   @param {string} accessToken
 *
 * @returns {object} action
 */
export const messageCreate = params => ({
  type: actionTypes.messageCreate.request,
  ...params,
})
