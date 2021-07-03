import { createRequestProxy } from '@src/create-request-proxy'

test(`
  createRequestProxy<T extends object, U = unknown>(
    createId: () => string
  ): RequestProxy<T, U>
`, () => {
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
