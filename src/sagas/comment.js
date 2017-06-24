import { put, takeLatest, takeEvery } from 'redux-saga/effects'
import { commentsSearch, commentGiveDonuts, commentCreate, commentFetch } from '../actions/types'
import * as converter from '../helpers/converter'
import api from '../helpers/api'

export function* commentsSearchAsync({ postId, limit = 50, accessToken }) {
  const params = {
    limit,
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

export function* commentGiveDonutsAsync({ accessToken, amount, commentId }) {
  const params = {
    accessToken,
    amount,
  }

  try {
    const result = yield api.post(`comments/${commentId}/donuts`, {
      params: converter.camelToSnakeCase(params),
    })

    yield put({ type: commentGiveDonuts.success, result: converter.snakeToCamelCase({ data: { commentId, amount: 1 } }) })
  } catch (error) {
    yield put({ type: commentGiveDonuts.error, error })
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

export function* commentFetchAsync(params) {
  yield put({ type: postCommentsAmountIncrement.request, result: converter.snakeToCamelCase(result) })
}

export function* commentsSearchSaga() {
  yield takeLatest(commentsSearch.request, commentsSearchAsync)
}

export function* commentGiveDonutsSaga() {
  yield takeEvery(commentGiveDonuts.request, commentGiveDonutsAsync)
}

export function* commentsAmountIncrementSaga() {
  yield takeEvery(commentFetch.success, commentsAmountIncrementAsync)
}

export function* commentCreateSaga() {
  yield takeLatest(commentCreate.request, commentCreateAsync)
}
