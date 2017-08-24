import reducer from '../posts'
import * as types from '../../actions/types'
import moment from 'moment'

describe('posts reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      all: [],
      trending: [],
      relevant: [],
      error: {},
      fetching: false,
    })
  })

  it('should handle [Action:answerCreate] success', () => {
    const postData = {
      id: 618,
      text: 'Gfgdffgd',
      user: {
        id: 8,
        firstName: 'Joseph',
        lastName: 'Kennett',
        type: 'STUDENT',
        receivedDonutsCount: 474,
        image: {
          id: 0,
          smallUrl: 'https://staging-api.uniyo.io/v1/images/default?text=JK&id=8&w=150&h=150',
          mediumUrl: 'https://staging-api.uniyo.io/v1/images/default?text=JK&id=8&w=400&h=400&font_size=100',
          largeUrl: 'https://staging-api.uniyo.io/v1/images/default?text=JK&id=8&w=800&h=800&font_size=175',
          contentType: null
        },
        joinedDate: '2017-07-16T09:57:11.638',
        name: 'Joseph Kennett'
      },
      likesCount: 0,
      answersCount: 3,
      donutsCount: 18,
      currentUserLiked: false,
      createdAt: '2017-08-10T17:47:55.019',
      editedAt: null,
      embeds: [],
      sharingKey: 'f8951928dde1f8162b94250678a7c7b1',
      type: 'QUESTION',
      isRead: true
    }

    const answerData = {
      id: 679,
      text: 'dsad',
      user: {
        id: 1,
        firstName: 'Kei',
        lastName: 'Oka',
        type: 'STUDENT',
        receivedDonutsCount: 913,
        image: {
          id: 10,
          smallUrl: 'https://uniyo-staging.s3.amazonaws.com/users/profile/small/1_0b1083f9ed0c4bafb8d54d8644df2ac5.jpg',
          mediumUrl: 'https://uniyo-staging.s3.amazonaws.com/users/profile/medium/1_0b1083f9ed0c4bafb8d54d8644df2ac5.jpg',
          largeUrl: 'https://uniyo-staging.s3.amazonaws.com/users/profile/large/1_0b1083f9ed0c4bafb8d54d8644df2ac5.jpg',
          contentType: 'image/jpeg'
        },
        joinedDate: '2017-07-03T18:28:52.537',
        name: 'Kei Oka'
      },
      isBestAnswer: false,
      likesCount: 0,
      commentsCount: 0,
      donutsCount: 0,
      currentUserLiked: false,
      questionId: '618',
      createdAt: '2017-08-24T03:09:15.714',
      editedAt: null,
      embeds: [],
      sharingKey: '',
      type: 'ANSWER'
    }

    const nextPostData = Object.assign({}, postData, {
      answersCount: 4,
    })

    expect(
      reducer({ all: [postData], error: {}, fetching: false }, {
        type: types.answerCreate.success,
        result: { data: answerData },
      })
    ).toEqual({ all: [nextPostData], error: {}, fetching: false })
  })
})
