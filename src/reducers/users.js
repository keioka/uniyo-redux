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
        all: _.uniqBy([...state.all, action.payload], data => data.id),
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
        all: _.uniqBy([...state.all, ...action.payload], data => data.id),
        search: [...action.payload],
        fetching: false,
      })
    }

    case actionTypes.userSearch.error: {
      return Immutable(state).merge({
        error: action.error,
        fetching: false,
      })
    }

    // case actionTypes.userGiveDonuts.success: {
    //   const { userId, amount } = action.result.data
    //   const nextAllUsers = Immutable.asMutable([ ...state.all ], { deep: true })
    //   const userIndex = nextAllUsers.findIndex(user => user.id == userId)
    //   const user = nextAllUsers[userIndex]
    //
    //   if (userIndex > -1 && nextAllUsers[userIndex]) {
    //     const prevDonutsCount =  nextAllUsers[userIndex].receivedDonutsCount
    //     nextAllUsers[userIndex] = Object.assign(nextAllUsers[userIndex], {
    //       receivedDonutsCount: prevDonutsCount + 1,
    //     })
    //   }
    //
    //   return Immutable(state).merge({
    //     all: nextAllUsers,
    //     fetching: false,
    //   })
    // }

    case actionTypes.otherUserReceivedDonutsFetch.success: {
      const { toUser } = action.result.data
      const userId = toUser.id

      const nextAllUsers = Immutable.asMutable([ ...state.all ], { deep: true })
      const userIndex = nextAllUsers.findIndex(user => user.id == userId)
      const user = nextAllUsers[userIndex]

      if (userIndex > -1 && nextAllUsers[userIndex]) {
        const prevDonutsCount =  nextAllUsers[userIndex].receivedDonutsCount
        nextAllUsers[userIndex] = Object.assign(nextAllUsers[userIndex], {
          receivedDonutsCount: prevDonutsCount + 1,
        })
      }

      return Immutable(state).merge({
        all: nextAllUsers,
        fetching: false,
      })
    }

    default: {
      return state
    }
  }
}

export default users
