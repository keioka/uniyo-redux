import Immutable from 'seamless-immutable'
import { actionTypes } from '../actions'
import _ from 'lodash'

const initialState = Immutable({
  all: [],
  unReadPostIds: [],
  unReadChannelIds: [],
  error: {},
  fetching: false,
})


const parseNotification = (notification) => {
  if (notification.post) {
    return {
      type: 'POST',
      postId: post.id,
    }
  }

  if (notification.channel) {
    return {
      type: 'MESSAGE',
      messageId: message.id,
    }
  }
}
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
      const notifications = action.result.data
      const unReadNotifications = notifications.filter(notification => !notification.isRead)
      const unReadPostIds = unReadNotifications.filter(notification => notification.post).map(notification => ({ postId: notification.post.id, notificationId: notification.id }))
      const unReadChannelIds = unReadNotifications.filter(notification => notification.channel).map(notification => ({ channelId: notification.channel.id, notificationId: notification.id }))
      return Immutable(state).merge({
        all: _.uniqBy([...state.all, ...notifications ], data => data.id),
        unReadPostIds,
        unReadChannelIds,
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
      const result = action.result.data
      const nextNotifications = Immutable.asMutable([ result, ...state.all ], { deep: true })
      const unReadNotifications = nextNotifications.filter(notification => !notification.isRead)

      const unReadPostIds = nextNotifications.filter(notification => notification.post && !notification.isRead).map(notification => ({ postId: notification.post.id, notificationId: notification.id }))
      const unReadChannelIds = nextNotifications.filter(notification => notification.channel && !notification.isRead).map(notification => ({ channelId: notification.channel.id, notificationId: notification.id }))

      return Immutable(state).merge({
        all: _.uniqBy(nextNotifications, data => data.id),
        unReadPostIds: unReadPostIds,
        unReadChannelIds: unReadChannelIds,
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

      const nextNotifications = Immutable.asMutable([ ...state.all ], { deep: true })
      const nextUnReadPostIds = Immutable.asMutable([ ...state.unReadPostIds ], { deep: true })
      const nextUnReadChannelIds = Immutable.asMutable([ ...state.unReadChannelIds ], { deep: true })

      nextNotifications.forEach(notification => {
        if (notification.id === notificationId) {
          notification.isRead = true
        }
      })

      return Immutable(state).merge({
        all: nextNotifications,
        unReadPostIds: nextUnReadPostIds.filter(ids => notificationId !== ids.notificationId),
        unReadChannelIds: nextUnReadChannelIds.filter(ids => notificationId !== ids.notificationId),
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
