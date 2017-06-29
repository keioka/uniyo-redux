import * as actionTypes from './types'

export const hashtagSearch = params => ({
  type: actionTypes.hashtagSearch.request,
  ...params,
})

export const hashtagTrendingSearch = params => ({
  type: actionTypes.hashtagTrendingSearch.request,
  ...params,
})
