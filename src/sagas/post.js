import { put, takeLatest, takeEvery } from 'redux-saga/effects'
import {
  postInfo,
  postsSearch,
  postGiveDonuts,
  postCreate,
  answerSearch,
  answerCreate,
  postsTrendingSearch,
  postsRelevantSearch,
} from '../actions/types'
import * as converter from '../helpers/converter'
import api from '../helpers/api'
import FormData from 'form-data'

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

export function* postInfoAsync({ accessToken, postId }) {
  const params = {
    accessToken,
  }

  try {
    const result = yield api.get(`posts/${postId}`, {
      params: converter.camelToSnakeCase(params),
    })

    yield put({ type: postInfo.success, result: converter.snakeToCamelCase(result) })
  } catch (error) {
    yield put({ type: postInfo.error, error })
  }
}


export function* postGiveDonutsAsync({ accessToken, amount, postId }) {
  const params = {
    accessToken,
    amount
  }

  try {
    const result = yield api.post(`posts/${postId}/donuts`, {
      params: converter.camelToSnakeCase(params),
    })

    yield put({ type: postGiveDonuts.success, result: converter.snakeToCamelCase(result) })
  } catch (error) {
    yield put({ type: postGiveDonuts.error, error })
  }
}

export function* postCreateAsync({ text, accessToken, postType = 'POST', rating = null, classNote = null }) {

  const params = {
    type: postType,
    accessToken,
    text
  }

  if (rating) params['rating'] = rating

  if (classNote) {
    params['classNote'] = classNote
    params['contentType'] = classNote.type
  }

  const snakeCaseParams = converter.camelToSnakeCase(params)

  // generate form data
  const body = new FormData()

  // append all snake case params to body
  Object.keys(snakeCaseParams).forEach(key => body.append(key, snakeCaseParams[key]))

  try {
    const result = yield api.post('posts', {
      data: body,
    })

    yield put({ type: postCreate.success, result: converter.snakeToCamelCase(result) })
  } catch (error) {
    yield put({ type: postCreate.error, error })
  }
}

export function* postsTrendingSearchAsync({ accessToken }) {

  const params = {
    accessToken
  }

  try {
    const result = yield api.get(`posts/trending`, {
      params: converter.camelToSnakeCase(params),
    })

    yield put({ type: postsTrendingSearch.success, result: converter.snakeToCamelCase(result) })
  } catch (error) {
    yield put({ type: postsTrendingSearch.error, error })
  }
}

export function* postsRelevantSearchAsync({ accessToken, limit = 10, types = null }) {

  const params = {
    accessToken,
    limit,
    types,
  }

  try {
    const result = yield api.get(`posts/relevant`, {
      params: converter.camelToSnakeCase(params),
    })

    yield put({ type: postsRelevantSearch.success, result: converter.snakeToCamelCase(result) })
  } catch (error) {
    yield put({ type: postsRelevantSearch.error, error })
  }
}


/*
  Answer
*/

export function* answerSearchAsync({ limit = 50, accessToken, lastAnswerId, questionId }) {

  const params = {
    limit,
    accessToken,
    lastAnswerId,
  }

  try {
    const result = yield api.get(`questions/${questionId}/answers`, {
      params: converter.camelToSnakeCase(params),
    })

    result.data.forEach(answer => { answer.questionId = questionId })

    yield put({ type: answerSearch.success, result: converter.snakeToCamelCase(result) })
  } catch (error) {
    yield put({ type: answerSearch.error, error })
  }
}

export function* answerCreateAsync({ accessToken, questionId, text }) {

  const params = {
    accessToken,
    text,
  }

  try {
    const result = yield api.post(`questions/${questionId}/answers`, {
      data: converter.toFormUrlEncoded(params),
    })
    result.data.questionId = questionId
    yield put({ type: answerCreate.success, result: converter.snakeToCamelCase(result) })
  } catch (error) {
    yield put({ type: answerCreate.error, error })
  }
}


export function* postInfoSaga() {
  yield takeLatest(postInfo.request, postInfoAsync)
}

export function* postsSearchSaga() {
  yield takeLatest(postsSearch.request, postsSearchAsync)
}

export function* postCreateSaga() {
  yield takeLatest(postCreate.request, postCreateAsync)
}

export function* postsTrendingSearchSaga() {
  yield takeLatest(postsTrendingSearch.request, postsTrendingSearchAsync)
}

export function* postsRelevantSearchSaga() {
  yield takeLatest(postsRelevantSearch.request, postsRelevantSearchAsync)
}

export function* postGiveDonutsSaga() {
  yield takeEvery(postGiveDonuts.request, postGiveDonutsAsync)
}

export function* answerCreateSaga() {
  yield takeLatest(answerCreate.request, answerCreateAsync)
}

export function* answerSearchSaga() {
  yield takeLatest(answerSearch.request, answerSearchAsync)
}
