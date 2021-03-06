import { put, takeLatest, select } from 'redux-saga/effects'
import { userInfo, userSearch, userAll, userGiveDonuts } from '../actions/types'
import * as converter from '../helpers/converter'
import api from '../helpers/api'

export function* userInfoAsync({ userId, accessToken }) {
  const params = {
    accessToken
  }

  try {
    const result = yield api.get(`users/${userId}`, {
      params: converter.camelToSnakeCase(params),
    })

    yield put({ type: userInfo.success, payload: converter.snakeToCamelCase(result.data) })
    return converter.snakeToCamelCase(result.data)
  } catch (error) {
    yield put({ type: userInfo.error, error })
  }
}

export function* userSearchAsync({ query, accessToken }) {
  const params = {
    query,
    accessToken,
  }
  try {
    const result = yield api.get(`users/search`, {
      params: converter.camelToSnakeCase(params),
    })

    yield put({ type: userSearch.success, payload: converter.snakeToCamelCase(result.data) })
    return converter.snakeToCamelCase(result.data)
  } catch (error) {
    yield put({ type: userSearch.error, error })
  }
}

export function* userAllAsync({ limit = 50, accessToken }) {
  const page = yield select(state => state.api.users.currentUserAllPage)
  const offset = (limit * page) + 1

  const params = {
    limit,
    offset,
    accessToken,
  }

  try {
    const result = yield api.get(`users`, {
      params: converter.camelToSnakeCase(params),
    })

    yield put({ type: userAll.success, payload: converter.snakeToCamelCase(result.data) })
    return converter.snakeToCamelCase(result.data)
  } catch (error) {
    yield put({ type: userAll.error, error })
  }
}

export function* userGiveDonutsAsync({ amount, accessToken, userId }) {
  const params = {
    accessToken,
    amount,
  }

  try {
    const result = yield api.post(`users/${userId}/donuts`, {
      params: converter.camelToSnakeCase(params),
    })

    if (result.status === 204) {
      const payload = { data: { userId } }
      yield put({ type: userGiveDonuts.success, result: payload })
      return converter.snakeToCamelCase(payload)
    } else {
      yield put({ type: userGiveDonuts.error })
    }

  } catch (error) {
    yield put({ type: userGiveDonuts.error, error })
  }
}

export function* userInfoSaga() {
  yield takeLatest(userInfo.request, userInfoAsync)
}

export function* userSearchSaga() {
  yield takeLatest(userSearch.request, userSearchAsync)
}

export function* userAllSaga() {
  yield takeLatest(userAll.request, userAllAsync)
}

export function* userGiveDonutsSaga() {
  yield takeLatest(userGiveDonuts.request, userGiveDonutsAsync)
}
