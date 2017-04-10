import { put, takeLatest } from 'redux-saga/effects'
import { logIn, tokenRefresh, userCreate } from '../actions/types'
import api from '../helpers/api'

function* logInAsync(action) {
  try {
    const result = yield api.post('oauth/token', {
      params: {
        grant_type: 'password',
        username: action.username,
        password: action.password,
        scope: 'full',
        school_id: action.schoolid,
      },
    })
    yield put({ type: logIn.success, result })
  } catch (error) {
    yield put({ type: logIn.error, error })
  }
}

function* tokenRefreshAsync() {
  // WIP
}

function* userCreateAsync() {
  // WIP
}

export function* logInSaga() {
  yield takeLatest(logIn.request, logInAsync)
}

export function* tokenRefreshSaga() {
  // WIP
}

export function* userCreateSaga() {
  // WIP
}
