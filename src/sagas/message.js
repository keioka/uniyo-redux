import { put, takeLatest } from 'redux-saga/effects'
import { messageSearch, messageCreate } from '../actions/types'
import * as converter from '../helpers/converter'
import api from '../helpers/api'

export function* messageSearchAsync({
  accessToken,
  channelId,
  limit,
  before,
  after,
  around
}) {

  const params = {
    accessToken,
    limit,
    before,
    after,
    around,
  }

  const path = `channels/${channelId}/messages`

  try {
    const result = yield api.get(path, {
      params: converter.camelToSnakeCase(params),
    })

    result.data.forEach(message => { message.channelId = channelId })

    yield put({ type: messageSearch.success, result: converter.snakeToCamelCase(result) })
  } catch (error) {
    yield put({ type: messageSearch.error, error })
  }
}

export function* messageCreateAsync({
  accessToken,
  channelId,
  text,
  nonce,
}) {
  const params = {
    accessToken,
    text,
    nonce,
  }

  const path = `channels/${channelId}/messages`

  const snakeCaseParams = converter.toJson(params)

  try {
    const result = yield api.post(path, {
      data: snakeCaseParams,
      headers: { 'Content-Type': 'application/json' },
    })

    result.data.channelId = channelId

    yield put({ type: messageCreate.success, result: converter.snakeToCamelCase(result) })
  } catch (error) {
    yield put({ type: messageCreate.error, error })
  }
}

export function* messageSearchSaga() {
  yield takeLatest(messageSearch.request, messageSearchAsync)
}


export function* messageCreateSaga() {
  yield takeLatest(messageCreate.request, messageCreateAsync)
}
