import { actionTypes } from './'

export const userInfo = params => ({
  type: actionTypes.userInfo.request,
  ...params,
})

export const userSearch = params => ({
  type: actionTypes.userSearch.request,
  ...params,
})

export const userGiveDonuts = params => ({
  type: actionTypes.userGiveDonuts.request,
  ...params,
})

export const otherUserReceivedDonutsFetch = params ({
  type: actionTypes.otherUserReceivedDonutsFetch.request,
  ...params,
})
