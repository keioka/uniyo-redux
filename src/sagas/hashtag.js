import { put, takeLatest } from 'redux-saga/effects'
import { hashtagTrendingSearch } from '../actions/types'
import * as converter from '../helpers/converter'
import api from '../helpers/api'

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

export function* hashtagTrendingSearchSaga() {
  yield takeLatest(hashtagTrendingSearch.request, hashtagTrendingSearchAsync)
}
