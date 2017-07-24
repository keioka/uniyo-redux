import reducer from '../channels'
import * as types from '../../actions/types'
import * as response from './responseChannel'

describe('channels reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({ all: [], error: {}, fetching: false })
  })

  it('should handle A:channelSearch request', () => {
    expect(
      reducer(undefined, {
        type: types.channelSearch.request,
        text: 'Run the tests'
      })
    ).toEqual({ all: [], error: {}, fetching: true })
  })

  it('should handle A:channelSearch success', () => {
    expect(
      reducer(undefined, {
        type: types.channelSearch.success,
        result: {
          data: response.channelSearch,
        }
      })
    ).toEqual({ all: response.channelSearch, error: {}, fetching: false })
  })
})
