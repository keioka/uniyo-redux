import Immutable from 'seamless-immutable'
import { actionTypes } from '../actions'
import _ from 'lodash'

const initialState = Immutable({
  all: [],
  error: {},
  fetching: false,
})

/**
 * message reducer
 *
 * @param {object} [state={}]
 * @param {any} action
 */
const answers = (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state
    }
  }
}

export default answers
