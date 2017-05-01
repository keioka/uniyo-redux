import { put, takeLatest } from 'redux-saga/effects'
import { commentsSearch, commentCreate } from '../actions/types'
import * as converter from '../helpers/converter'
import api from '../helpers/api'

export function* commentsSearchAsync({ postId, accessToken }) {
  const params = {
    accessToken,
  }

  try {
    const result = yield api.get(`posts/${postId}/comments`, {
      params: converter.camelToSnakeCase(params),
    })

    result.data.forEach(comment => { comment.postId = postId })

    yield put({ type: commentsSearch.success, result: converter.snakeToCamelCase(result) })
  } catch (error) {
    yield put({ type: commentsSearch.error, error })
  }
}


export function* commentCreateAsync({ text, accessToken, postId }) {
  const params = {
    accessToken,
    text,
    postId,
  }

  try {
    const result = yield api.post(`posts/${postId}/comments`, {
      data: converter.toFormUrlEncoded(params)
    })

    result.data.postId = postId

    yield put({ type: commentCreate.success, result: converter.snakeToCamelCase(result) })
  } catch (error) {
    yield put({ type: commentCreate.error, error })
  }
}

export function* commentsSearchSaga() {
  yield takeLatest(commentsSearch.request, commentsSearchAsync)
}

export function* commentCreateSaga() {
  yield takeLatest(commentCreate.request, commentCreateAsync)
}
