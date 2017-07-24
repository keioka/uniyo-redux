var converter = require('../converter.js')

const camelCaseObject = {
  snakeCase: "A simple test",
  camelCase: 42,
  array: [ {
    itWorks: true
  }, {
    itWorks: null
  }]
}

const snakeCaseObject = {
  snake_case: "A simple test",
  camel_case: 42,
  array: [ {
      it_works: true
  }, {
      it_works: null
  } ]
}

test('it should return snake case object', () => {
  expect(converter.camelToSnakeCase(camelCaseObject)).toEqual({
    snake_case: "A simple test",
    camel_case: 42,
    array: [ {
        it_works: true
    }, {
        it_works: null
    } ]
  })
})

test('it should return camel case object', () => {
  expect(converter.snakeToCamelCase(snakeCaseObject)).toEqual({
    snakeCase: "A simple test",
    camelCase: 42,
    array: [ {
      itWorks: true
    }, {
      itWorks: null
    }]
  })
})

test('it should return toQueryString string', () => {
  expect(converter.toQueryString(snakeCaseObject)).toEqual("snake_case=A%20simple%20test&camel_case=42&array=%5Bobject%20Object%5D%2C%5Bobject%20Object%5D")
})

test('it should return toFormUrlEncoded string', () => {
  expect(converter.toFormUrlEncoded(snakeCaseObject)).toEqual( "snake_case=A%20simple%20test&camel_case=42&array=%5Bobject%20Object%5D%2C%5Bobject%20Object%5D")
})
