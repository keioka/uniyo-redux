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
  camelCase: 42,
  array: [ {
      it_works: true
  }, {
      it_works: null
  } ]
}

test('it should return snake case object', () => {
  expect(converter.camelToSnakeCase(camelCaseObject)).toBe({
    snake_case: "A simple test",
    camelCase: 42,
    array: [ {
        it_works: true
    }, {
        it_works: null
    } ]
  })
})

test('it should return camel case object', () => {
  expect(converter.snakeToCamelCase(snakeCaseObject)).toBe({
    snakeCase: "A simple test",
    camelCase: 42,
    array: [ {
      itWorks: true
    }, {
      itWorks: null
    }]
  })
})

test('it should return toFormUrlEncoded string', () => {
  expect(converter.toQueryString(snakeCaseObject)).toBe()
})

test('it should return camel case object', () => {
  expect(converter.toFormUrlEncoded(snakeCaseObject)).toBe()
})
