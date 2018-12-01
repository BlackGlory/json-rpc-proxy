import { createRequestProxy } from '../src/create-request-proxy'

describe('createRequestProxy', () => {
  test('createRequestProxy()', () => {
    const proxy = createRequestProxy()

    expect(() => proxy[Symbol()]()).toThrow()

    expect(proxy.hello()).toStrictEqual({
      jsonrpc: '2.0'
    , method: 'hello'
    , params: []
    })

    expect(proxy.hello('world')).toStrictEqual({
      jsonrpc: '2.0'
    , method: 'hello'
    , params: ['world']
    })
  })

  test('createRequestProxy(idCreator)', () => {
    const autoIncreaseCreator = (i = 0) => () => i++
    const proxy = createRequestProxy(autoIncreaseCreator())

    expect(() => proxy[Symbol()]()).toThrow()

    expect(proxy.hello()).toStrictEqual({
      jsonrpc: '2.0'
    , id: 0
    , method: 'hello'
    , params: []
    })

    expect(proxy.hello('world')).toStrictEqual({
      jsonrpc: '2.0'
    , id: 1
    , method: 'hello'
    , params: ['world']
    })

    expect(proxy.good('bye')).toStrictEqual({
      jsonrpc: '2.0'
    , id: 2
    , method: 'good'
    , params: ['bye']
    })
  })

  test('createRequestProxy(idIterator)', () => {
    function* autoIncreaseGenerator() {
      let i = 0
      while (true) {
        yield i++
      }
    }
    const proxy = createRequestProxy(autoIncreaseGenerator())

    expect(() => proxy[Symbol()]()).toThrow()

    expect(proxy.hello()).toStrictEqual({
      jsonrpc: '2.0'
    , id: 0
    , method: 'hello'
    , params: []
    })

    expect(proxy.hello('world')).toStrictEqual({
      jsonrpc: '2.0'
    , id: 1
    , method: 'hello'
    , params: ['world']
    })

    expect(proxy.good('bye')).toStrictEqual({
      jsonrpc: '2.0'
    , id: 2
    , method: 'good'
    , params: ['bye']
    })
  })

  test('createRequestProxy(oneShotNullIterator)', () => {
    function* oneShotNullGenerator() {
      yield null
    }
    const proxy = createRequestProxy(oneShotNullGenerator())

    expect(proxy.hello()).toStrictEqual({
      jsonrpc: '2.0'
    , id: null
    , method: 'hello'
    , params: []
    })

    expect(() => proxy.hello('world')).toThrow()
  })

  test('createRequestProxy(nullCreator)', () => {
    const nullCreator = () => null
    const proxy = createRequestProxy(nullCreator)

    expect(proxy.hello()).toStrictEqual({
      jsonrpc: '2.0'
    , id: null
    , method: 'hello'
    , params: []
    })

    expect(proxy.hello('world')).toStrictEqual({
      jsonrpc: '2.0'
    , id: null
    , method: 'hello'
    , params: ['world']
    })
  })
})
