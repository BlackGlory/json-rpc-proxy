import { createRequestProxy } from '@src/create-request-proxy'

describe('createRequestProxy<T extends object, U>(target: T, createId = () => string): RequstProxy<T, U>', () => {
  it('return RequestProxy', () => {
    const createId = jest.fn().mockReturnValue(0)
    interface Remote {
      hello(who: string): string
    }

    const result = createRequestProxy<Remote>(createId).hello('world')

    expect(createId).toBeCalledTimes(1)
    expect(result).toStrictEqual({
      jsonrpc: '2.0'
    , id: 0
    , method: 'hello'
    , params: ['world']
    })
  })
})
