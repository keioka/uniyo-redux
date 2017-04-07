/**
 * The action creator helper function.
 * Receives the basic type name and returns object containing request, success and error types.
 *
 * @param {string} type
 * @returns {object}
 */
const actionCreator = type => ({
  REQUEST: `${type}_REQUEST`,
  SUCCESS: `${type}_SUCCESS`,
  ERROR: `${type}_ERROR`,
})

export default actionCreator
