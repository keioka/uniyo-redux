import { put, takeLatest } from 'redux-saga/effects'
import { userInfo, userSearch } from '../actions/types'
import * as converter from '../helpers/converter'
import api from '../helpers/api'

export function* userInfoAsync({ userId, accessToken }) {
  const params = {
    accessToken
  }

  try {
    const result = yield api.get(`users/${userId}`, {
      params: converter.camelToSnakeCase(params),
    })

    yield put({ type: userInfo.success, result: converter.snakeToCamelCase(result) })
    return converter.snakeToCamelCase(result.data)
  } catch (error) {
    yield put({ type: userInfo.error, error })
  }
}

export function* userInfoSaga() {
  yield takeLatest(userInfo.request, userInfoAsync)
}

export function* userSearchAsync({ query, accessToken }) {
  const params = {
    query,
    accessToken,
  }
  try {
    const result = yield api.get(`users/search`, {
      params: converter.camelToSnakeCase(params),
    })

    yield put({ type: userSearch.success, result: converter.snakeToCamelCase(result) })
    return converter.snakeToCamelCase(result.data)
  } catch (error) {
    yield put({ type: userSearch.error, error })
  }
}

export function* userSearchSaga() {
  yield takeLatest(userSearch.request, userSearchAsync)
}
