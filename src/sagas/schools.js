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
    const result = yield api.get('schools/search/', {
      params: {
        query: action.query,
        limit: 10,
      },
    })
    yield put({ type: schoolsSearch.success, schoolsSearchResult: result.data })
  } catch (error) {
    yield put({ type: schoolsSearch.error, schoolsSearchError: error.log })
  }
}

/**
 * Saga for fetching school info data
 *
 * @param {any} action
 */
function* schoolInfoAsync(action) {
  try {
    const result = 'dsfdf'
    yield put({ type: schoolInfo.success, schoolInfoResult: result })
  } catch (error) {
    yield put({ type: schoolInfo.error, schoolInfoError: error.log })
  }
}

export function* schoolsSearchSaga() {
  yield takeLatest(schoolsSearch.request, schoolsSearchAsync)
}

export function* schoolInfoSaga() {
  yield takeLatest(schoolInfo.request, schoolInfoAsync)
}
