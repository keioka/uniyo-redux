import Immutable from 'seamless-immutable'
import _ from 'lodash'
import { actionTypes } from '../actions'


const initialState = Immutable({
  all: [],
  search: [],
  error: {},
})

/**
 * User reducer
 *
 * @param {object} [state={}]
 * @param {any} action
 */
const users = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.userInfo.request: {
      return Immutable(state).merge({
        fetching: true
      })
    }

    case actionTypes.userInfo.success: {
      return Immutable(state).merge({
        all: _.uniqBy([...state.all, action.result.data], data => data.id),
        fetching: false,
      })
    }

    case actionTypes.userInfo.error: {
      return Immutable(state).merge({
        error: action.error,
        fetching: false,
      })
    }

    case actionTypes.userSearch.request: {
      return Immutable(state).merge({
        fetching: true
      })
    }

    case actionTypes.userSearch.success: {
      return Immutable(state).merge({
        all: _.uniqBy([...state.all, ...action.result.data], data => data.id),
        search: [...action.result.data],
        fetching: false,
      })
    }

    case actionTypes.userSearch.error: {
      return Immutable(state).merge({
        error: action.error,
        fetching: false,
      })
    }

    case actionTypes.userGiveDonuts.success: {
      const { userId, amount } = action.result.data

      const newUsers = Immutable.asMutable([ ...state.all ], { deep: true })
      console.log(newUsers)
      newUsers.filter(user => user.id == userId)
              .map(user => {
                const currentCount = user.receivedDonutsCount + amount
                user.receivedDonutsCount = currentCount
                return user
              })
      console.log(newUsers)
      return Immutable(state).merge({
        all: _.uniqBy([ ...state.all, ...newUsers ], data => data.id),
        fetching: false,
      })
    }

    default: {
      return state
    }
  }
}

export default users
