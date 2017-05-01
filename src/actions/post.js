import { actionTypes } from './'

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

export const postCreate = params => ({
  type: actionTypes.postCreate.request,
  ...params,
})
