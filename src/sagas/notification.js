import { put, takeLatest, takeEvery } from 'redux-saga/effects'
import { notificationSearch, notificationReadMark } from '../actions/types'
import * as converter from '../helpers/converter'
import api from '../helpers/api'


export function* notificationSearchAsync({
  accessToken,
  limit = 50,
  include_read = true,
}) {

  const params = {
    accessToken,
    limit,
    include_read,
  }

  const path = `notifications`

  try {
    const result = yield api.get(path, {
      params: converter.camelToSnakeCase(params),
    })

    yield put({ type: notificationSearch.success, result: converter.snakeToCamelCase(result) })
  } catch (error) {
    yield put({ type: notificationSearch.error, error })
  }
}

export function* notificationReadMarkAsync({
  accessToken,
  notificationId,
}) {

  const params = {
    accessToken,
  }

  const path = `notifications/${notificationId}`
  const formUrlEncodedParams = converter.toFormUrlEncoded(params)
  try {
    const result = yield api.patch(path, {
      data: formUrlEncodedParams,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    })

    yield put({ type: notificationReadMark.success, result: { data: { notificationId } } })
  } catch (error) {
    yield put({ type: notificationReadMark.error, error })
  }
}

export function* notificationSearchSaga() {
  yield takeLatest(notificationSearch.request, notificationSearchAsync)
}

export function* notificationReadMarkSaga() {
  yield takeEvery(notificationReadMark.request, notificationReadMarkAsync)
}
