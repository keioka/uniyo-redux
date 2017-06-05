import * as actionTypes from './types'

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
export const schoolInfo = ({ id }) => ({
  type: actionTypes.schoolInfo.request,
  id,
})
