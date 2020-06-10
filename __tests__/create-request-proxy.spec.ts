import { createRequestProxy } from '@src/create-request-proxy'

describe('createRequestProxy<T extends object, U extends Json | StructuredClone = Json>(target: T, createId = () => string): RequstProxy<T, U>', () => {
  it('return RequestProxy', () => {
    const createId = jest.fn().mockReturnValue(0)
    const obj = {
      hello(who: string) {
        return `hello ${who}`
      }
    }

    const result = createRequestProxy(obj, createId).hello('world')

    expect(createId).toBeCalledTimes(1)
    expect(result).toStrictEqual({
      jsonrpc: '2.0'
    , id: 0
    , method: 'hello'
    , params: ['world']
    })
  })
})
