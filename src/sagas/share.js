import { call, put, takeLatest, fork, select } from 'redux-saga/effects'
import * as converter from '../helpers/converter'
import { sharePostFetch } from '../actions/types'
import api from '../helpers/api'

/**
 *  addUserTagsAsync
 *  @param {array<string>}  hashtags
 *  @param {string} tagType
 *  @param {string} accessToken
 */

function* sharePostFetchAsync({ sharingKey }) {
   try {
     const result = yield api.get(`public/posts/${sharingKey}`)
     yield put({ type: sharePostFetch.success, payload: converter.snakeToCamelCase(result.data) })
   } catch (error) {
     yield put({ type: sharePostFetch.error, error: converter.snakeToCamelCase(error) })
   }
 }

export function* sharePostFetchSaga() {
  yield takeLatest(sharePostFetch.request, sharePostFetchAsync)
}
