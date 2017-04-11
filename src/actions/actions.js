import { actionTypes } from './'

/**
 * Requests an array of schools by their name query.
 *
 * @param {string} query
 * @returns
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
 * @returns
 */
export const schoolInfo = id => ({
  type: actionTypes.schoolInfo,
  id,
})


/**
 * Requests login by user's username, password, schoolid
 *
 * @param {string} username user's email.
 * @param {string} password user's password.
 * @param {number} schoolid user's school id.
 * @returns
 */
export const logIn = ({ username, password, schoolId }) => ({
  type: actionTypes.logIn,
  username,
  password,
  schoolId
})
