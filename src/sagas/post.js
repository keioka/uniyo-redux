export function* postsSearchAsync({ types, limit, hashtags, accessToken }) {
  const params = {
    accessToken,
    hashtags,
    types,
    limit,
  }

  // convert params to snake case recrusively
  const snakeCaseParams = converter.camelToSnakeCase(params)

  try {
    const result = yield api.get('posts', {
      params: params,
    })

    yield put({ type: postsSearch.success, result: converter.snakeToCamelCase(result) })
  } catch (error) {
    yield put({ type: postsSearch.error, error })
  }
}

export function* postsSearchSaga() {
  yield takeLatest(postsSearch.request, postsSearchAsync)
}
