import { applyNotification } from '@src/apply-notification'
import { notification } from 'json-rpc-creator'
import '@test/matchers'

describe('applyNotification<T extends Json | StructuredClone>(obj: any, notification: JsonRpcNotification<T>): void | Promise<void>', () => {
  describe('async method', () => {
    describe('request.params doesnt exist', () => {
      it('return Promise<JsonRpcNotification>', async () => {
        const fn = jest.fn().mockResolvedValue(undefined)
        const obj = { fn }
        const notice = notification('fn')

        const result = applyNotification(obj, notice)
        const proResult = await result

        expect(result).toBePromise()
        expect(fn).toBeCalledTimes(1)
        expect(fn).toBeCalledWith()
        expect(proResult).toBeUndefined()
      })
    })

    describe('notification.params by-position', () => {
      it('return Promise<void>', async () => {
        const fn = jest.fn().mockResolvedValue(undefined)
        const obj = { hello: fn }
        const notice = notification('hello', ['world'])

        const result = applyNotification(obj, notice)
        const proResult = await result

        expect(result).toBePromise()
        expect(fn).toBeCalledTimes(1)
        expect(fn).toBeCalledWith('world')
        expect(proResult).toBeUndefined()
      })
    })

    describe('notification.params by-name', () => {
      it('return Promise<void>', async () => {
        const fn = jest.fn().mockResolvedValue(undefined)
        const obj = { hello: fn }
        const notice = notification('hello', { who: 'world' })

        const result = applyNotification(obj, notice)
        const proResult = await result

        expect(result).toBePromise()
        expect(fn).toBeCalledTimes(1)
        expect(fn).toBeCalledWith({ who: 'world' })
        expect(proResult).toBeUndefined()
      })
    })
  })

  describe('sync method', () => {
    describe('request.params doesnt exist', () => {
      it('return JsonRpcNotification', async () => {
        const fn = jest.fn()
        const obj = { fn }
        const notice = notification('fn')

        const result = applyNotification(obj, notice)

        expect(fn).toBeCalledTimes(1)
        expect(fn).toBeCalledWith()
        expect(result).toBeUndefined()
      })
    })

    describe('notification.params by-position', () => {
      it('return undefined', () => {
        const fn = jest.fn()
        const obj = { hello: fn }
        const notice = notification('hello', ['world'])

        const result = applyNotification(obj, notice)

        expect(fn).toBeCalledTimes(1)
        expect(fn).toBeCalledWith('world')
        expect(result).toBeUndefined()
      })
    })

    describe('notification.params by-name', () => {
      it('return undefined', () => {
        const fn = jest.fn()
        const obj = { hello: fn }
        const notice = notification('hello', { who: 'world' })

        const result = applyNotification(obj, notice)

        expect(fn).toBeCalledTimes(1)
        expect(fn).toBeCalledWith({ who: 'world' })
        expect(result).toBeUndefined()
      })
    })
  })
})
