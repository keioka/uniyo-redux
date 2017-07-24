import { put, takeLatest, all, race } from 'redux-saga/effects'
import { normalize, schema } from 'normalizr'

import { channelSearch, channelCreate, userSearch } from '../actions/types'
import * as converter from '../helpers/converter'
import api from '../helpers/api'
import FormData from 'form-data'
const convertObjectToArray = (obj) => Object.keys(obj).map(key => obj[key])

const user = new schema.Entity('users')
const channelSchema = new schema.Entity('channels', {
  users: [ user ]
})

export function* channelSearchAsync({ accessToken }) {
  const params = {
    accessToken,
  }

  try {
    const result = yield api.get('channels', {
      params: converter.camelToSnakeCase(params),
    })

    const normalizedData = normalize(result.data, [ channelSchema ])
    const { channels, users } = normalizedData.entities
    yield put({ type: channelSearch.success, payload: converter.snakeToCamelCase(convertObjectToArray(channels)) })
    yield put({ type: userSearch.success, payload: converter.snakeToCamelCase(convertObjectToArray(users)) })

  } catch (error) {
    console.error(error)
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

    const normalizedData = normalize(result.data, channelSchema)
    const { channels, users } = normalizedData.entities
    yield put({ type: channelCreate.success, payload: converter.snakeToCamelCase(convertObjectToArray(channels)) })
    yield put({ type: userSearch.success, payload: converter.snakeToCamelCase(convertObjectToArray(users)) })

  } catch (error) {
    console.error(error)
    yield put({ type: channelCreate.error, error })
  }
}

export function* channelSearchSaga() {
  yield takeLatest(channelSearch.request, channelSearchAsync)
}

export function* channelCreateSaga() {
  yield takeLatest(channelCreate.request, channelCreateAsync)
}
