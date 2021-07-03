import { createNotificationProxy } from '@src/create-notification-proxy'

test(`
  createNotificationProxy<
    T extends object
  , U = unknown
  >(): NotificationProxy<T, U>
`, () => {
  interface Remote {
    hello(who: string): string
  }

  const result = createNotificationProxy<Remote>().hello('world')

  expect(result).toStrictEqual({
    jsonrpc: '2.0'
  , method: 'hello'
  , params: ['world']
  })
})
