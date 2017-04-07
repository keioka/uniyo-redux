import { actionTypes } from './'

/**
 * Requests an array of schools by their name query.
 *
 * @param {string} query
 * @returns
 */
export const schoolsSearch = query => ({
  type: actionTypes.schoolsSearch.request,
  query,
})

/**
 * Requests the school data by its id
 *
 * @param {number} id
 * @returns
 */
export const schoolInfo = id => ({
  type: actionTypes.schoolInfo,
  id,
})
