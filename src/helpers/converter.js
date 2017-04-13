import converter from "json-style-converter/es5";

export const camelToSnakeCase = (object) => {
  return converter.camelToSnakeCase(object)
}

export const snakeToCamelCase = (object) => {
  return converter.snakeToCamelCase(object)
}

function URLEncoding(params){
  const snakeCaseParams = camelToSnakeCase(params)
  const queryString = Object.keys(snakeCaseParams)
    .reduce((acc, curr) => {
      acc.push(`${curr}=${encodeURIComponent(snakeCaseParams[curr])}`)
      return acc
    }, []).join("&")
  return queryString
}

export const toQueryString = (params) => {
  return URLEncoding(params)
}

export const toFormUrlEncoded = (params) => {
  return URLEncoding(params)
}
