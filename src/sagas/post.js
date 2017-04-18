import { put, takeLatest } from 'redux-saga/effects'
import { postsSearch } from '../actions/types'
import * as converter from '../helpers/converter'
import api from '../helpers/api'

export function* postsSearchAsync({ types, limit = 50, hashtags, accessToken }) {
  const params = {
    accessToken,
    limit,
  }

  if (hashtags) {
    params.hashtags = hashtags.join(',')
  }

  if (types) {
    params.types = types.join(',')
  }

  try {
    const result = yield api.get('posts', {
      params: converter.camelToSnakeCase(params),
    })

    yield put({ type: postsSearch.success, result: converter.snakeToCamelCase(result) })
  } catch (error) {
    yield put({ type: postsSearch.error, error })
  }
}

export function* postsSearchSaga() {
  yield takeLatest(postsSearch.request, postsSearchAsync)
}
