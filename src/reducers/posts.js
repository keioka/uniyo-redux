import Immutable from 'seamless-immutable'
import _ from 'lodash'
import { actionTypes } from '../actions'


const initialState = Immutable({
  all: [],
  trending: [],
  relevant: [],
  error: {},
  fetching: false,
})

/**
 * Post reducer
 *
 * @param {object} [state={}]
 * @param {any} action
 */
const posts = (state = initialState, action) => {
  switch (action.type) {

    /*
      postInfo
    */

    case actionTypes.postInfo.request: {
      return Immutable(state).merge({
        fetching: true,
      })
    }

    case actionTypes.postInfo.success: {
      return Immutable(state).merge({
        all: _.uniqBy([action.result.data, ...state.all], data => data.id),
        fetching: false,
      })
    }

    case actionTypes.postInfo.error: {
      return Immutable(state).merge({
        error: action.error,
        fetching: false,
      })
    }

    /*
      postsSearch
    */

    case actionTypes.postsSearch.request: {
      return Immutable(state).merge({
        fetching: true,
      })
    }

    case actionTypes.postsSearch.success: {
      return Immutable(state).merge({
        all: _.uniqBy([...state.all, ...action.result.data], data => data.id),
        fetching: false,
      })
    }

    case actionTypes.postsSearch.error: {
      return Immutable(state).merge({
        error: action.error,
        fetching: false,
      })
    }

    /*
      postsTrendingSearch
    */

    case actionTypes.postsTrendingSearch.request: {
      return Immutable(state).merge({
        fetching: true,
      })
    }

    case actionTypes.postsTrendingSearch.success: {
      return Immutable(state).merge({
        trending: _.uniqBy([...state.trending, ...action.result.data], data => data.id),
        fetching: false,
      })
    }

    case actionTypes.postsTrendingSearch.error: {
      return Immutable(state).merge({
        error: action.error,
        fetching: false,
      })
    }

    /*
      postsRelevantSearch
    */

    case actionTypes.postsRelevantSearch.request: {
      return Immutable(state).merge({
        fetching: true,
      })
    }

    case actionTypes.postsRelevantSearch.success: {
      return Immutable(state).merge({
        relevant: _.uniqBy([...state.relevant, ...action.result.data], data => data.id),
        fetching: false,
      })
    }

    case actionTypes.postsRelevantSearch.error: {
      return Immutable(state).merge({
        error: action.error,
        fetching: false,
      })
    }

    /*
      postCreate
    */

    case actionTypes.postCreate.request: {
      return Immutable(state).merge({
      })
    }

    case actionTypes.postCreate.success: {
      return Immutable(state).merge({
        all: _.uniqBy([action.result.data, ...state.all], data => data.id),
      })
    }

    case actionTypes.postCreate.error: {
      return Immutable(state).merge({
        error: action.error,
      })
    }

    /*
      postDonutsCountFetch
    */

    case actionTypes.postDonutsCountFetch.success: {
      console.log('postDonutsCountFetch')
      const { postId, amount } = action.result.data

      const newPosts = Immutable.asMutable([ ...state.all ], { deep: true })

      newPosts.forEach(post => {
        if (post.id === postId) {
          post.donutsCount += amount
        }
      })

      return Immutable(state).merge({
        all: newPosts
      })
    }

    default: {
      return state
    }
  }
}

export default posts
