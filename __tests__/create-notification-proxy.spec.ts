import { createNotificationProxy } from '@src/create-notification-proxy'

describe('createNotificationProxy<T extends object, U = unknow>(target: T): NotificationProxy<T, U>', () => {
  it('return NotificationProxy', () => {
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
})
