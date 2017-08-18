import * as actionTypes from './types'

/**
 * Requests fetch share post by its id
 *
 * @param {number} id
 * @returns {object} action
 */
export const sharePostFetch = (params) => ({
  type: actionTypes.sharePostFetch.request,
  ...params,
})
