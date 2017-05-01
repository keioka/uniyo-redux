import { put, takeLatest } from 'redux-saga/effects'
import { postsSearch, postCreate } from '../actions/types'
import * as converter from '../helpers/converter'
import api from '../helpers/api'

export function* postsSearchAsync({ types, limit = 50, hashtags, accessToken, lastPostId
 }) {
  const params = {
    accessToken,
    limit,
    lastPostId,
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

    // If new posts array is empty
    if (result.data.length === 0) {
      yield put({ type: 'POSTS_SEARCH_PENDING', result: converter.snakeToCamelCase(result) })
    } else {
      yield put({ type: postsSearch.success, result: converter.snakeToCamelCase(result) })
    }
  } catch (error) {
    yield put({ type: postsSearch.error, error })
  }
}

export function* postCreateAsync({ text, accessToken, postType = 'POST', rating = null, classNote = null }) {

  const params = {
    postType,
    accessToken,
    text
  }

  if (rating) params['rating'] = rating
  if (classNote) {
    params['classNote'] = classNote
    params['classNoteContentType'] = classNote.type
  }

  try {
    const result = yield api.post('posts', {
      data: converter.toFormUrlEncoded(params),
    })

    yield put({ type: postCreate.success, result: converter.snakeToCamelCase(result) })
  } catch (error) {
    yield put({ type: postCreate.error, error })
  }
}

export function* postsSearchSaga() {
  yield takeLatest(postsSearch.request, postsSearchAsync)
}


export function* postCreateSaga() {
  yield takeLatest(postCreate.request, postCreateAsync)
}
