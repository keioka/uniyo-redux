var debug = require('debug')('redux:cofig/path')
const __STG__ = __STG__ || false
const __PROD__ = __PROD__ || true

let path
if (__STG__) {
  path = 'https://staging-api.uniyo.io/v1'
} else if (__PROD__) {
  path = 'https://api.uniyo.io/v1'
} else {
  path = 'https://api.uniyo.io/v1'
}

debug(path)

export default {
  path,
}
