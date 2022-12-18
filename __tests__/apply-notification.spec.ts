import { applyNotification } from '@src/apply-notification'
import { notification } from 'json-rpc-creator'

describe(`
  applyNotification(
    callables: object
  , notification: JsonRpcNotification<T>
  ): Promise<void>
`, () => {
  test('method not found', async () => {
    const callables = {}
    const req = notification('fn')

    const result = await applyNotification(callables, req)

    expect(result).toBeUndefined()
  })

  test('method throws error', async () => {
    const fn = jest.fn().mockRejectedValue(new Error('message'))
    const callables = { fn }
    const req = notification('fn')

    const result = await applyNotification(callables, req)

    expect(result).toBeUndefined()
  })

  test('request.params doesnt exist', async () => {
    const fn = jest.fn().mockResolvedValue(undefined)
    const callables = { fn }
    const notice = notification('fn')

    const result = await applyNotification(callables, notice)

    expect(fn).toBeCalledTimes(1)
    expect(fn).toBeCalledWith()
    expect(result).toBeUndefined()
  })

  test('notification.params by-position', async () => {
    const fn = jest.fn().mockResolvedValue(undefined)
    const callables = { hello: fn }
    const notice = notification('hello', ['world'])

    const result = await applyNotification(callables, notice)

    expect(fn).toBeCalledTimes(1)
    expect(fn).toBeCalledWith('world')
    expect(result).toBeUndefined()
  })

  test('notification.params by-name', async () => {
    const fn = jest.fn().mockResolvedValue(undefined)
    const callables = { hello: fn }
    const notice = notification('hello', { who: 'world' })

    const result = await applyNotification(callables, notice)

    expect(fn).toBeCalledTimes(1)
    expect(fn).toBeCalledWith({ who: 'world' })
    expect(result).toBeUndefined()
  })
})
