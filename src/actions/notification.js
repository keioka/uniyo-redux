import * as actionTypes from './types'

/**
 * Requests Notification Search
 *
 * @param {object} params
 *   @param {number} postId
 *   @param {string} accessToken
 *
 * @returns {object} action
 */
export const notificationSearch = params => ({
  type: actionTypes.notificationSearch.request,
  ...params,
})

/**
 * Requests Notification Fetch
 *
 * @param {object} params
 *   @param {number} postId
 *   @param {string} accessToken
 *
 * @returns {object} action
 */
export const notificationFetch = params => ({
  type: actionTypes.notificationFetch.request,
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
export const notificationReadMark = params => ({
  type: actionTypes.notificationReadMark.request,
  ...params,
})
