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
      const nextUser = action.payload
      const index = state.all.findIndex(user => user.id === nextUser.id)
      let nextAllUsers
      if (index > 0) {
        nextAllUsers = state.all.map((user, userIndex) => {
          if (index === userIndex) {
            return Immutable.merge(user, nextUser)
          }
          return user
        })
      } else {
        nextUser.isOnline = false
        nextAllUsers = _.uniqBy([...state.all, nextUser], data => data.id)
      }

      return Immutable(state).merge({
        all: nextAllUsers,
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
      const users = action.payload
      const previousAllUsers = state.all
      // previousAllUsers.map(previousUser => {
      //   const user = users.filter(user => previousUser.id === user.id)[0]
      //   return user ? Immutable.merge(previousUser, user) : previousUser
      // })
      const nextAllUsers = _.unionBy([...users], [...previousAllUsers], 'id')
      return Immutable(state).merge({
        all: nextAllUsers.map(user => user.isOnline ? user : Object.assign({}, user, { isOnline: false })),
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

    case actionTypes.userALL.request: {
      const users = action.payload
      const previousAllUsers = state.all
      const nextAllUsers = _.unionBy([...users], [...previousAllUsers], 'id')
      return Immutable(state).merge({
        all: nextAllUsers.map(user => user.isOnline ? user : Object.assign({}, user, { isOnline: false })),
        search: [...action.payload],
        fetching: false,
      })
    }

   case actionTypes.userOnlineStatusUpdate.success: {
     const usersOnlineStatus = action.payload
     const statusObject = {}
     usersOnlineStatus.forEach(userStatus => {
       statusObject[userStatus.userId] = userStatus.status === 'ONLINE'
     })
     const nextAllUsers = state.all.map(user => {
       const newStatus = statusObject[user.id]
       const currentStatus = user.isOnline
       return Immutable.set(user, 'isOnline', (typeof statusObject[user.id] === "undefined") ? currentStatus : newStatus)
     })
     return Immutable(state).merge({
       all: nextAllUsers,
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
