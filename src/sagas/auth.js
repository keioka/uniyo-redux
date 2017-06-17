import { put, call, takeLatest } from 'redux-saga/effects'
import Fingerprint2 from 'fingerprintjs2'
import UAParser from 'ua-parser-js'

import { logIn, tokenRefresh, userCreate, currentUser, currentUserDonuts, addDevice, resetPassword } from '../actions/types'
import * as converter from '../helpers/converter'
import api from '../helpers/api'
const CLIENT_ID = 'qD1xzEFECX3JplYNIsmtFIb9lkdRF8XPuUR3jBR26cV0to5gnlKAYKc48PXJKpD'

export function* logInAsync({ username, password, schoolId }) {
  const params = {
    grant_type: 'password',
    username,
    password,
    scope: 'full',
    school_id: schoolId,
    client_id: CLIENT_ID,
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

function* userCreateAsync({ firstName, lastName, email, password, schoolId }) {

  const params = {
    firstName,
    lastName,
    email,
    password,
    schoolId,
    scope: 'full',
    client_id: CLIENT_ID,
  }

  const body = converter.camelToSnakeCase(params)

  try {
    const result = yield api.post('users', {
      data: body,
      headers: { 'Content-Type': 'application/json' },
    })
    yield put({ type: userCreate.success, result: converter.snakeToCamelCase(result) })
  } catch (error) {
    yield put({ type: userCreate.error, error })
  }
}

function* tokenRefreshAsync({ token }) {
  const params = {
    grant_type: 'refresh_token',
    refresh_token: token,
  }
  const body = converter.toFormUrlEncoded(params)

  try {
    const result = yield api.post('oauth/token', {
      data: body,
    })
    yield put({ type: tokenRefresh.success, result: converter.snakeToCamelCase(result) })
  } catch (error) {
    yield put({ type: tokenRefresh.error, error })
  }
}

function* currentUserAsync({ userId, accessToken }) {
  const params = {
    accessToken,
    userId,
  }

  try {
    const result = yield api.get(`users/${userId}`, {
      params: converter.camelToSnakeCase(params),
    })

    yield put({ type: currentUser.success, result: converter.snakeToCamelCase(result) })
  } catch (error) {
    yield put({ type: currentUser.error, error })
  }
}

function* currentUserDonutsAsync({ accessToken }) {
  const params = {
    accessToken,
  }

  try {
    const result = yield api.get(`users/me/donuts`, {
      params: converter.camelToSnakeCase(params),
    })

    yield put({ type: currentUserDonuts.success, result: converter.snakeToCamelCase(result) })
  } catch (error) {
    yield put({ type: currentUserDonuts.error, error })
  }
}

function* resetPasswordAsync({ email, schoolId }) {
  const path = `users/${email}/reset_password`
  const params = {
    schoolId
  }

  try {
    const result = yield api.post(path, {
      params: converter.toFormUrlEncoded(params),
    })

    yield put({ type: resetPassword.success })
  } catch (error) {
    yield put({ type: resetPassword.error })
  }
}


function* addDeviceAsync({ accessToken, endpoint, authSecret, p256dhKey }) {

  let deviceId

  const getDevice = () => {
    return new Promise((resolve) => {
      new Fingerprint2().get(function(result, components) {
        resolve(result)
      })
    })
  }
  deviceId = yield call(getDevice)

  const deviceTypeMapping = {
    'Chrome': 'BROWSER_CHROME',
    'Chromium': 'BROWSER_CHROME',
    'Edge': 'BROWSER_EDGE',
    'Firefox': 'BROWSER_FIREFOX',
    'Safari': 'BROWSER_SAFARI'
  }

  const parser = new UAParser()

  const browserName = parser.getBrowser().name
  const deviceType = deviceTypeMapping[browserName]
   ? deviceTypeMapping[browserName] : 'BROWSER_OTHER'

  const params = {
    deviceId,
    deviceType,
    endpoint,
    authSecret,
    p256dhKey,
    accessToken
  }

  const body = converter.toFormUrlEncoded(params)

  try {
    const result = yield api.post('users/me/devices', {
      data: body,
    })
    yield put({ type: addDevice.success, result: converter.snakeToCamelCase(result) })
  } catch (error) {
    yield put({ type: addDevice.error, error })
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

export function* currentUserSaga() {
  yield takeLatest(currentUser.request, currentUserAsync)
}

export function* addDeviceSaga() {
  yield takeLatest(addDevice.request, addDeviceAsync)
}

export function* resetPasswordSaga() {
  yield takeLatest(resetPassword.request, resetPasswordAsync)
}

export function* currentUserDonutsSaga() {
  yield takeLatest(currentUserDonuts.request, currentUserDonutsAsync)
}
