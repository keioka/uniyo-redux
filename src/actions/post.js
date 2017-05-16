import { actionTypes } from './'


/**
 * Requests posts info
 *
 * @param {object} params
 * @returns {object} action
 */

export const postInfo = params => ({
  type: actionTypes.postInfo.request,
  ...params,
})

/**
 * Requests posts search
 *
 * @param {object} params
 * @returns {object} action
 */

export const postsSearch = params => ({
  type: actionTypes.postsSearch.request,
  ...params,
})

/**
 * Requests Post Give Donuts
 *
 * @param {object} params
 *    @param {number} postId
 *    @param {string} accessToken
 *    @param {number} number
 *
 * @returns {object} action
 */

export const postGiveDonuts = params => ({
  type: actionTypes.postGiveDonuts.request,
  ...params,
})

/**
 * Requests posts create
 *
 * @param {object} params
 * @returns {object} action
 */

export const postCreate = params => ({
  type: actionTypes.postCreate.request,
  ...params,
})
