import { actionTypes } from './'

export const userInfo = params => ({
  type: actionTypes.userInfo.request,
  ...params,
})

export const userSearch = params => ({
  type: actionTypes.userSearch.request,
  ...params,
})