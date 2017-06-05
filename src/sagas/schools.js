import { put, takeLatest } from 'redux-saga/effects'
import { schoolsSearch, schoolInfo } from '../actions/types'
import api from '../helpers/api'

/**
 * Saga for searching school results
 *
 * @param {any} action
 */
function* schoolsSearchAsync(action) {
  try {
    let result
    if (action.query) {
      result = yield api.get('schools/search', {
        params: {
          query: action.query,
          limit: action.limit,
        },
      })
    } else {
      result = { data: [] }
    }
    yield put({ type: schoolsSearch.success, data: [...result.data] })
  } catch (error) {
    yield put({ type: schoolsSearch.error, error })
  }
}

/**
 * Saga for fetching school info data
 *
 * @param {any} action
 */
function* schoolInfoAsync(action) {
  try {
    const result = yield api.get(`schools/${action.id}`)
    yield put({ type: schoolInfo.success, data: [ result.data ]})
  } catch (error) {
    yield put({ type: schoolInfo.error, error: error })
  }
}

export function* schoolsSearchSaga() {
  yield takeLatest(schoolsSearch.request, schoolsSearchAsync)
}

export function* schoolInfoSaga() {
  yield takeLatest(schoolInfo.request, schoolInfoAsync)
}
