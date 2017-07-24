import actions from '../index.js'

test('it should return login request action', () => {
  const params = { username: 'uniyo', password: '00000', schoolId: '1' }
  expect(actions.logIn(params)).toEqual({
    ...params,
    'type': 'LOG_IN_REQUEST',
  })
})

test('it should return userCreate request action', () => {
  const params = { email: 'uniyo', password: '00000', schoolId: '1' }
  expect(actions.userCreate(params)).toEqual({
    ...params,
    'type': 'USER_CREATE_REQUEST',
  })
})

test('it should return authClearError request action', () => {
  expect(actions.authClearError()).toEqual({
    'type': 'AUTH_CLEAR_ERROR_REQUEST',
  })
})

test('it should return tokenRefresh request action', () => {
  const params = 'uniyo_token'
  expect(actions.tokenRefresh(params)).toEqual({
    token: params,
    'type': 'TOKEN_REFRESH_REQUEST',
  })
})

test('it should return hashtagAdd request action', () => {
  const params = {
    hashtags: ['sda', 'dsda'],
    accessToken: 'uniyo_token',
    tagType: ['ds', 'ds'],
  }

  expect(actions.hashtagAdd(params)).toEqual({
    ...params,
    'type': 'HASHTAG_CREATE_REQUEST',
  })
})

test('it should return userPictureUpdate request action', () => {
  const params = {
    image: {},
  }

  expect(actions.userPictureUpdate(params)).toEqual({
    ...params,
    'type': 'USER_PICTURE_UPDATE_REQUEST',
  })
})

test('it should return userPictureUpdate request action', () => {
  const params = {
    image: {},
  }

  expect(actions.userPictureUpdate(params)).toEqual({
    ...params,
    'type': 'USER_PICTURE_UPDATE_REQUEST',
  })
})

test('it should return userInfo request action', () => {
  const params = {
    userId: '23',
    accessToken: '23dsadwewed',
  }

  expect(actions.userInfo(params)).toEqual({
    ...params,
    'type': 'USER_INFO_REQUEST',
  })
})

test('it should return post delete request action', () => {
  const params = {
    postId: '23',
    accessToken: '23dsadwewed',
  }

  expect(actions.postDelete(params)).toEqual({
    ...params,
    'type': 'POST_DELETE_REQUEST',
  })
})

test('it should return comment delete request action', () => {
  const params = {
    commentId: '23',
    accessToken: '23dsadwewed',
  }

  expect(actions.commentDelete(params)).toEqual({
    ...params,
    'type': 'COMMENT_DELETE_REQUEST',
  })
})
