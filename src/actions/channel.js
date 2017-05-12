import * as actionTypes from './types'

/**
 * Requests channel search
 *
 * @param {object} params
 *    @param {number} postId
 *    @param {string} accessToken
 *
 * @returns {object} action
 */
export const channelSearch = params => ({
  type: actionTypes.channelSearch.request,
  ...params,
})

/**
 * Requests channel create
 *
 * @param {object} params
 *    @param {number} postId
 *    @param {string} accessToken
 *
 * @returns {object} action
 */

export const channelCreate = params => ({
  type: actionTypes.channelCreate.request,
  ...params,
})
