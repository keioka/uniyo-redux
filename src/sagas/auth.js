import { put, takeLatest } from 'redux-saga/effects'
import { logIn, tokenRefresh, userCreate } from '../actions/types'
import * as converter from '../helpers/converter'
import api from '../helpers/api'

const CLIENT_ID = 'qD1xzEFECX3JplYNIsmtFIb9lkdRF8XPuUR3jBR26cV0to5gnlKAYKc48PXJKpD'

function* logInAsync({ username, password, schoolId }) {

  const params = {
    grant_type: 'password',
    username: username,
    password: password,
    scope: 'full',
    school_id: schoolId,
    client_id: CLIENT_ID
  }

  const body = converter.toFormUrlEncoded(params)

  try {
    const result = yield api.post('oauth/token', {
      data: body,
    })
    yield put({ type: logIn.success, result: converter.snakeToCamelCase(result) })
  } catch (error) {
    yield put({ type: logIn.error, error })
  }
}

function* userCreateAsync({ name, email, password, schoolId }) {
  try {
    const result = yield api.post('users', {
      data: {
        name,
        email,
        password,
        oauth_scope: 'full',
        school_id: schoolId,
        client_id: CLIENT_ID
      },
      headers: { 'Content-Type': 'application/json' }
    })
    yield put({ type: userCreate.success, result: converter.snakeToCamelCase(result) })
  } catch (error) {
    yield put({ type: userCreate.error, error })
  }
}

function* tokenRefreshAsync({ token }) {
  const params = {
    "grant_type": "refresh_token",
    "refresh_token": token
  }
  const body = converter.toFormUrlEncoded(params)

  try {
    const result = yield api.post('oauth/token', {
      data: body
    })
    yield put({ type: tokenRefresh.success, result: converter.snakeToCamelCase(result) })
  } catch (error) {
    yield put({ type: tokenRefresh.error, error })
  }
}

export function* logInSaga() {
  yield takeLatest(logIn.request, logInAsync)
}

export function* userCreateSaga() {
  yield takeLatest(userCreate.request, userCreateAsync)
}

export function* tokenRefreshSaga() {
  yield takeLatest(tokenRefresh.request, tokenRefreshAsync)
}
