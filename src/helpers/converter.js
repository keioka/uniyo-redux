import converter from 'json-style-converter/es5'

export const camelToSnakeCase = object => (converter.camelToSnakeCase(object))
export const snakeToCamelCase = object => (converter.snakeToCamelCase(object))

const URLEncoding = (params) => {
  const snakeCaseParams = camelToSnakeCase(params)
  const queryString = Object.keys(snakeCaseParams)
    .reduce((acc, curr) => {
      acc.push(`${curr}=${encodeURIComponent(snakeCaseParams[curr])}`)
      return acc
    }, []).join('&')
  return queryString
}

export const toQueryString = params => (URLEncoding(params))
export const toFormUrlEncoded = params => (URLEncoding(params))

export const toJson = params => (JSON.stringify(camelToSnakeCase(params)))
