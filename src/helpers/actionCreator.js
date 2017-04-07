/**
 * The action creator helper function.
 * Receives the basic type name and returns object containing all types.
 *
 * @param {string} type
 */
const actionCreator = type => ({
  REQUEST: `${type}_REQUEST`,
  SUCCESS: `${type}_SUCCESS`,
  ERROR: `${type}_ERROR`,
})

export default actionCreator
