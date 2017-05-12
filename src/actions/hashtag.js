import * as actionTypes from './types'

export const hashtagTrendingSearch = params => ({
  type: actionTypes.hashtagTrendingSearch.request,
  ...params,
})
