import { put, takeLatest } from 'redux-saga/effects'
import { hashtagSearch, hashtagTrendingSearch } from '../actions/types'
import * as converter from '../helpers/converter'
import api from '../helpers/api'

export function* hashtagSearchAsync({ accessToken, query, limit = 50 }) {
  const params = {
    accessToken,
    query,
    limit,
  }

  try {
    const result = yield api.get(`hashtags/search`, {
      params: converter.camelToSnakeCase(params),
    })

    yield put({ type: hashtagSearch.success, result: converter.snakeToCamelCase(result) })
  } catch (error) {
    yield put({ type: hashtagSearch.error, error })
  }
}

export function* hashtagTrendingSearchAsync({ accessToken }) {
  const params = {
    accessToken,
  }

  try {
    const result = yield api.get(`hashtags/top`, {
      params: converter.camelToSnakeCase(params),
    })

    yield put({ type: hashtagTrendingSearch.success, result: converter.snakeToCamelCase(result) })
  } catch (error) {
    yield put({ type: hashtagTrendingSearch.error, error })
  }
}

export function* hashtagSearchSaga() {
  yield takeLatest(hashtagSearch.request, hashtagSearchAsync)
}

export function* hashtagTrendingSearchSaga() {
  yield takeLatest(hashtagTrendingSearch.request, hashtagTrendingSearchAsync)
}
