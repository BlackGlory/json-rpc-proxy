import { createNotificationProxy } from '@src/create-notification-proxy'

describe('createNotificationProxy<T extends object, U extends Json | StructuredClone = Json>(target: T): NotificationProxy<T, U>', () => {
  it('return NotificationProxy', () => {
    const obj = {
      hello(who: string) {
        return `hello ${who}`
      }
    }

    const result = createNotificationProxy(obj).hello('world')

    expect(result).toStrictEqual({
      jsonrpc: '2.0'
    , method: 'hello'
    , params: ['world']
    })
  })
})
