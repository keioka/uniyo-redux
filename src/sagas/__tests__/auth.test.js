import { put, call } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { logInAsync } from '../auth'

test('logInAsync Saga test', () => {
  const generator = logInAsync({ username: 'kei', password: '00000', schoolId: 1 })
  expect(generator.next().value).toEqual(put({ type: '', result: '' }))
});
