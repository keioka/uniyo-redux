import { put, call, takeLatest } from 'redux-saga/effects'
import Fingerprint2 from 'fingerprintjs2'
import UAParser from 'ua-parser-js'

import { logIn, tokenRefresh, userCreate, currentUser, currentUserDonuts, addDevice, deleteDevice, resetPassword, newPasswordUpdate } from '../actions/types'
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
    oauthScope: "full",
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

  const snakeCaseParams = converter.camelToSnakeCase(params)
  const body = new FormData()
  // append all snake case params to body
  Object.keys(snakeCaseParams).forEach(key => body.append(key, snakeCaseParams[key]))

  try {
    const result = yield api.post(path, {
      data: body,
    })

    yield put({ type: resetPassword.success })
  } catch (error) {
    yield put({ type: resetPassword.error })
  }
}


function* newPasswordUpdateAsync({ password, passwordConfirmation, token }) {
  const path = `users/reset_password`
  const params = {
    password,
    passwordConfirmation,
    token,
  }

  const snakeCaseParams = converter.camelToSnakeCase(params)

  // generate form data
  const body = new FormData()

  // append all snake case params to body
  Object.keys(snakeCaseParams).forEach(key => body.append(key, snakeCaseParams[key]))

  try {
    const result = yield api.post(path, {
      data: body,
    })

    yield put({ type: newPasswordUpdate.success })
  } catch (error) {
    yield put({ type: newPasswordUpdate.error, error })
  }
}


function* addDeviceAsync({ deviceId, deviceType, accessToken, endpoint, authSecret, p256dhKey }) {

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

function* deleteDeviceAsync({ deviceType, deviceId, accessToken }) {
  const params = {
    deviceId,
    deviceType,
    accessToken,
  }

  const body = converter.toFormUrlEncoded(params)

  try {
    const result = yield api.delete('users/me/devices', {
      data: body,
    })
    yield put({ type: deleteDevice.success, result: converter.snakeToCamelCase(result) })
  } catch (error) {
    yield put({ type: deleteDevice.error, error })
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

export function* deleteDeviceSaga() {
  yield takeLatest(deleteDevice.request, deleteDeviceAsync)
}

export function* resetPasswordSaga() {
  yield takeLatest(resetPassword.request, resetPasswordAsync)
}

export function* newPasswordUpdateSaga() {
  yield takeLatest(newPasswordUpdate.request, newPasswordUpdateAsync)
}

export function* currentUserDonutsSaga() {
  yield takeLatest(currentUserDonuts.request, currentUserDonutsAsync)
}
