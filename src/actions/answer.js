import * as actionTypes from './types'

/**
 * Requests answer search
 *
 * @param {object} params
 *    @param {number} questionId
 *    @param {string} accessToken
 *
 * @returns {object} action
 */

export const answerSearch = params => ({
  type: actionTypes.answerSearch.request,
  ...params,
})

/**
 * Requests answer create
 *
 * @param {object} params
 *    @param {number} questionId
 *    @param {string} accessToken
 *    @param {string} text
 *
 * @returns {object} action
 */

export const answerCreate = params => ({
  type: actionTypes.answerCreate.request,
  ...params,
})
