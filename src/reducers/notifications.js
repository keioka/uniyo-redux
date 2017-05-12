import Immutable from 'seamless-immutable'
import { actionTypes } from '../actions'
import _ from 'lodash'

const initialState = Immutable({
  all: [],
  error: {},
  fetching: false,
})

/**
 * Post reducer
 *
 * @param {object} [state={}]
 * @param {any} action
 */
const notifications = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.notificationSearch.request: {
      return Immutable(state).merge({
        fetching: true
      })
    }

    case actionTypes.notificationSearch.success: {
      return Immutable(state).merge({
        all: _.uniqBy([...state.all, ...action.result.data], data => data.id),
        fetching: false,
      })
    }

    case actionTypes.notificationSearch.error: {
      return Immutable(state).merge({
        error: action.error,
        fetching: false,
      })
    }

    case actionTypes.notificationFetch.success: {
      return Immutable(state).merge({
        all: _.uniqBy([action.result.data, ...state.all], data => data.id),
        fetching: false,
      })
    }

    case actionTypes.notificationFetch.error: {
      return Immutable(state).merge({
        error: action.error,
        fetching: false,
      })
    }

    case actionTypes.notificationReadMark.request: {
      return Immutable(state).merge({
      })
    }

    case actionTypes.notificationReadMark.success: {
      const { notificationId } = action.result.data

      const newNotifications = Immutable.asMutable([ ...state.all ], { deep: true })

      newNotifications.forEach(notification => {
        if (notification.id === notificationId) {
          notification.isRead = true
        }
      })

      console.log('notificationReadMark.success', newNotifications)
      return Immutable(state).merge({
        all: newNotifications
      })
    }

    case actionTypes.notificationReadMark.error: {
      return Immutable(state).merge({
        error: action.error,
      })
    }

    default: {
      return state
    }
  }
}

export default notifications
