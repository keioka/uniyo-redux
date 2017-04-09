import axios from 'axios'
import config from '../config'

const methods = {
  get: {
    headers: { 'Content-Type': 'application/json' },
  },
  post: {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  },
  patch: {
    headers: { 'Content-Type': 'multipart/form-data' },
  },
  put: {},
  delete: {},
}

/**
 *
 *
 * @param {string} path
 * @param {boolean} external
 * @returns {string}
 */
const formatUrl = (path, external) => {
  if (external) return path
  return `${config.path}/${path}`
}

/**
 *
 *
 * @class ApiClient
 */
class ApiClient {
  constructor() {
    Object.keys(methods).forEach((method) => {
      this[method] = (path, options, external = false) =>
        axios.request({
          ...methods[method],
          ...options,
          url: formatUrl(path, external),
        })
    })
  }
}

const apiClient = new ApiClient()

export default apiClient
