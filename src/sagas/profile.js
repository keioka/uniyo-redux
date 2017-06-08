import { call, put, takeLatest, fork, select } from 'redux-saga/effects'
import * as converter from '../helpers/converter'
import { hashtagAdd, hashtagDelete, userPictureUpdate } from '../actions/types'
import api from '../helpers/api'
import FormData from 'form-data'

/**
 *  addUserTagsAsync
 *  @param {array<string>}  hashtags
 *  @param {string} tagType
 *  @param {string} accessToken
 */

 export function* addHashTagRequest(hashtag, tagType, accessToken) {

   const hashtags = yield select(state => state.auth.currentUser.hashtags)
   console.warn(hashtags)
   const isAlreadyExsist = hashtags.includes(hashtagObj => hashtagObj.hashtag === hashtag)

   if (isAlreadyExsist) {
     yield put({ type: hashtagAdd.error, result: converter.snakeToCamelCase(error) })
   }

   const params = {
     hashtag,
     type: tagType,
     accessToken,
   }

   const paramsJsonFormat = converter.toJson(params)

   try {
     const result = yield api.post('users/me/hashtags', {
       data: paramsJsonFormat,
       headers: { 'Content-Type': 'application/json' },
     })

     yield put({ type: hashtagAdd.success, result: converter.snakeToCamelCase(result) })
   } catch (error) {
     yield put({ type: hashtagAdd.error, result: converter.snakeToCamelCase(error) })
   }
 }

function* addUserTagsAsync({ hashtags, tagType, accessToken }) {
  if (!tagType) {
    console.warn("Type is not defined")
  }

  if (!accessToken) {
    console.warn("accessToken is not valid")
  }

  // send request by each tag
  yield hashtags.map(tag => fork(addHashTagRequest, tag, tagType, accessToken))
}


function* hashtagDeleteAsync({ accessToken, hashtag, hashtagType }) {
  const params = {
    accessToken,
    hashtag,
    type: hashtagType,
  }

  try {
    const result = yield api.delete('users/me/hashtags', {
      params: converter.camelToSnakeCase(params),
    })

    yield put({ type: hashtagDelete.success, result: converter.snakeToCamelCase({ data: { hashtag } }) })
  } catch (error) {
    yield put({ type: hashtagDelete.error, result: converter.snakeToCamelCase(error) })
  }
}

function* hashtagsUserAsync({ accessToken }) {
  const params = {
    accessToken,
  }

  try {
    const result = yield api.get('users/me/hashtags', {
      params: converter.camelToSnakeCase(params),
    })

    yield put({ type: hashtagsUser.success, result: converter.snakeToCamelCase(result) })
  } catch (error) {
    yield put({ type: hashtagsUser.error, result: converter.snakeToCamelCase(error) })
  }
}

/**
 *  updateUserProfilePicAsync
 *  @param {object}  params
 *    @param {string} tagType
 *    @param {string} accessToken
 */

function* updateUserProfilePicAsync({ imageFile, cropInfo, accessToken }) {

  const params = {
    accessToken,
    image: imageFile,
    contentType: imageFile ? imageFile.type : null,
    cropX: cropInfo.x,
    cropY: cropInfo.y,
    cropWidth: cropInfo.width,
    cropHeight: cropInfo.height,
  }

  // convert params to snake case recrusively
  const snakeCaseParams = converter.camelToSnakeCase(params)

  // generate form data
  const body = new FormData()

  // append all snake case params to body
  Object.keys(snakeCaseParams).forEach(key => body.append(key, snakeCaseParams[key]))

  try {
    const result = yield api.patch('users/me', {
      data: body,
      headers: {
        'Accept': 'application/json'
      }
    })

    yield put({ type: userPictureUpdate.success, result: converter.snakeToCamelCase(result) })
  } catch (error) {
    yield put({ type: userPictureUpdate.error, error })
  }
}

export function* addUserTagsSaga() {
  yield takeLatest(hashtagAdd.request, addUserTagsAsync)
}

export function* hashtagDeleteSaga() {
  yield takeLatest(hashtagDelete.request, hashtagDeleteAsync)
}

export function* hashtagsUserSaga() {
  yield takeLatest(hashtagsUser.request, hashtagsUserAsync)
}

export function* updateUserProfilePicSaga() {
  yield takeLatest(userPictureUpdate.request, updateUserProfilePicAsync)
}
