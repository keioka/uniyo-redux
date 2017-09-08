import Immutable from 'seamless-immutable'
import _ from 'lodash'
import moment from 'moment'
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

      const newPosts = _.uniqBy(Immutable.asMutable([...state.all, action.result.data], { deep: true }), data => data.id)
      newPosts.sort((a, b) => moment.utc(b.createdAt).diff(moment.utc(a.createdAt)))
      return Immutable(state).merge({
        all: newPosts,
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
      const trendingPostsId = state.trending.map(post => post.id)
      const relevantPostsId = state.relevant.map(post => post.id)

      const newPosts = _.uniqBy(Immutable.asMutable([...state.all, ...action.result.data], { deep: true }), data => data.id)
      newPosts.sort((a, b) => moment.utc(b.createdAt).diff(moment.utc(a.createdAt)))
      const nextAllPost = newPosts.filter(post => !trendingPostsId.includes(post.id) && !relevantPostsId.includes(post.id)).map(post => Object.assign(post, {
        isRead: true,
      }))

      return Immutable(state).merge({
        all: nextAllPost,
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
      const trendingPosts = _.uniqBy([...action.result.data], data => data.id)
      const trendingPostsId = trendingPosts.map(post => post.id)
      const allPost = state.all
      const nextAllPost = allPost.filter(post => !trendingPostsId.includes(post.id))

      return Immutable(state).merge({
        all: nextAllPost,
        trending: trendingPosts,
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
      const relevantPosts = _.uniqBy([...action.result.data], data => data.id)
      const relevantPostsId = relevantPosts.map(post => post.id)
      const allPost = state.all
      const nextAllPost = allPost.filter(post => !relevantPostsId.includes(post.id))
      return Immutable(state).merge({
        all: nextAllPost,
        relevant: relevantPosts,
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
      const newPosts = _.uniqBy(Immutable.asMutable([...state.all, action.result.data], { deep: true }), data => data.id)
      newPosts.sort((a, b) => moment.utc(b.createdAt).diff(moment.utc(a.createdAt)))
      return Immutable(state).merge({
        all: newPosts,
      })
    }

    case actionTypes.postCreate.error: {
      return Immutable(state).merge({
        error: action.error,
      })
    }

    case actionTypes.postDelete.success: {
      const { postId } = action.result.data
      const nextAllPosts = _.uniqBy(Immutable.asMutable([...state.all], { deep: true }), data => data.id)
      nextAllPosts.sort((a, b) => moment.utc(b.createdAt).diff(moment.utc(a.createdAt)))
      const index = nextAllPosts.findIndex(post => post.id === postId)
      if (index > -1) {
        nextAllPosts.splice(index, 1)
      }

      return Immutable(state).merge({
        all: nextAllPosts,
      })
    }

    case actionTypes.postDelete.error: {
      return Immutable(state).merge({
        error: action.error,
      })
    }


    /*
      postDonutsCountFetch
    */

    case actionTypes.postDonutsCountFetch.success: {
      const { postId, amount } = action.result.data

      const newPosts = Immutable.asMutable([ ...state.all ], { deep: true })
      const newTrending = Immutable.asMutable([ ...state.trending ], { deep: true })
      const newRelevant = Immutable.asMutable([ ...state.relevant ], { deep: true })

      newPosts.forEach(post => {
        if (post.id === postId) {
          post.donutsCount += amount
        }
      })

      newTrending.forEach(post => {
        if (post.id === postId) {
          post.donutsCount += amount
        }
      })

      newRelevant.forEach(post => {
        if (post.id === postId) {
          post.donutsCount += amount
        }
      })

      return Immutable(state).merge({
        all: newPosts,
        trending: newTrending,
        relevant: newRelevant,
      })
    }

    case actionTypes.commentFetch.success: {
      const { postId } = action.result.data
      const nextPostAll = Immutable.asMutable([ ...state.all ], { deep: true })
      const nextTrending = Immutable.asMutable([ ...state.trending ], { deep: true })
      const nextRelevant = Immutable.asMutable([ ...state.relevant ], { deep: true })

      const indexPostAll = nextPostAll.findIndex(post => post.id === postId)
      const indexTrending = nextTrending.findIndex(post => post.id === postId)
      const indexRelevant = nextRelevant.findIndex(post => post.id === postId)

      if (indexPostAll > -1 && nextPostAll[indexPostAll]) {
        const prevCommentsCountPostAll = nextPostAll[indexPostAll].commentsCount
        nextPostAll[indexPostAll] = Object.assign(nextPostAll[indexPostAll], {
          commentsCount: prevCommentsCountPostAll + 1,
        })
      }

      if (indexTrending > -1 && nextTrending[indexTrending]) {
        const prevCommentsTrending = nextTrending[indexTrending].commentsCount
        nextTrending[indexTrending] = Object.assign(nextTrending[indexTrending], {
          commentsCount: prevCommentsTrending + 1,
        })
      }

      if (indexRelevant > -1 && nextRelevant[indexRelevant]) {
        const prevCommentsRelevant = nextRelevant[indexRelevant].commentsCount
        nextRelevant[indexRelevant] = Object.assign(nextRelevant[indexRelevant], {
          commentsCount: prevCommentsRelevant + 1,
        })
      }

      return Immutable(state).merge({
        all: nextPostAll,
        trending: nextTrending,
        relevant: nextRelevant,
      })
    }

    case actionTypes.commentDelete.success: {
      const { postId, commentId } = action.result.data
      const nextPostAll = Immutable.asMutable([ ...state.all ], { deep: true })
      const nextTrending = Immutable.asMutable([ ...state.trending ], { deep: true })
      const nextRelevant = Immutable.asMutable([ ...state.relevant ], { deep: true })

      const indexPostAll = nextPostAll.findIndex(post => post.id === postId)
      const indexTrending = nextTrending.findIndex(post => post.id === postId)
      const indexRelevant = nextRelevant.findIndex(post => post.id === postId)

      if (indexPostAll > -1 && nextPostAll[indexPostAll]) {
        const prevCommentsCountPostAll = nextPostAll[indexPostAll].commentsCount
        nextPostAll[indexPostAll] = Object.assign(nextPostAll[indexPostAll], {
          commentsCount: prevCommentsCountPostAll - 1,
        })
      }

      if (indexTrending > -1 && nextTrending[indexTrending]) {
        const prevCommentsTrending = nextTrending[indexTrending].commentsCount
        nextTrending[indexTrending] = Object.assign(nextTrending[indexTrending], {
          commentsCount: prevCommentsTrending - 1,
        })
      }

      if (indexRelevant > -1 && nextRelevant[indexRelevant]) {
        const prevCommentsRelevant = nextRelevant[indexRelevant].commentsCount
        nextRelevant[indexRelevant] = Object.assign(nextRelevant[indexRelevant], {
          commentsCount: prevCommentsRelevant - 1,
        })
      }

      return Immutable(state).merge({
        all: nextPostAll,
        trending: nextTrending,
        relevant: nextRelevant,
      })
    }

    case actionTypes.answerSearch.request: {
      return Immutable(state).merge({
        fetching: true
      })
    }

    case actionTypes.answerSearch.success: {
      const newPosts = _.uniqBy(Immutable.asMutable([...state.all, ...action.result.data], { deep: true }), data => data.id)
      newPosts.sort((a, b) => moment.utc(b.createdAt).diff(moment.utc(a.createdAt)))
      return Immutable(state).merge({
        all: newPosts,
        fetching: false,
      })
    }

    case actionTypes.answerSearch.error: {
      return Immutable(state).merge({
        error: action.error,
        fetching: false,
      })
    }

    case actionTypes.answerCreate.request: {
      return Immutable(state).merge({
        fetching: true
      })
    }

    case actionTypes.answerCreate.success: {
      const questionId = parseInt(action.result.data.questionId)
      const nextPosts = _.uniqBy(Immutable.asMutable([...state.all, action.result.data], { deep: true }), data => data.id)
      nextPosts.sort((a, b) => moment.utc(b.createdAt).diff(moment.utc(a.createdAt)))
      nextPosts.forEach(post => {
        if (post.id === questionId) {
          post.answersCount += 1
        }
      })

      return Immutable(state).merge({
        all: nextPosts,
        fetching: false,
      })
    }

    case actionTypes.answerCreate.error: {
      return Immutable(state).merge({
        error: action.error,
        fetching: false,
      })
    }

    default: {
      return state
    }
  }
}

export default posts
