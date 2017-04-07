/**
 * The action creator helper function.
 * Receives the basic type name and returns object containing request, success and error types.
 *
 * @param {string} type
 * @returns
 */
const actionCreator = type => ({
  request: `${type}_REQUEST`,
  success: `${type}_SUCCESS`,
  error: `${type}_ERROR`,
})

export default actionCreator
