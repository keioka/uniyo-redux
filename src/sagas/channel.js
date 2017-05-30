import { put, takeLatest } from 'redux-saga/effects'
import { channelSearch, channelCreate } from '../actions/types'
import * as converter from '../helpers/converter'
import api from '../helpers/api'
import FormData from 'form-data'

export function* channelSearchAsync({ accessToken }) {
  const params = {
    accessToken,
  }

  try {
    const result = yield api.get('channels', {
      params: converter.camelToSnakeCase(params),
    })
    yield put({ type: channelSearch.success, result: converter.snakeToCamelCase(result) })
  } catch (error) {
    yield put({ type: channelSearch.error, error })
  }
}

export function* channelCreateAsync({
  name,
  description,
  accessToken,
  isPrivate = true,
  users,
  channel_type = "PRIVATE_CHAT"
}) {
  const params = {
    name,
    description,
    accessToken,
    isPrivate,
    users,
    type: channel_type,
  }

  const snakeCaseParams = converter.toFormUrlEncoded(params)

  try {
    const result = yield api.post('channels', {
      data: snakeCaseParams,
    })

    yield put({ type: channelCreate.success, result: converter.snakeToCamelCase(result) })
  } catch (error) {
    yield put({ type: channelCreate.error, error })
  }
}

export function* channelSearchSaga() {
  yield takeLatest(channelSearch.request, channelSearchAsync)
}


export function* channelCreateSaga() {
  yield takeLatest(channelCreate.request, channelCreateAsync)
}
